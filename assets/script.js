const socket = io('http://localhost:3000');
const vue = new Vue({
    el: '#app',

    data: {
        newMessage: null,
        messages: [],
        typing: false,
        username: null,
        password: null,
        loginMessage: null,
        ready: false,
        info: [],
        connections: 0,
    },

    created() {

        if(window.localStorage.getItem('username')){
            this.ready = false;
            console.log(window.localStorage.getItem('username'))
        }
        
        // window.onbeforeunload = () => {
        //     alert(111)
        //     socket.emit('leave', this.username);
        // }

        socket.on('chat-message', (data) => {
            this.messages.push({
                message: data.message,
                type: 1,
                user: data.name,
            });
        });

        socket.on('typing', (data) => {
            this.typing = data;
        });


        socket.on('stopTyping', () => {
            this.typing = false;
        });

        socket.on('joined', (data) => {
            this.info.push({
                username: data,
                type: 'joined'
            });

            setTimeout(() => {
                this.info = [];
            }, 3000);
        });

        socket.on('leave', (data) => {
            this.info.push({
                username: data,
                type: 'left'
            });

            setTimeout(() => {
                this.info = [];
            }, 3000);
        });

        socket.on('connections', (data) => {
            this.connections = data;
        });
    },

    watch: {
        newMessage(value) {
            value ? socket.emit('typing', this.username) : socket.emit('stopTyping')
        }
    },

    methods: {
        send() {
            this.messages.push({
                message: this.newMessage,
                type: 0,
                user: 'Me',
            });

            socket.emit('msgToServer', {
                message: this.newMessage,
                name: this.username
            });
            this.newMessage = null;
        },

        async addUser() {
            axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
            const response = await axios.post('http://localhost:3000/auth/signIn', {
                username: this.username,
                password: this.password,
            });

            console.log("response.data.status");
            console.log(response.data.status);

            if (response.data.status == true) {
                console.log(response.data);
                this.ready = true;
                window.localStorage.setItem('username', this.username);
                socket.emit('joined', this.username);
            } else {
                this.ready = false;
                
                this.loginMessage = response.data.message;
            }
        },
        // async createUser() {
        //     axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        //     const response = await axios.post('http://localhost:3000/auth/signup', {
        //         username: this.username,
        //         password: this.password,
        //     });

        //     console.log("response.data.status");
        //     console.log(response.data.status);

        //     if (response.data.status == true) {
        //         console.log(response.data);
        //         this.ready = true; 
        //         this.signup= false;
        //         socket.emit('joined', this.username);
        //     } else {
        //         this.ready = false;
        //         this.signup= true;
        //         this.loginMessage = response.data.message;
        //     }
        // }

    },

});

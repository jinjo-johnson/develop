const socket = io();
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
        window.onbeforeunload = () => {
            socket.emit('leave', this.username);
        }

        socket.on('chat-message', (data) => {
            this.messages.push({
                message: data.message,
                type: 1,
                user: data.user,
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
            }, 5000);
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
                user: this.username
            });
            this.newMessage = null;
        },

        async addUser() {
            const response = await axios.post('/login', {
                username: this.username,
                password: this.password,
            });

            if (response.data.status) {
                this.ready = true;
                socket.emit('joined', this.username);
            } else {
                this.ready = false;
                this.loginMessage = response.data.message;
            }
        }
    },

});

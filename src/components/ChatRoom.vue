<template> 
<div class="container">
            <div class="col-lg-9 offset-lg-3"></div>
                <div class="card bg-light" >
                    <div class="card-header text-white">
                        <span class="float-right online-count text-secondary"><span class="led"></span>People online</span>
                    </div>
                    <ul class="list-group list-group-flush text-right">
                        
                        <li class="list-group-item chat-message" v-for="message in messages" :value="message.value" :key="message.value">
                            <span :class="[message.type === 1 ? 'float-left' : 'float-right']">
                                <div :class="['alert', 'bubble', message.type === 1 ? 'alert-secondary' : 'alert-info']" role="alert">
                                    <strong>{{message.user}}:</strong> {{message.message}}
                                  </div>
                            </span>
                        </li>
                    </ul>
        <div class="card-body">
                <form @submit.prevent="send">
                    <div class="form-group">
                        <input type="text" class="form-control" v-model="newMessage"
                                    placeholder="Enter message here">
                        </div>
                    </form>
        </div>
    </div> 
</div>

</template>

<script>
  import io from 'socket.io-client';
  const socket = io('http://localhost:3000');
  
  
  export default {
    data() {
      return {
        newMessage: null,
        messages:[],
        typing: false,
        info: [],
        connections: 0,
        username: null,
        ready: true 
      }
    },
    created(){
        
        socket.on('connections', (data) => {
            this.connections = data;
            
        });

        socket.on('chat-message', (data) => {
            this.messages.push({
                message: data.message,
                type: 1,
                user: data.user,
            });
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

            socket.emit('chat-message', {
                message: this.newMessage,
                user: localStorage.username
            });
            this.newMessage = null;
        },
        init(){
            if(localStorage.username){
                this.ready = true;
                let uri = 'http://localhost:3000/auth/getAllchats';
                this.axios.get(uri)
                .then((response) => {
                    let reqData = JSON.parse(response.request.response);
                    reqData.forEach( (element) => {
                            this.messages.push({
                                message: element.message,
                                type:  (element.name == localStorage.username) ? 0 : 1,
                                user: (element.name == localStorage.username) ? "Me" : element.name,
                            });
                    });
                });
            }
            else{
                const path = `/`
                if (this.$route.path !== path) this.$router.push(path) 
            }
        }

    },
    mounted(){
        this.init()
    }

  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

</style>

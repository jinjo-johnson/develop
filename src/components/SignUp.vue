<template> 
<div class="container">
  <form @submit.prevent="signup">
    <div  v-if="err_msg_signup" class="alert alert-danger" role="alert">
      Please enter the username and password !
    </div>
    <div class="form-group">
    <input type="text" class="form-control" v-model="username" placeholder="Username">
    </div>

    <div class="form-group">
    <input type="password" class="form-control" v-model="password" placeholder="Password">
    </div>

    <div class="form-group">
    <input type="submit" value="signup" class="btn btn-dark float-right">
    </div>
  </form>
</div>

</template>

<script>
  import io from 'socket.io-client';
  const socket = io('http://localhost:3000');
  export default {
    data() {
      return {
        username: null,
        password: null,
        err_msg_signup: false
      }
    },
    created(){ 
        socket.on('connections', (data) => {
            this.connections = data;
        });
    },
    methods: {
      async signup(){
        let uri = 'http://localhost:3000/auth/signup';
        if(this.username && this.password) {
            const response = await this.axios.post(uri, {
                username: this.username,
                password: this.password,
            });
           
            if (response.data.status  == true) {
                console.log("I'm jinjo , now @signup fun res");
                this.ready = true;
                localStorage.username = this.username;
                socket.emit('joined', localStorage.username);
                const path = `/chatRoom`
                if (this.$route.path !== path) this.$router.push(path)
            } else {
                this.ready = false;
                const path = `/`
                if (this.$route.path !== path) this.$router.push(path)
            }
        }
        else{
              this.err_msg_signup = true;
        }
      }
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

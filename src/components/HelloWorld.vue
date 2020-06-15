<template> 

<div class="container">
  <form @submit.prevent="login">
    <div class="form-group">
    <div v-if="err_msg" class="alert alert-danger" role="alert">
      Please enter the invalid username or password!
    </div>

    <input type="text" class="form-control" v-model="username" placeholder="Username">
    </div>

    <div class="form-group">
    <input type="password" class="form-control" v-model="password" placeholder="Password">
    </div>

    <div class="form-group">
    <input type="submit" value="Login" class="btn btn-dark float-right">
    </div>
    <div class="form-group">
        <a class="btn btn-dark float-right" style="margin-right: 10px;" href="/create">Sign Up</a>
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
        err_msg: false
      }
    },
    created(){ 
        socket.on('connections', (data) => {
            this.connections = data;
        });
    },
    methods: {
      async login(){
        let uri = 'http://localhost:3000/auth/signIn';
        if(this.username && this.password) {
            const response = await this.axios.post(uri, {
                username: this.username,
                password: this.password,
            });
            if (response.data.status == true) {
                this.ready = true;
                localStorage.username = response.data.username;
                socket.emit('joined', localStorage.username);
                const path = `/chatRoom`
                if (this.$route.path !== path) this.$router.push(path)
                location.reload(true);
            } else {
                this.ready = false;
                this.err_msg = true;
                this.loginMessage = response.data.message;
            }
          }
          else{
                this.err_msg = true;
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


</style>

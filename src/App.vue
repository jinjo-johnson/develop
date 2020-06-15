<template>
  <div>
    <nav class="navbar navbar-dark bg-dark">
            <a class="navbar-brand" href="javascript:;">Chat room</a>
            <span v-if="ready" class="username"  v-on:click="logOut()">Log out</span>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        ready: true,
        username: null,
        messages: []
      }
    },
    created(){ 

    },
    methods: {
        init(){
            if(localStorage.username){
                this.ready = true;
                const path = `/chatRoom`
                if (this.$route.path !== path) this.$router.push(path)         
            }
        },
        logOut(){
          localStorage.removeItem('username');
          this.ready = false;
          const path = `/`
          if (this.$route.path !== path) this.$router.push(path) 
        }
    },
    mounted(){
        this.init()
    }
  }
</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  padding-top: 20px;
}

.username {
  color: aliceblue;
}

.bubble {
  margin-bottom: 0;
}

.chat-message {
  padding: 4px 20px;
  border: none;
}

.led {
  height: 10px;
  width: 10px;
  display: inline-block;
  background-color: green;
  margin-right: 5px;
  border-radius: 50%;
}

.online-count {
  font-size: 12px;
  text-transform: uppercase;
}
</style>




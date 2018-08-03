<template>
    <div><button @click="handleTest">Test</button></div>
</template>
<script>
  import { SERVER_URL } from '@/assets/config';
  import axios from 'axios';
  axios.defaults.withCredentials=true;
  export default {
    data () {
      return {};
    },
    methods: {
      handleTest () {
        let url = SERVER_URL + '/hello?jsessionid=E3E9C8C4782B9FF56CA63B005C5AA76C';
        // this.$http.get(url,{ emulateJSON : true,withCredentials: true }).then(res=>{
        //   console.log(res.data);
        // });
        // this.$http.get(url).then(res=>{
        //   console.log(res.data);
        // });
        axios.get(url).then(res=>{
          console.log(res);
        });
      }
    }
  };
</script>

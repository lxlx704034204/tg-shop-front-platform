<template>
    <div><button @click="handleTest">Test</button></div>
</template>
<script>
  export default {
    data () {
      return {};
    },
    methods: {
      handleTest () {
        let url = '/helloJson';
        this.$axios.get(url).then(res=>{
          console.log(res);
        });
      }
    }
  };
</script>

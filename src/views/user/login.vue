<template>
    <div>login</div>
    <div>{{ test }}</div>
</template>

<script>
    import { get } from '../../axios/index'
    import axios from 'axios'
  export default {
    name: "login",
    setup(props, content) {

      get('/areaCommon/getAreaSubsetByJdId',{
      }, res => {
        console.log(res)
      }, err => {
        console.log(err)
      });

      return {
        test: 123456
      }
    }
  }
</script>

<style scoped>

</style>
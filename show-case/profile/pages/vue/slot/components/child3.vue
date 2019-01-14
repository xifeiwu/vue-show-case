<!--<template>-->
  <!--<div class="child">-->
    <!--<slot></slot>-->
    <!--<slot name="users" :data="users"></slot>-->
  <!--</div>-->
<!--</template>-->
<!--<script>-->
<!--export default {-->
  <!--mounted() {-->
    <!--console.log('mounted');-->
    <!--console.log(this.users)-->
  <!--},-->
  <!--data() {-->
    <!--return {-->
      <!--users: ['zhangsan','lisi','wanwu','zhaoliu','tianqi','xiaoba']-->
    <!--}-->
  <!--},-->
<!--}-->
<!--</script>-->
<template>
  <div class="child">
    <slot name="title"></slot>
    <slot name="users" :data="users"></slot>
  </div>
</template>

<script>
  export default {
    data: function(){
      return {
        users: ['zhangsan','lisi','wanwu','zhaoliu','tianqi','xiaoba']
      }
    },
    computed: {
    },
    methods:{
    },
    components: {
    }
  }
</script>

<style scoped>
  .child{
    background-color: #00bbff;
    width: 100%;
    padding: 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
</style>
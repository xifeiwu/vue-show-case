<template>
  <div id="vue-slot">
    <div class="father">
      <h3>这里是父组件</h3>
      <child1>
        <div class="tmpl">
          <span>菜单1</span>
          <span>菜单2</span>
          <span>菜单3</span>
          <span>菜单4</span>
          <span>菜单5</span>
          <span>菜单6</span>
        </div>
      </child1>
    </div>
    <div class="father">
      <h3>这里是父组件</h3>
      <child2>
        <div class="tmpl" slot="up">
          <span>菜单1</span>
          <span>菜单2</span>
          <span>菜单3</span>
          <span>菜单4</span>
          <span>菜单5</span>
          <span>菜单6</span>
        </div>
        <div class="tmpl" slot="down">
          <span>菜单-1</span>
          <span>菜单-2</span>
          <span>菜单-3</span>
          <span>菜单-4</span>
          <span>菜单-5</span>
          <span>菜单-6</span>
        </div>
        <div class="tmpl">
          <span>菜单->1</span>
          <span>菜单->2</span>
          <span>菜单->3</span>
          <span>菜单->4</span>
          <span>菜单->5</span>
          <span>菜单->6</span>
        </div>
      </child2>
    </div>

    <div class="father">
      <!--<child3>-->
        <!--<span slot="default">正因为作用域插槽绑定了一套数据，父组件可以拿来用。于是，情况就变成了这样：样式父组件说了算，但内容可以显示子组件插槽绑定的。</span>-->
        <!--<template slot-scope="users">-->
          <!--<div class="user">-->
            <!--<span v-for="item in users.users">{{item}}</span>-->
          <!--</div>-->
        <!--</template>-->
      <!--</child3>-->
      <child3>
        <span slot="title">正因为作用域插槽绑定了一套数据，父组件可以拿来用。于是，情况就变成了这样：样式父组件说了算，但内容可以显示子组件插槽绑定的。</span>
        <template slot-scope="user" slot="users">
          <ul>
            <li v-for="item in user.data">{{item}}</li>
          </ul>
        </template>

      </child3>
    </div>
  </div>
</template>

<style lang="scss">
  .father {
    margin-top: 20px;
  }
</style>
<script>
//  reference: https://juejin.im/post/5a69ece0f265da3e5a5777ed
// 父组件：展示不展示；子组件：怎么展示
//插槽，也就是slot，是组件的一块HTML模板，这块模板显示不显示、以及怎样显示由父组件来决定。
//但是插槽显示的位置却由子组件自身决定，slot写在组件template的什么位置，父组件传过来的模板将来就显示在什么位置。
  import child1 from './components/child1.vue';
  import child2 from './components/child2.vue';
  import child3 from './components/child3.vue';
  export default {
    components: {child1, child2, child3}
  }
</script>

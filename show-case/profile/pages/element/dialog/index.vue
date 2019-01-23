<template>
  <div id="element-dialog">
    <el-button type="primary" size="mini" @click="handleClick($event, 'show-logs')">查看日志</el-button>
    <dialog-for-log title="部署日志" :showStatus="dialogForLogStatus" ref="dialogForDeployLog">
      <div slot="content">
        <div v-for="(item,index) in deployLogs" :key="index" class="log-item" v-html="item"></div>
      </div>
    </dialog-for-log>
  </div>
</template>
<script>
  import dialogForLog from './dialog4log';
  export default {
    components: {dialogForLog},
    created() {},
    mounted() {},
    data() {
      return {
        dialogForLogStatus: {
          visible: false,
          full: false,
          showLoading: false,
          iconExpand: true
        },
      }
    },
    computed: {
      deployLogs() {
        const originLog = `
        介绍
类型检查
静态类型语言在编译时执行类型检查，而动态类型的语言在运行时执行类型检查。类型检查确保并强制你声明的变量的类型（常量，布尔值，数字，变量，数组，对象）与您指定的值相匹配。
当类型错误发生时，静态类型检查和动态类型检查之间的差异最为重要。在静态类型语言中，错误发生在编译步骤中，即在编译时会出现类型错误。在动态类型语言中，只有执行程序后才会出现错误。错误发生在运行时。
静态类型优势
可以尽早发现BUG和错误
静态类型检查允许我们在程序没有运行之前就可以确定我们所设定的确定性是否是对的。一旦有违反这些既定规则的行为，它能在运行之前就发现，而不是在运行时。
起到在线文档的功能
减少了复杂的错误处理
使你在重构时更有信心
更新了方法，并且相应地更新了类型定义，那么类型检查器将会帮我去捕获我遗漏的错误。
将数据和行为分离
帮助我们消除了一整类bug
减少单元测试的数量
使用场景
这段程序对你的业务非常关键
随着需求的变化，这段程序很可能会被重构
这段程序很复杂并且有许多活动组件
这段程序有一个大团队的开发者维护，他们需要能够快速且准确地理解代码
TypeScript
TypeScript 是 JavaScript 的超集，为 JavaScript 的生态增加了类型机制，并最终将代码编译为纯粹的 JavaScript 代码。
TypeScript 同样支持最新的 ECMAScript 标准，并能将代码根据需求转换为 ES 3 / 5 / 6，这也就意味着，开发者随时可以使用最新的 ECMAScript 特性，比如 module / class / spread operator 等，而无需考虑兼容性的问题。ECMAScript 所支持的类型机制非常丰富，包括：interface、enum、hybird type 等等。
目前主流的 IDE 都为 TypeScript 的开发提供了良好的支持，比如 Visual Studio / VS Code、Atom、Sublime 和 WebStorm。TypeScript 与 IDE 的融合，便于开发者实时获取类型信息。
推荐资料
为什么要在javascript中进行静态类型检查-静态类型的优点和缺点

How is the cookbook different from the guide? Why is this necessary?

Greater Focus: In the guide, we’re essentially telling a story. Each section builds on and assumes knowledge from each previous section. In the cookbook, each recipe can and should stand on its own. This means recipes can focus on one specific aspect of Vue, rather than having to give a general overview.

Greater Depth: To avoid making the guide too long, we try to include only the simplest possible examples to help you understand each feature. Then we move on. In the cookbook, we can include more complex examples, combining features in interesting ways. Each recipe can also be as long and detailed as it needs to be, in order to fully explore its niche.

Teaching JavaScript: In the guide, we assume at least intermediate familiarity with ES5 JavaScript. For example, we won’t explain how Array.prototype.filter works in a computed property that filters a list. In the cookbook however, essential JavaScript features (including ES6/2015+) can be explored and explained in the context of how they help us build better Vue applications.

Exploring the Ecosystem: For advanced features, we assume some ecosystem knowledge. For example, if you want to use single-file components in Webpack, we don’t explain how to configure the non-Vue parts of the Webpack config. In the cookbook, we have the space to explore these ecosystem libraries in more depth - at least to the extent that is universally useful for Vue developers.
1
2
3
4
5
6
7
8
9
10
`;
        const result = originLog.split('\n');
        return result
      }
    },
    methods: {
      handleClick(evt, action) {
        switch (action) {
          case 'show-logs':
            this.dialogForLogStatus.visible = true;
            break;
        }
      }
    }
  }
</script>
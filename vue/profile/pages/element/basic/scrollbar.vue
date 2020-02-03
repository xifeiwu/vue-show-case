<template>
  <div id="vue-scrollbar">
    <table>
      <caption>滚动相关总结</caption>
      <thead>
        <tr>
          <th>属性</th>
          <th>总结</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>overflow: auto, scroll</td>
          <td>scroll或auto，会影响浏览器自带的滚动条效果。scroll(会一直展示滚动条背景)，auto(hover的时候才展示滚动条及背景)</td>
        </tr>
      </tbody>
    </table>

    <label>
      <span style="color: green; font-size: 14px;">添加内容</span>
      <input type="checkbox" @click="handleClick($event, 'more-data')" :checked="moreData">
      <input type="checkbox" v-model="moreData">
    </label>
    <div class="container">
      <el-scrollbar :native="false" class="section not-show-default-scrollbar">
        <p v-for="(row, index) in rows">{{row}}</p>
      </el-scrollbar>
      <div class="section show-default-scrollbar">
        <div class="wrap">
          <p v-for="(row, index) in rows">{{row}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  #vue-scrollbar {
    table {
      margin-bottom: 10px;
      td, th {
        padding: 3px 6px;
      }
    }
    .container {
      .section {
        display: inline-block;
        margin-left: 5px;
        width: 500px;
        height: 600px;
        &.el-scrollbar {
          &.show-default-scrollbar {
            .el-scrollbar__wrap {
              color: #545454;
              &::-webkit-scrollbar {
                width: 3px;
                background-color: #F5F5F5;
              }
              &::-webkit-scrollbar-thumb {
                background-color: #909399;
              }
            }
          }
        }
        &.show-default-scrollbar {
          .wrap {
          }
          overflow: auto;
          color: #545454;
          &::-webkit-scrollbar {
            width: 3px;
            background-color: #F5F5F5;
          }
          &:hover::-webkit-scrollbar {
            width: 3px;
            background-color: #F5F5F5;
          }
          &::-webkit-scrollbar-thumb {
            background-color: #909399;
          }
        }
      }
    }
  }
</style>
<script>
  export default {
    mounted() {
//      console.log(this.rows);
    },
    data() {
      return {
        moreData: true,
        part1: `介绍
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
`,
        part2: `
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
为什么要在javascript中进行静态类型检查-静态类型的优点和缺点`
      }
    },
    computed: {
      rows() {
        var content = this.part1;
        if (this.moreData) {
          content += this.part2;
        }
//        var content = this.part1 + this.part2;
        return content.split('\n');
      }
    },
    methods: {
      handleClick(evt, action) {
        const target = evt.target;
        switch (action) {
          case 'more-data':
            this.moreData = target.checked;
            console.log(target.checked);
            break;
        }
      }
    }
  }
</script>
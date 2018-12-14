<template>
  <div :class="['click-to-edit', inEdit ? 'in-edit' : '']"
       v-clickoutside="handleClickOutside">
    <div class="content">
      <input type="text"
             class="write"
             v-if="inEdit"
             ref="input"
             v-model="content"
             @blur="handleClick($event, 'input-blur')"
      />
      <pre class="read">{{content}}</pre>
    </div>
    <div class="icons">
      <i class="el-icon-check" v-if="inEdit" @click="handleClick($event, 'icon-check-click')"></i>
      <i class="el-icon-close" v-if="inEdit" @click="handleClick($event, 'icon-close-click')"></i>
      <i class="el-icon-edit"  v-if="!inEdit && content.length > 0" @click="handleClick($event, 'icon-edit-click')"></i>
      <i class="el-icon-plus"  v-if="!inEdit && content.length === 0" @click="handleClick($event, 'icon-plus-click')"></i>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.click-to-edit {
  display: inline-block;
  font-size: 14px;
  &.in-edit {
    .content {
      min-width: 100px;
    }
  }
  .content {
    display: inline-block;
    position: relative;
    .write, .read {
      display: inline-block;
      font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
      font-size: 14px;
      line-height: 16px;
      padding: 2px;
      border-bottom: 1px solid transparent;
    }
    .read {
      color: gray;
    }
    .write {
      position: absolute;
      width: 100%;
      left: 0px;
      right: 0px;
      top: 0px;
      bottom: 0px;
      border-bottom-color: gray;
    }
  }
  .icons {
    display: inline-block;
    height: 20px;
    margin-left: 3px;
    i {
      font-size: 16px;
      line-height: 20px;
      /*width: 20px;*/
      height: 20px;
      margin: 0px 2px;
      border-radius: 5px;
      cursor: pointer;
      &:hover {
        font-weight: bold;
      }
    }
    .el-icon-edit, .el-icon-plus {
      color: #E6A23C;
    }
    .el-icon-check {
      color: #67C23A;
    }
    .el-icon-close {
      color: #F56C6C;
    }
  }
}
</style>
<script>
  import Clickoutside from 'element-ui/src/utils/clickoutside';
  export default {
    directives: { Clickoutside },

    props: ['value'],

    mounted() {
    },
    data () {
      return {
        inEdit: false,
        content: this.value,
        contentBeforeEdit: null,
      }
    },
    computed: {
    },

    watch: {
      value: function() {
        this.content = this.value;
      },
    },

    methods: {
      handleClick(evt, action) {
        switch (action) {
          case 'input-blur':
//            this.inEdit = false;
            break;
          case 'icon-plus-click':
            this.inEdit = true;
            this.$nextTick(() => {
              this.contentBeforeEdit = this.content;
              this.$refs['input'].focus();
            });
            break;
          case 'icon-edit-click':
            this.inEdit = true;
            this.$nextTick(() => {
              this.contentBeforeEdit = this.content;
              this.$refs['input'].focus();
            });
            break;
          case 'icon-check-click':
            this.inEdit = false;
            break;
          case 'icon-close-click':
            this.content = this.contentBeforeEdit;
            this.inEdit = false;
            break;
        }
        const target = evt.target;
        const tagName = target.tagName;
      },
      handleClickOutside() {
        this.inEdit = false;
      }
    }

  }
</script>
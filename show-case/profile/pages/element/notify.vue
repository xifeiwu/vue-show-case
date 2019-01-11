<template>
  <div id="notify">
    <el-button @click="handleClick('nofity')">notify</el-button>
    <el-button @click="handleClick('changeAppName')">open-custom-dialog</el-button>
    <el-button type="text" @click="handleClick('msgbox-vnode')">点击打开 Message Box</el-button>
    <div ref="dialog">fdsfdsa</div>

    <el-dialog title="更改应用名称"
               :visible="action.name == 'changeAppName'"
               v-if="action.name == 'changeAppName'"
               class="size-600"
               @close="closeDialog"
               :close-on-click-modal="false"
    >
      <el-form :model="action.data" :rules="rules" labelWidth="120px" size="mini" ref="changeAppNameForm">
        <el-form-item label="当前应用名称：">
          {{action.dataOrigin.appName}}
        </el-form-item>
        <el-form-item label="更改为：" prop="appName">
          <el-input v-model="action.data.appName" placeholder="中文，英文，数字，下划线，中划线。2-30个字符"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer flex">
          <div class="item">
            <el-button type="primary"
                       @click="handleDialogEvent('changeAppName')">保存</el-button>
          </div>
          <div class="item">
            <el-button @click="closeDialog()">取消</el-button>
          </div>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script>
  export default {
    create() {
      console.log(this.$createElement);
    },
    mounted() {
      console.log(this);
      console.log(this.$refs['dialog']);
    },
    data() {
      return {
        action: {
          name: null,
          promise: {
            resolve: () => {},
            reject: () => {},
          },
          dataOrigin: null,
          data: null
        },
        rules: {
          appName: [{
            type: 'string',
            required: true,
            message: '必须填写应用名',
            trigger: ['blur', 'change']
          }]
        }
      }
    },
    methods: {
      openDialog(name, data) {
        this.action.name = name;
        this.action.dataOrigin = this.$utils.cloneDeep(data);
        this.action.data = this.$utils.cloneDeep(data);

        return new Promise((resolve, reject) => {
          this.action.promise.resolve = resolve;
          this.action.promise.reject = reject;
        });
      },
      closeDialog() {
        this.action.name = null;
        this.action.promise.reject('cancel');
      },
      handleDialogEvent(evt, name) {
        this.action.promise.resolve(this.action.data);
      },
      async handleClick(action) {
        switch (action) {
          case 'nofity':
            const title = '错误';
            const message = 'message';
            this.$notify.error({
              title,
              message: message,
              duration: 0
            });
            break;
          case 'changeAppName':
            try {
              var data = await this.openDialog('changeAppName', {appName: 'old'});
              this.action.name = null;
              console.log(data);
            } catch (err) {
              console.log(err);
            }
            break;
          case 'msgbox-vnode':
            const h = this.$createElement;
            this.$msgbox({
              title: '消息',
//              message: h('p', null, [
//                h('span', null, '内容可以是 '),
//                h('i', { style: 'color: teal' }, 'VNode')
//              ]),
              message: this.$refs['dialog'],
              showCancelButton: true,
              confirmButtonText: '确定',
              cancelButtonText: '取消',
//              beforeClose: (action, instance, done) => {
//                if (action === 'confirm') {
//                  instance.confirmButtonLoading = true;
//                  instance.confirmButtonText = '执行中...';
//                  setTimeout(() => {
//                    done();
//                    setTimeout(() => {
//                      instance.confirmButtonLoading = false;
//                    }, 300);
//                  }, 3000);
//                } else {
//                  done();
//                }
//              }
            }).then(action => {
              this.$message({
                type: 'info',
                message: 'action: ' + action
              });
            });
            break;
        }
      }
    }
  }
</script>
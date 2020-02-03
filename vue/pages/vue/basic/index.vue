<template>
  <div id="vue-basic">
    <div class="health-check">
      <el-input v-model="healthCheck.content"></el-input>
      <div>{{healthCheck.contentCheckErrMsg}}</div>
    </div>

    <el-input v-model="healthCheck2.content"></el-input>
    <el-input v-model="healthCheck3.content"></el-input>
    <el-button @click="handleClick($event)">查找</el-button>
  </div>
</template>
<script>
  export default {
    mounted() {
      const healthCheck = this.getObjHealthCheck();
      this.healthCheck3 = healthCheck;
    },
    data() {
      return {
        healthCheck: {
          type: 'http',
          _content: {
            http: '',
            shell: '',
            socket: '8080',
          },
          set content(value) {
            if (['http', 'shell', 'socket'].indexOf(this.type) > -1) {
              this._content[this.type] = value;
            }
          },
          get content() {
            return this._content[this.type];
          },
          // contentCheckErrMsg is a watcher porp of vue
          get contentCheckErrMsg() {
            console.log('in getter of contentCheckErrMsg');
            var errMsg = '';
            switch (this.type) {
              case 'http':
                const regForHttp = /^\/[A-Za-z0-9_\-\.\/]{1,99}$/;
                if (!regForHttp.exec(this.content)) {
                  errMsg = '以/开头，可以包含字母、数字、下划线、中划线。2-100个字符';
                }
                break;
              case 'shell':
                if (this.content.trim().length === 0) {
                  errMsg = '健康检查不能为空';
                }
                break;
              case 'socket':
                break;
            }
          }
        },
        healthCheck2: this.getObjHealthCheck(),
        healthCheck3: this.getObjHealthCheck(),
      }
    },
    methods: {
      getObjHealthCheck() {
        return {
          type: 'socket',
          _content: {
            http: '',
            shell: '',
            socket: '8080',
          },
          set content(value) {
            console.log(value);
            if (['http', 'shell', 'socket'].indexOf(this.type) > -1) {
              this._content[this.type] = value;
            }
          },
          get content() {
            return this._content[this.type];
          },
          //
          get contentCheckErrMsg() {
            console.log('in getter of contentCheckErrMsg');
            var errMsg = '';
            switch (this.type) {
              case 'http':
                const regForHttp = /^\/[A-Za-z0-9_\-\.\/]{1,99}$/;
                if (!regForHttp.exec(this.content)) {
                  errMsg = '以/开头，可以包含字母、数字、下划线、中划线。2-100个字符';
                }
                break;
              case 'shell':
                if (this.content.trim().length === 0) {
                  errMsg = '健康检查不能为空';
                }
                break;
              case 'socket':
                break;
            }
          }
        }
      },
      handleClick(evt) {
        console.log(this.healthCheck);
        console.log(this.healthCheck2);
        console.log(this.healthCheck3);
      }
    }
  }
</script>
<template>
  <div id="element-upload">
    <el-upload
            class="upload-demo"
            ref="upload"
            :headers="{token: 'token'}"
            :data="{'id': 666}"
            :action="postUrl"
            :auto-upload="false"
            :beforeUpload="beforeFileUpload"
            :onChange="onFileChange"
            :onRemove="onFileRemove"
            :onSuccess="afterLoadSuccess"
            :onError="afterLoadError"
            :multiple="true"
            @onUploadFiles="onUploadFiles"
    >
      <el-button slot="trigger" type="primary" size="mini-extral">选取文件</el-button>
      <!--<el-button style="margin-left: 10px;" type="success" size="mini-extral" @click="handleSubmitUpload">上传到服务器</el-button>-->
    </el-upload>
    <el-button size="mini" type="primary" @click="handleClick($event, 'upload')">上传</el-button>
  </div>
</template>

<script>
  export default {
    created() {},
    mounted() {},
    data() {
      return {
        postUrl: 'http://172.16.112.199:3000/api/post',
        fileListToUpload: [],
        uploadFileSuccessCount: 0
      }
    },
    methods: {
      handleClick(evt, action) {
        this.$refs.upload.submit();
      },
      onFileChange(file, fileList) {
        this.fileListToUpload = fileList;
        console.log('onFileChange');
        console.log(fileList);
      },
      onFileRemove(file, fileList) {
        this.fileListToUpload = fileList;
      },
      onUploadFiles(fileList) {
        console.log('onUploadFiles');
        console.log(fileList);
      },
      beforeFileUpload(file) {
        return new Promise((resolve, reject) => {
          let isExcel = false;
          if (file) {
            if (/\.xls$/.exec(file.name) || /\.xlsx$/.exec(file.name)) {
              isExcel = true;
            }
          }
          // un-check file type
          isExcel = true;
          if (isExcel) {
            resolve(file);
          } else {
            reject(null);
            this.$message({
              type: 'error',
              message: '只能上传以.xls或.xlsx为后缀的excel文件'
            });
          }
        })
      },
      /**
       * callback of upload success
       * uploadWorkOrder is called after all file upload success
       * @param res, not used
       * @param file, the file upload just now
       * @param uploadFiles, all files in uploadlist, including the files has been upload
       */
      afterLoadSuccess(res, file, uploadFiles) {
        this.uploadFileSuccessCount += 1;
        console.log(`uploadFileSuccessCount: ${this.uploadFileSuccessCount}`);
      },
      afterLoadError(err, file, uploadFiles) {
        if (err) {
          this.$notify.error({
            title: '提示',
            message: `${file.name}上传失败`,
            duration: 0,
            onClose: function () {
            }
          });
        }
      },
    }
  }
</script>
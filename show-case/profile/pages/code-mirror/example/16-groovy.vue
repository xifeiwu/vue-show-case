<template>
  <div class="md-card">
    <!-- codemirror -->
    <codemirror v-model="code" :options="cmOption"></codemirror>
  </div>
</template>

<script>

  import {codemirror} from "vue-codemirror";
  import "codemirror/lib/codemirror.css";

  // language
//  import "codemirror/mode/properties/properties.js";
  import "codemirror/mode/groovy/groovy.js";
  // theme
  import "codemirror/theme/paraiso-light.css";
  // require active-line.js
  import "codemirror/addon/selection/active-line.js";

  export default {
    components: {codemirror},
    data() {
      const code =
        `
try {
   timeout(time: 20, unit: 'MINUTES') {
       def customImage    = 'false'

       def packageType    = 'JAR'
       def groupTag       = 'jinganghuiguiyi'
       def serviceName    = 'jingang-demo-jar'
       def timeTag        = '2018-12-06-18-37-30'
       def gitlabAddress  = 'git@gitlab.puhuitech.cn:infrastructure-dev/Test-Demo.git'
       def gitlabBranch   = 'master-wxz'
       def healthCheckUrl = 'http://iperf3.jinganghuiguiyi.test//health'
       def profileId      = 'test'
       def deployUrl      = 'http://10.10.58.126:30334/service/pipelineDeploy?appConfigId='
       def credentialsId  = 'f78c3727-db2f-4604-9fb7-dc1988ac3e72'
       def harborImageServer = 'harbor.finupgroup.com'
       def harborAddress  = 'https://harbor.finupgroup.com'
       def harborPassword = 'Harbor12345'
       def harborUser     = 'admin'
       def eagleeyeGitAddr= 'git@gitlab.puhuitech.cn:finup-eagleeyes-agent/agentJar.git'
       def basicImageEagleEye = 'harbor.finupgroup.com/basic/phjava:1.8.0.92_ssh1_godeyes'
       def emailToAddress = 'wangxiaozhe@finupgroup.com'
       def fullImage = harborImageServer + '/' + groupTag + '/' + serviceName + '/' + timeTag
       node ('maven-latest') {
        stage('下载代码(Git)') {
           if ('false' == customImage) {
               checkout([
                   $class: 'GitSCM',
                   branches: [[name: '*/' + gitlabBranch ]],
                   doGenerateSubmoduleConfigurations: false,
                   extensions: [],
                   submoduleCfg: [],
                   userRemoteConfigs: [
                       [credentialsId: credentialsId,
                       url: gitlabAddress ]
                   ]
               ])
           } else {
               //custom image do nothing
           }
        }//git
        stage('代码扫描(Sonar)') {
           if ('false' == customImage) {
               withSonarQubeEnv() {
                   sh 'mvn install -Dmaven.test.skip=true;mvn clean org.jacoco:jacoco-maven-plugin:prepare-agent test -P' + profileId + ' -X'
               }
               emailext attachLog: true,
               body: '''(本邮件是程序自动下发的，请勿回复，请相关人员fix it,重新提交到git 构建)
               项目名称：$PROJECT_NAME
               构建编号：$BUILD_NUMBER
               GIT版本号：\${GIT_REVISION}
               构建状态：$BUILD_STATUS
               触发原因：\${CAUSE}
               构建日志地址：\${BUILD_URL}console
               构建地址：$BUILD_URL
               变更集: \${JELLY_SCRIPT,template='html'}''',
               subject: 'Engine Unit Test',
               to: emailToAddress
           } else {
               //sonar test nothing
           }
        }//sonar
        stage ('代码打包(Maven)') {
           if ('false' == customImage) {
               sh 'mvn clean package -pl ' + serviceName + ' -am -Dmaven.test.skip=true -P' + profileId
           } else {
               //maven build nothing
           }
        }//maven
        stage ('制作镜像(Image)') {
           if ('false' == customImage) {
               if ('JAR'== packageType) {
                   sh 'docker login -u ' + harborUser + ' -p ' + harborPassword + ' ' + harborAddress
                   sh 'mkdir agent'
                   dir('agent') {
                       checkout([
                           $class: 'GitSCM',
                           branches: [[name: '*/production']],
                           doGenerateSubmoduleConfigurations: false,
                           extensions: [],
                           submoduleCfg: [],
                           userRemoteConfigs: [
                               [credentialsId: credentialsId,
                               url: eagleeyeGitAddr]
                           ]
                       ])
                   }//dir
                   writeFile file: serviceName + '/Dockerfile.' + fullImage, text: '''
                       FROM ''' + basicImageEagleEye + '''
                       ADD ''' + serviceName + '''/target/ /data/''' + serviceName + '''/
                       RUN mkdir -p /data/agent/godeyes
                       RUN mkdir -p /data/agent/godeyes/plugins
                       COPY agent/agent-package/monitor-agent-core-1.0.2.jar /data/agent/godeyes/godeyes-agent-SNAPSHOT.jar
                       COPY agent/agent-package/plugins /data/agent/godeyes/plugins
                       CMD ['/data/run_all.sh']'''
                   sh 'docker build -f ' + serviceName + '/Dockerfile.' + fullImage + ' -t ' + fullImage + ' .'
                   sh 'docker push ' + fullImage
                   sh 'docker rmi ' + fullImage
               } else if ('ZIP' == packageType) {
                   //zip build
               } else if ('WAR' == packageType) {
                   //war build
               }
           } else {
               //build image nothing
           }
        }//image
        stage('部署到[test]环境(Deploy)') {
            try {
                sh 'curl -X GET ' + deployUrl
            } catch (err) {
                emailext body: '',
                recipientProviders: [[$class: 'DevelopersRecipientProvider']],
                subject: 'Deploy to test Failed',
                to: emailToAddress
                echo 'Deploy to test Failed'
            }
        }//deploy test
        //auto test
        stage('获取sonar报告(sonar report)') {
            //default sona report
        }//get sonar report
stage('function test and continue?'){
    input '是否继续部署beta环境？'
}
        stage('部署到beta环境(deploy beta)') {
            //default deploy beta
        }//deploy beta
       }//node
   }//timeout
} catch (err) {
   echo 'in catch block'
   echo 'Caught: \${err}'
   currentBuild.result = 'FAILURE'
   throw err
}//catch`
      return {
        code,
        cmOption: {
          tabSize: 4,
          styleActiveLine: true,
          lineNumbers: true,
          line: true,
          mode: "groovy",
          theme: "paraiso-light",
          readOnly: false,
          viewportMargin: 10
        }
      }
    }
  }
</script>


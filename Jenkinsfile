pipeline {
  agent none
  options { 
    buildDiscarder(logRotator(numToKeepStr: '2'))
  }
  
  stages {
    stage('1. Test, happens in pull request') {
      agent 'pod-dind'
      steps {
        container('pod-dind'){
          sh 'docker info'
        }
      }
    }
  }
}

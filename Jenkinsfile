pipeline {
  agent { label 'pod-dind'}
  options { 
    buildDiscarder(logRotator(numToKeepStr: '2'))
  }
  
  stages {
    stage('1. Test, happens in pull request') {
      steps {
        container('dind'){
          sh 'docker info'
        }
      }
    }
  }
}

pipeline {
  agent { label: 'nodejs-app'}
  options { 
    buildDiscarder(logRotator(numToKeepStr: '2'))
  }
  
  stages {
    stage('1. Test, happens in pull request') {
      steps {
        container('nodejs'){
          sh 'node --version'
        }
      }
    }
  }
}

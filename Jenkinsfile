pipeline {
  agent {
    kubernetes {
      label 'nodejs-app-pod-2'
      yamlFile 'nodejs-pod.yml'
    }
  }
  options { 
    buildDiscarder(logRotator(numToKeepStr: '2'))
    skipDefaultCheckout true
  }
  
  stages {
    stage('1. Test, happens in pull request') {
      steps {
        sh 'printenv'
      }
    }
  }
}

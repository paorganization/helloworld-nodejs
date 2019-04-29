pipeline {
  agent {
    kubernetes {
      label 'nodejs-app-pod-2'
      yamlFile 'nodejs-pod.yml'
    }
  }
  options { 
    buildDiscarder(logRotator(numToKeepStr: '2'))
  }
  
  stages {
    stage('1. Test, happens in pull request') {
      steps {
        sh 'printenv'
        sh 'echo $GIT_COMMIT'
      }
    }
    
    stage('2. Test, happens in pull request') {
      steps {
        sh 'printenv'
        sh 'echo $GIT_COMMIT'
      }
    }
    
  }
}

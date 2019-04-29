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
      agent { label: 'nodejs-app'}
      steps {
        container('pod-dind'){
          sh 'docker info'
        }
      }
    }
  }
}

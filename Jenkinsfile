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
    stage('Test') {

      steps {
        checkout scm
        sh 'java -version'
        container('nodejs') {
          echo 'Hello World!'   
          sh 'node --version'
        }
      }
    }
    
    stage('Build and Push Image') {
      when {
         beforeAgent true
         branch 'master'
      }
      steps {
         echo "TODO - build and push image"
      }
    }
  }
}

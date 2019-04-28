pipeline {
  agent { label 'nodejs-app' }
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
          sh 'touch weiming.test'
        }
      }
    }
    stage('build') {
      steps {
        container('nodejs') {
          echo 'Hello World!'   
          sh 'node --version'
          sh 'ls -l weiming.test'
        }
      }
    }
  }
}

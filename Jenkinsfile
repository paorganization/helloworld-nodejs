pipeline {
  agent any
  
  stages {
    stage('test: whenever change happens') {
      agent { label 'nodejs-app'}
      when {
        beforeAgent true
        not { branch 'master'}
      }
      steps {
        sh 'echo "test"'
        container('nodejs') {
          sh 'npm install'
          sh 'npm test'
        }
      }
    }
    
    stage('build docker image and push it to AWS ECR') {
      when {
        beforeAgent true
        changeRequest target: 'master' 
      }
      steps {
        sh 'echo "build"'
      }
    }
    
    stage('deploy: pull docker image from AWS ECR') {
      when {
        beforeAgent true
        changeRequest target: 'master' 
      }
      steps {
        sh 'echo deploy: pulling docker image'
      }
    }
    
  }
}

pipeline {
  agent none
  
  stages {
    agent { label 'nodejs-app'}
    stage('test: whenever change happens') {
      when {
        beforeAgent true
        not { branch 'master'}
      }
      steps {
        container('nodejs') {
          sh 'node install'
          sh 'node test'
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

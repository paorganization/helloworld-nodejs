pipeline {
  stages {
    stage('test: whenever change happens') {
      steps {
        sh 'echo "test"'
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

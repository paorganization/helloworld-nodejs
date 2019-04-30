pipeline {
  agent none
  
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
      agent { label 'pod-dind'}
      when {
        beforeAgent true
        changeRequest target: 'master' 
      }
      steps {
        sh 'echo "build"'
        withCredentials(
        [[
            $class: 'AmazonWebServicesCredentialsBinding',
            credentialsId: 'aws-ecr-credential',  // ID of credentials in Jenkins
            accessKeyVariable: 'AWS_ACCESS_KEY_ID',
            secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
        ]]) {
          container('dind') {
            sh 'ls -l'
            sh 'which dockerd'
            sh 'dockerd &'
            sh 'apk add --update curl python3'
            sh 'curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"'
            sh 'unzip awscli-bundle.zip'
            sh 'python3 awscli-bundle/install -i /usr/local/aws -b /usr/local/bin/aws'
            sh 'aws --version'
            sh "`AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} \
            AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} \
            AWS_REGION=us-east-1 \
            aws ecr get-login --no-include-email --region us-east-1`"
          }
        }
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

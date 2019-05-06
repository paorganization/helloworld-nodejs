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
    
    stage('build： docker image and push it to AWS ECR') {
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
            sh 'printenv' 
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
            sh 'docker build -t ci-jenkins-node .'
            sh 'docker tag ci-jenkins-node:latest 781074499793.dkr.ecr.us-east-1.amazonaws.com/ci-jenkins-node:$GIT_COMMIT'
            sh 'docker push 781074499793.dkr.ecr.us-east-1.amazonaws.com/ci-jenkins-node:$GIT_COMMIT'
          }
        }
      }
    }
    
    stage('e2e test: retag docker image') {
      agent { label 'pod-dind'}
      when {
        beforeAgent true
        changeRequest target: 'master' 
      }
      steps {
        sh 'echo deploy: pulling docker image'
        withCredentials(
        [[
            $class: 'AmazonWebServicesCredentialsBinding',
            credentialsId: 'aws-ecr-credential',  // ID of credentials in Jenkins
            accessKeyVariable: 'AWS_ACCESS_KEY_ID',
            secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
        ]]) {
          container('dind') {
            sh 'e2e test pass'
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
            sh 'docker pull 781074499793.dkr.ecr.us-east-1.amazonaws.com/ci-jenkins-node:$GIT_COMMIT'
            sh 'docker tag 781074499793.dkr.ecr.us-east-1.amazonaws.com/ci-jenkins-node:$GIT_COMMIT 781074499793.dkr.ecr.us-east-1.amazonaws.com/ci-jenkins-node:latest'
            sh 'docker push 781074499793.dkr.ecr.us-east-1.amazonaws.com/ci-jenkins-node:latest'
          }
        }
      }
    }
    
    stage('deploy') {
      agent { label 'nodejs-app'}
      when {
        beforeAgent true
        changeRequest target: 'master' 
      }
      steps {
        container('nodejs') {
         sh 'echo "deploy"'
        }
      }
    }
    
  }
}

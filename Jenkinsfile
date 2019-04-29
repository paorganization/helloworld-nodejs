pipeline {
    agent { label 'pod-dind'}
    
    stages {
        stage ('docker build testing') {
            steps {
                withCredentials(
                [[
                    $class: 'AmazonWebServicesCredentialsBinding',
                    credentialsId: 'aws-ecr-credential',  // ID of credentials in Jenkins
                    accessKeyVariable: 'AWS_ACCESS_KEY_ID',
                    secretKeyVariable: 'AWS_SECRET_ACCESS_KEY'
                ]]) {
                    container('dind') {
                        sh 'which dockerd'
                        sh 'dockerd &'
                        sh 'apk add --update curl python3'
                        sh 'curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"'
                        sh 'unzip awscli-bundle.zip'
                        sh 'python3 awscli-bundle/install -i /usr/local/aws -b /usr/local/bin/aws'
                        sh 'aws --version'
                        sh "AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} \
                        AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} \
                        AWS_REGION=us-east-1 \
                        $(aws ecr get-login --no-include-email --region us-east-1)"
                    }
                }
            }
        }
    }
}

pipeline {
    agent { label 'pod-dind'}
    
    stages {
        stage ('docker build testing') {
            steps {
                container('dind') {
                    sh 'which dockerd'
                    sh 'dockerd &'
                    sh 'apk add --update curl python3'
                    sh 'curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"'
                    sh 'unzip awscli-bundle.zip'
                    sh 'python3 awscli-bundle/install -i /usr/local/aws -b /usr/local/bin/aws'
                    sh 'aws --version'
                }
            }
        }
    }
}

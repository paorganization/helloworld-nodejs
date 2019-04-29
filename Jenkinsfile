pipeline {
    agent { label 'pod-dind'}
    
    stages {
        stage ('docker build testing') {
            steps {
                container('dind') {
                    sh 'which dockerd'
                    sh 'dockerd &'
                    sh 'docker info'
                }
            }
        }
    }
}

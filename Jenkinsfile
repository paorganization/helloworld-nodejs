pipeline {
    agent { label 'pod-dind'}
    
    stages {
        stage ('docker build testing') {
            steps {
                container('dind') {
                    sh 'ps aux'
                    sh 'docker info'
                }
            }
        }
    }
}

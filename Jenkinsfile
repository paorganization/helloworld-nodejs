pipeline {
    agent { label 'pod-dind'}
    
    stages {
        stage {
            steps {
                container('dind') {
                    sh 'docker info'
                }
            }
        }
    }
}

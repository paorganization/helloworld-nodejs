pipeline {
    agent { label 'pod-dind'}
    
    stages {
        stage ('docker build testing') {
            steps {
                container('dind') {
                    scripts {
                        ps aux
                        sleep 30
                        docker info
                    }
                }
            }
        }
    }
}

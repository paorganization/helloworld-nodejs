pipeline {
    agent { label 'pod-dind'}
    
    stages {
        stage ('docker build testing') {
            steps {
                container('dind') {
                    scripts {
                        ps aux
                       
                        docker info
                    }
                }
            }
        }
    }
}

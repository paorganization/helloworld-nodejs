podTemplate(){
    node('pod-dind') {
        container('dind') {
            stage('Build My Docker Image') { 
                sh 'docker info'
            } 
        }
    }
}

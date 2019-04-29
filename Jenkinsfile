pipeline {
  agent {
    kubernetes {
      label 'nodejs-app-pod-2'
      yamlFile 'nodejs-pod.yml'
    }
  }
  options { 
    buildDiscarder(logRotator(numToKeepStr: '2'))
    skipDefaultCheckout true
  }
  
  stages {
    stage('Test, happens in pull request') {
      when {
        beforeAgent true
        changeRequest target: 'master' 
      }
      steps {
        checkout scm
        sh 'java -version'
        container('nodejs') {
          echo 'Hello World!'   
          sh 'node --version'
        }
      }
    }
    
    stage('this stage happens in master branch') {
      when { 
        beforeAgent true
        branch 'master'
      }
      steps {
         echo "this stage happens in pull request or not master branch"
      }
    }
    stage('this stage happens only in pull request') {
      when {
        beforeAgent true
        changeRequest target: 'master' 
      }
      steps {
        echo "this stage happens only in pull request"
      }
    }
    
    stage('this stage happens only in not master branch') {
      when {
        beforeAgent true
        not {
          branch 'master'
        }
      }
      steps {
        echo "this stage happens only in not master branch"
      }
    }    
  }
}

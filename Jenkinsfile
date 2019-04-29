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
    stage('1. Test, happens in pull request') {
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
    
    stage('2. this stage happnes no matter what') {
      steps {
         echo "this stage happnes no matter what"
      }
    }
    
    stage('3. this stage happnes on master only') {
      when { 
        beforeAgent true
        branch 'master'
      }
      steps {
         echo "this stage happnes on master only"
      }
    }
    stage('4. this stage happens only in pull request') {
      when {
        beforeAgent true
        changeRequest target: 'master' 
      }
      steps {
        echo "this stage happens only in pull request"
      }
    }
    
    stage('5. this stage happens only in not master branch') {
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

pipeline {
  agent any

  stages {
    stage('Install') {
      steps {
        sh 'npm install'
      }
    }
    stage('Test') {
      steps {
        echo 'Testing..'
      }
    }
    stage('Build') {
      parallel {
        stage('Build apples') {
          steps {
            sh 'npm run build:apples'
          }
        }
        stage('Build oranges') {
          steps {
            sh 'npm run build:oranges'
          }
        }
      }
    }
    stage('Deploy') {
      steps {
        echo 'Deploying....'
      }
    }
  }
}

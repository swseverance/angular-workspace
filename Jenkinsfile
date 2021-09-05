pipeline {
  agent any

  tools {
    nodejs "NodeJS"
  }

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
      }
    }
    stage('Deploy') {
      steps {
        echo 'Deploying....'
      }
    }
  }
}

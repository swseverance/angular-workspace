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
        sh 'npm run test:headless'
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
    stage('Deploy to DEV') {
      when {
        branch 'develop'
      }
      steps {
        echo 'Deploying to DEV'
      }
    }
  }
}

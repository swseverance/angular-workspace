pipeline {
  tools {
    docker "Docker"
  }

  agent {
    docker {
      image 'node:14-alpine'
    }
  }

  stages {
    stage('Install') {
      steps {
        sh 'npm install'
      }
    }
    stage('Test') {
      steps {
        echo 'test'
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
        sshPublisher(
          continueOnError: false,
          failOnError: true,
          publishers: [
            sshPublisherDesc(
              configName: "Application-Server-New",
              verbose: true,
              transfers: [
                sshTransfer(
                  sourceFiles: "dist/**/*",
                  removePrefix: "dist",
                  remoteDirectory: "/home/ec2-user",
                  execCommand: "./create-image-and-container.sh"
                )
              ],
              useWorkspaceInPromotion: true
            )
          ]
        )
      }
    }
  }
}

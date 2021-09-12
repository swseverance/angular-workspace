void setBuildStatus(String state) {
  step([
    $class: "GitHubCommitStatusSetter",
    reposSource: [$class: "ManuallyEnteredRepositorySource", url: "https://github.com/swseverance/angular-workspace"],
    contextSource: [$class: "ManuallyEnteredCommitContextSource", context: "continuous-integration/jenkins"],
    errorHandlers: [[$class: "ChangingBuildStatusErrorHandler", result: "UNSTABLE"]],
    statusResultSource: [$class: "ConditionalStatusResultSource", results: [[$class: "AnyBuildResult", message: state, state: state]] ]
  ]);
}

pipeline {
  agent {
    docker {
      image 'cimg/node:15.0.1-browsers'
    }
  }

  stages {
    stage('Install') {
      steps {
        sh 'npm install'
      }
    }
    stage('Build & Test') {
      parallel {
        stage('Test') {
          steps {
            sh 'npm run test:headless'
          }
        }
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
  post {
    success {
      setBuildStatus("SUCCESS")
    }
    failure {
      setBuildStatus("FAILURE")
    }
  }
}

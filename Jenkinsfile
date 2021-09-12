pipeline {
  agent {
    dockerfile true
  }

  environment {
    GITHUB_TOKEN = credentials('GITHUB_TOKEN')
  }

  stages {
    stage('Install') {
      steps {
        sh 'sleep 20'
      }
    }
    // stage('Build & Test') {
    //   parallel {
    //     stage('Test') {
    //       steps {
    //         sh 'npm run test:headless'
    //       }
    //     }
    //     stage('Build apples') {
    //       steps {
    //         sh 'npm run build:apples'
    //       }
    //     }
    //     stage('Build oranges') {
    //       steps {
    //         sh 'npm run build:oranges'
    //       }
    //     }
    //   }
    // }
    // stage('Deploy to DEV') {
    //   when {
    //     branch 'develop'
    //   }
    //   steps {
    //     sshPublisher(
    //       continueOnError: false,
    //       failOnError: true,
    //       publishers: [
    //         sshPublisherDesc(
    //           configName: "Application-Server-New",
    //           verbose: true,
    //           transfers: [
    //             sshTransfer(
    //               sourceFiles: "dist/**/*",
    //               removePrefix: "dist",
    //               remoteDirectory: "/home/ec2-user",
    //               execCommand: "./create-image-and-container.sh"
    //             )
    //           ],
    //           useWorkspaceInPromotion: true
    //         )
    //       ]
    //     )
    //   }
    // }
  }
  post {
    success {
      step([
        $class: "GitHubCommitStatusSetter",
        reposSource: [$class: "ManuallyEnteredRepositorySource", url: "https://github.com/swseverance/angular-workspace"],
        contextSource: [$class: "ManuallyEnteredCommitContextSource", context: "continuous-integration/jenkins"],
        errorHandlers: [[$class: "ChangingBuildStatusErrorHandler", result: "UNSTABLE"]],
        statusResultSource: [$class: "ConditionalStatusResultSource", results: [[$class: "AnyBuildResult", message: "done!!!", state: "success"]] ]
      ]);
    }
    failure {
      sh './update-status.sh failure $GITHUB_TOKEN $GIT_COMMIT $BUILD_URL'
    }
  }
}

pipeline {
  agent {
    docker {
      image 'node:14-alpine'
    }
  }

  stages {
    stage('Build') {
      steps {
        script {
          echo "CHANGE_ID ${env.CHANGE_ID}"
          // CHANGE_ID is set only for pull requests, so it is safe to access the pullRequest global variable
          pullRequest.addLabel('Build Failed')


          // for (commit in pullRequest.commits) {
          //   echo "SHA: ${commit.sha}, Committer: ${commit.committer}, Commit Message: ${commit.message}"
          // }
        }
      }
    }
  }
}

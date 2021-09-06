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
            // CHANGE_ID is set only for pull requests, so it is safe to access the pullRequest global variable
            if (env.CHANGE_ID) {
                pullRequest.addLabel('Build Failed')
            }
        }
      }
    }
  }
}

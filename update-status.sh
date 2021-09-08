COMMIT_STATE=$1
GITHUB_TOKEN=$2
GIT_COMMIT=$3
BUILD_URL=$4

curl \
  -i \
  -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.GitHub.com/repos/swseverance/angular-workspace/statuses/$GIT_COMMIT \
  -d "{\"state\":\"$COMMIT_STATE\",\"context\":\"continuous-integration/jenkins\",\"description\":\"Jenkins\",\"target_url\":\"$BUILD_URL\"}"


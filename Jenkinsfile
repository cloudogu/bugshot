#!groovy
pipeline {

  agent {
    docker {
      image 'node:16.14.0'
      label 'docker'
    }
  }

  environment {
    HOME = "${env.WORKSPACE}"
  }

  stages {

    stage('Set Version') {
      when {
        branch pattern: 'release/*', comparator: 'GLOB'
      }
      steps {
        // read version from brach, set it and commit it
        sh "yarn version --no-git-tag-version --new-version ${releaseVersion}"
        sh 'git add package.json'
        commit "release version ${releaseVersion}"

        // fetch all remotes from origin
        sh 'git config "remote.origin.fetch" "+refs/heads/*:refs/remotes/origin/*"'
        sh 'git fetch --all'

        // checkout, reset and merge
        sh 'git checkout main'
        sh 'git reset --hard origin/main'
        sh "git merge --ff-only ${env.BRANCH_NAME}"

        // set tag
        tag releaseVersion
      }
    }

    stage('Install') {
      steps {
        sh 'yarn install'
      }
    }

    stage('Typecheck') {
      steps {
        sh 'yarn run typecheck'
      }
    }

    stage('Lint') {
      steps {
        sh 'yarn run lint'
      }
    }

    stage('Build') {
      steps {
        sh 'rm -rf dist'
        sh 'yarn run build'
        archiveArtifacts artifacts: 'dist/*.zip'
      }
    }

    stage('Deployment') {
      when {
        branch pattern: 'release/*', comparator: 'GLOB'
      }
      steps {
        withOAuthCredentials {
          sh "yarn run store-upload"
          script {
            try {
              sh "yarn run store-publish"
            } catch (err) {
              echo err.getMessage()
              mail to: 'browser-ext@cloudogu.com',
                subject: "Failed to publish uploaded BugShot Package",
                body: "Check console output at ${BUILD_URL} to view the results and publish the package manually https://chrome.google.com/webstore/devconsole/"
              currentBuild.result = 'UNSTABLE'
            }
          }
        }
      }
    }

    stage('Update Repository') {
      when {
        branch pattern: 'release/*', comparator: 'GLOB'
      }
      steps {
        // merge main in to develop
        sh 'git checkout develop'
        sh 'git merge main'

        // push changes back to remote repository
        authGit 'cesmarvin-github', 'push origin main --tags'
        authGit 'cesmarvin-github', 'push origin develop --tags'
        authGit 'cesmarvin-github', "push origin :${env.BRANCH_NAME}"
      }
    }

  }

}

String getReleaseVersion() {
  return env.BRANCH_NAME.substring("release/".length());
}

void commit(String message) {
  sh "git -c user.name='CES Marvin' -c user.email='cesmarvin@cloudogu.com' commit -m '${message}'"
}

void tag(String version) {
  String message = "release version ${version}"
  sh "git -c user.name='CES Marvin' -c user.email='cesmarvin@cloudogu.com' tag -m '${message}' ${version}"
}

void authGit(String credentials, String command) {
  withCredentials([
    usernamePassword(credentialsId: credentials, usernameVariable: 'AUTH_USR', passwordVariable: 'AUTH_PSW')
  ]) {
    sh "git -c credential.helper=\"!f() { echo username='\$AUTH_USR'; echo password='\$AUTH_PSW'; }; f\" ${command}"
  }
}

void withOAuthCredentials(Closure<Void> closure) {
  withCredentials([
    usernamePassword(credentialsId: 'bbugshot-oauth', passwordVariable: 'BUGSHOT_CLIENT_SECRET', usernameVariable: 'BUGSHOT_CLIENT_ID'), 
    usernamePassword(credentialsId: 'bugshot-refresh-token', passwordVariable: 'BUGSHOT_REFRESH_TOKEN', usernameVariable: 'BUGSHOT_ACCOUNT')
  ]) {
    closure.call()
  }
}

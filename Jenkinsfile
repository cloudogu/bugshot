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

  }

}

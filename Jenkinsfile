pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git url: 'YOUR_REPO_URL', branch: 'master'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'ls -la'
                    sh 'docker compose -f docker-compose.yml build'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh 'docker compose -f docker-compose.yml up -d'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        failure {
            echo 'Build or deployment failed.'
        }
    }
}
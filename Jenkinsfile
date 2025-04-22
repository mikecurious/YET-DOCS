pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
        PROJECT_DIR = "${WORKSPACE}"
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Files already in workspace, skipping checkout'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker compose build'  // Note: space instead of hyphen
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh 'docker compose up -d'  // Note: space instead of hyphen
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
pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
        PROJECT_DIR = "${WORKSPACE}"
        // You might need to update this path to match your system
        DOCKER_COMPOSE = "/usr/local/bin/docker-compose"
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
                    sh '${DOCKER_COMPOSE} build'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh '${DOCKER_COMPOSE} up -d'
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
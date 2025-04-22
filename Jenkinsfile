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
                    // List files to debug
                    sh 'ls -la'
                    
                    // Use -f flag to specify the docker-compose file location
                    sh 'docker compose -f ${DOCKER_COMPOSE_FILE} build'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh 'docker compose -f ${DOCKER_COMPOSE_FILE} up -d'
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
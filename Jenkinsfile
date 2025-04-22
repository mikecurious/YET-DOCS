pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/mikecurious/YET-DOCS'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                dir('/home/yet-kenya/yet-docs') {  // ← Add this line to change working directory
                    sh 'docker compose -f docker-compose.yml build'
                }
            }
        }
        
        stage('Deploy') {
            steps {
                // Your deployment steps
            }
        }
    }
}
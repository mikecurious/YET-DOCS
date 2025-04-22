pipeline {
    agent any
    
    environment {
        PROJECT_DIR = '/home/yet-kenya/yet-docs'  // ← Explicit project directory
    }
    
    stages {
        stage('Checkout') {
            steps {
                dir(env.PROJECT_DIR) {  // ← All operations in your project dir
                    git branch: 'master', 
                    url: 'https://github.com/mikecurious/YET-DOCS.git'
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                dir(env.PROJECT_DIR) {
                    script {
                        // Debug: List files to verify location
                        sh 'ls -la'
                        
                        // Build with compose (using absolute path)
                        sh "docker compose -f ${env.PROJECT_DIR}/docker-compose.yml build"
                    }
                }
            }
        }
        
        stage('Deploy') {
            steps {
                dir(env.PROJECT_DIR) {
                    script {
                        sh 'docker compose up -d'  // Full deployment command
                    }
                }
            }
        }
    }
    
    post {
        always {
            echo "Pipeline completed - ${currentBuild.result}"
        }
    }
}
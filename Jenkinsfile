pipeline {
    agent any
    
    triggers {
        githubPush()  // This enables GitHub webhook integration
    }
    
    stages {
        // Stage 1: Jenkins automatically clones into its workspace
        stage('Checkout') {
            steps {
                git(
                    branch: 'main', 
                    url: 'https://github.com/mikecurious/YET-DOCS.git',
                    credentialsId: 'bb4d7a16-5f22-45c6-82aa-15fab7c611bb',  // Your GitHub credentials ID
                    poll: true  // Enable polling for changes
                )
            }
        }
        
        // Stage 2: Build Docker image
        stage('Build') {
            steps {
                sh 'ls -la'  // Verify files exist
                sh 'docker compose build'
            }
        }
        
        // Stage 3: Deploy
        stage('Deploy') {
            steps {
                sh '''
                    # Stop and remove existing container if it exists
                    docker compose down || true
                    
                    # Start with build
                    docker compose up -d --build
                '''
            }
        }
    }
    
    // Optional: Post-build actions
    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed. Check logs for details.'
        }
    }
}
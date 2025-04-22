pipeline {
    agent any
    
    stages {
        // Stage 1: Jenkins automatically clones into its workspace
        stage('Checkout') {
            steps {
                git(
                    branch: 'main',
                    url: 'https://github.com/mikecurious/YET-DOCS.git',
                    credentialsId: 'your-github-credentials',  // Create in Jenkins
                    poll: true  // Enable polling for changes
                )
            }
        }
        
        // Stage 2: Build Docker image (using files in Jenkins workspace)
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
            sudo mkdir -p /home/yet-kenya/yet-docs/
            sudo cp -r * /home/yet-kenya/yet-docs/
            cd /home/yet-kenya/yet-docs
            sudo docker compose up -d --build
        '''
    }
        }
    }
}
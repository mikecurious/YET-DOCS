pipeline {
    agent any

    // Add webhook trigger configuration
    triggers {
        githubPush()
    }

    stages {
        stage('Checkout') {
            steps {
                git(
                    branch: 'main',
                    url: 'https://github.com/mikecurious/YET-DOCS.git',
                    credentialsId: 'bb4d7a16-5f22-45c6-82aa-15fab7c611bb',  // Your existing PAT credential
                    poll: false  // Disable polling since we're using webhooks
                )
            }
        }

        stage('Build') {
            steps {
                sh 'ls -la'
                // Add --no-cache for clean builds when needed
                sh 'docker compose build --no-cache'
            }
        }

        stage('Deploy') {
            steps {
                // Force recreate containers and ignore orphaned containers
                sh 'docker compose up -d --force-recreate --remove-orphans'
                
                // Optional: Clean up old containers/images
                sh '''
                    docker system prune -f || true
                    docker image prune -af || true
                '''
            }
        }
    }

    // Add post-build notifications
    post {
        success {
            slackSend(
                color: 'good',
                message: "SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"
            )
        }
        failure {
            slackSend(
                color: 'danger',
                message: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"
            )
        }
    }
}
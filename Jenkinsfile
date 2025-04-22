// 

pipeline {
    agent any
    
    // Simple custom variables
    environment {
        APP_NAME = "YET-DOCS"
        TEAM_EMAIL = "mikkohbrayoh@gmail.com"
    }
    
    stages {
        stage('Checkout') {
            steps {
                git(
                    branch: 'main',
                    url: 'https://github.com/mikecurious/YET-DOCS.git',
                    credentialsId: 'bb4d7a16-5f22-45c6-82aa-15fab7c611bb',
                    poll: true
                )
            }
        }
        
        stage('Build') {
            steps {
                sh 'ls -la'
                sh 'docker compose build --no-cache'
            }
        }
        
        stage('Deploy') {
            steps {
                sh '''
                    docker compose up -d --force-recreate --remove-orphans
                    docker system prune -f || true
                    docker image prune -af || true
                '''
            }
        }
    }
    
    post {
        always {
            echo "Pipeline completed - ${currentBuild.result}"
        }
        success {
            echo "Build succeeded!"
            emailext (
                subject: "Success: ${env.APP_NAME} Build #${env.BUILD_NUMBER}",
                body: """
                <p>Build succeeded: ${env.APP_NAME}</p>
                <p>Commit by: ${env.CHANGE_AUTHOR ?: 'Unknown'}</p>
                <p>Build URL: <a href='${env.BUILD_URL}'>${env.BUILD_URL}</a></p>
                """,
                to: "${env.TEAM_EMAIL}",
                mimeType: 'text/html'
            )
        }
        failure {
            echo "Build failed!"
            emailext (
                subject: "Failed: ${env.APP_NAME} Build #${env.BUILD_NUMBER}",
                body: """
                <p>Build failed: ${env.APP_NAME}</p>
                <p>Commit by: ${env.CHANGE_AUTHOR ?: 'Unknown'}</p>
                <p>Build URL: <a href='${env.BUILD_URL}'>${env.BUILD_URL}</a></p>
                """,
                to: "${env.TEAM_EMAIL}",
                mimeType: 'text/html'
            )
        }
    }
}
pipeline {
    agent any
    
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
        }
        failure {
            echo "Build failed!"
        }
    }
}
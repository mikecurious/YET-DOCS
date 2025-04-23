pipeline {
    agent any

    environment {
        APP_NAME = "YET-DOCS"
        TEAM_EMAIL = "brian@hudumacitypay.com"
        DOCKER_BUILDKIT = 1
    }

    stages {
        stage('Checkout') {
            steps {
                git credentialsId: 'bb4d7a16-5f22-45c6-82aa-15fab7c611bb', url: 'https://github.com/mikecurious/YET-DOCS.git', branch: 'main'
            }
        }

        stage('Build') {
            steps {
                echo 'Listing files in workspace...'
                sh 'ls -la'

                echo 'Building Docker image...'
                sh 'docker compose build --no-cache'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying Docker containers...'
                sh '''
                    docker compose up -d --force-recreate --remove-orphans
                    docker system prune -f
                    docker image prune -af
                '''
            }
        }
    }

    post {
        success {
            echo "Pipeline completed - SUCCESS"
            echo "Build succeeded!"

            emailext (
                subject: "SUCCESS: ${env.APP_NAME} Build #${env.BUILD_NUMBER}",
                body: """<p>Good news!</p>
                         <p>The job <b>${env.APP_NAME}</b> build <b>#${env.BUILD_NUMBER}</b> succeeded.</p>
                         <p>Check it out: <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>""",
                to: "${env.TEAM_EMAIL}",
                mimeType: 'text/html'
            )
        }

        failure {
            echo "Pipeline failed!"

            emailext (
                subject: "FAILED: ${env.APP_NAME} Build #${env.BUILD_NUMBER}",
                body: """<p>Oops!</p>
                         <p>The job <b>${env.APP_NAME}</b> build <b>#${env.BUILD_NUMBER}</b> failed.</p>
                         <p>Investigate here: <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>""",
                to: "${env.TEAM_EMAIL}",
                mimeType: 'text/html'
            )
        }

        always {
            echo "Pipeline finished executing."
        }
    }
}
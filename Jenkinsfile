pipeline {
    agent any

    environment {
        APP_NAME = "YET-DOCS"
        TEAM_EMAIL = "brian@hudumacitypay.com"
        DOCKER_BUILDKIT = 1
        SONARQUBE = 'yet-sonarcube' 
    }

    tools {
        sonarScanner 'sonar-jenkins' 
    }

    stages {
        stage('Checkout') {
            steps {
                git credentialsId: 'bb4d7a16-5f22-45c6-82aa-15fab7c611bb', url: 'https://github.com/mikecurious/YET-DOCS.git', branch: 'main'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv("${env.SONARQUBE}") {
                    sh 'sonar-scanner'
                }
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
                    docker system prune -f
                    docker image prune -af
                '''
            }
        }
    }

    post {
        success {
            echo "Build succeeded!"
            emailext (
                subject: "SUCCESS: ${env.APP_NAME} Build #${env.BUILD_NUMBER}",
                body: """<p>Build succeeded: <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>""",
                to: "${env.TEAM_EMAIL}",
                mimeType: 'text/html'
            )
        }
        failure {
            echo "Build failed!"
            emailext (
                subject: "FAILED: ${env.APP_NAME} Build #${env.BUILD_NUMBER}",
                body: """<p>Build failed: <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>""",
                to: "${env.TEAM_EMAIL}",
                mimeType: 'text/html'
            )
        }
        always {
            echo "Pipeline finished executing."
        }
    }
}
  
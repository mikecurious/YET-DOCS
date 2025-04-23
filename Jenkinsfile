pipeline {
    agent any
    
    environment {
        APP_NAME = "YET-DOCS"
        TEAM_EMAIL = "brian@hudumacitypay.com"
        SONAR_SCANNER_HOME = tool 'SonarQubeScanner'
        SONAR_HOST_URL = 'https://sonar:9000'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git(
                    branch: 'main',
                    url: 'https://github.com/mikecurious/YET-DOCS.git',
                    credentialsId: 'bb4d7a16-5f22-45c6-82aa-15fab7c611bb',
                    poll: true
                )
            }
        }
        
        stage('SonarQube Analysis') {
            steps {
                withCredentials([string(credentialsId: 'sonarqube', variable: 'SONAR_TOKEN')]) {
                    echo '🔍 Running SonarQube Analysis...'
                    withSonarQubeEnv('SonarQube') {
                        sh """
                            ${SONAR_SCANNER_HOME}/bin/sonar-scanner \\
                            -Dsonar.projectKey=${APP_NAME} \\
                            -Dsonar.projectName=${APP_NAME} \\
                            -Dsonar.sources=. \\
                            -Dsonar.host.url=${SONAR_HOST_URL} \\
                            -Dsonar.login=${SONAR_TOKEN}
                        """
                    }
                    echo "Access report at: https://sonar.yet-kenya.com/dashboard?id=${APP_NAME}"
                }
            }
        }
        
        stage('Unit Tests') {
            steps {
                echo '🧪 Running unit tests...'
                sh 'echo "Tests would run here"'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo '🔨 Building Docker image...'
                sh 'docker compose build --no-cache'
            }
        }
        
        stage('Push to Docker Registry') {
            steps {
                echo '📦 Pushing to Docker registry...'
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
            echo '📦 Pipeline finished.'
        }
        success {
            echo '✅ Build succeeded!'
            retry(2) {
                timeout(time: 30, unit: 'SECONDS') {
                    emailext (
                        subject: "✅ SUCCESS: ${env.APP_NAME} - Build #${env.BUILD_NUMBER}",
                        body: """
                        <p>Build succeeded: ${env.APP_NAME}</p>
                        <p>Branch: ${env.GIT_BRANCH ?: 'Unknown'}</p>
                        <p>Build URL: <a href='${env.BUILD_URL}'>${env.BUILD_URL}</a></p>
                        """,
                        to: "${env.TEAM_EMAIL}",
                        mimeType: 'text/html'
                    )
                }
            }
        }
        failure {
            echo '❌ Build failed.'
            retry(2) {
                timeout(time: 30, unit: 'SECONDS') {
                    emailext (
                        subject: "❌ FAILED: ${env.APP_NAME} - Build #${env.BUILD_NUMBER}",
                        body: """
                        <p>Build failed: ${env.APP_NAME}</p>
                        <p>Branch: ${env.GIT_BRANCH ?: 'Unknown'}</p>
                        <p>Build URL: <a href='${env.BUILD_URL}'>${env.BUILD_URL}</a></p>
                        """,
                        to: "${env.TEAM_EMAIL}",
                        mimeType: 'text/html'
                    )
                }
            }
        }
    }
}
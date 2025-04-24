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
                script {
                    // Extract commit information after checkout
                    env.GIT_COMMIT_MSG = sh(script: 'git log -1 --pretty=%B', returnStdout: true).trim()
                    env.GIT_AUTHOR = sh(script: 'git log -1 --pretty=%an', returnStdout: true).trim()
                    env.GIT_AUTHOR_EMAIL = sh(script: 'git log -1 --pretty=%ae', returnStdout: true).trim()
                    env.GIT_COMMIT_SHA = sh(script: 'git rev-parse HEAD', returnStdout: true).trim()
                }
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
                
                // Basic HTML validation checks
                sh '''
                    echo "Checking for valid HTML files..."
                    # Check if any HTML files exist first
                    if [ $(find . -name "*.html" | wc -l) -gt 0 ]; then
                        # Check for doctype declarations
                        for file in $(find . -name "*.html"); do
                            if ! grep -qi "<!DOCTYPE" $file; then
                                echo "❌ Missing DOCTYPE in $file"
                                exit 1
                            fi
                        done
                        echo "✅ All HTML files have DOCTYPE declarations"
                        
                        # Check for broken internal links
                        for file in $(find . -name "*.html"); do
                            echo "Checking links in $file"
                            grep -o 'href="[^"]*"' $file | grep -v "http" | cut -d'"' -f2 | while read link; do
                                if [[ $link != "#"* && $link != "" && ! -f "${link#/}" && ! -f "$(dirname $file)/$link" ]]; then
                                    echo "❌ Broken link in $file: $link"
                                    exit 1
                                fi
                            done
                        done
                        echo "✅ All internal links valid"
                        
                        # Check image tags have alt attributes
                        for file in $(find . -name "*.html"); do
                            if grep -q '<img' $file; then
                                if grep '<img' $file | grep -v "alt="; then
                                    echo "❌ Images without alt attributes found in $file"
                                    exit 1
                                fi
                            fi
                        done
                        echo "✅ All images have alt attributes"
                    else
                        echo "No HTML files found to test"
                    fi
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                echo '🔨 Building Docker image...'
                sh 'docker compose build --no-cache'
            }
        }

        stage('Push to GitHub Registry') {
            steps {
                echo '📦 Pushing to GitHub Container Registry...'
                withCredentials([usernamePassword(
                    credentialsId: 'github-cr',
                    usernameVariable: 'GH_USER',
                    passwordVariable: 'GH_TOKEN'
                )]) {
                    sh """
                        echo "Logging into GHCR..."
                        echo "${GH_TOKEN}" | docker login ghcr.io -u "${GH_USER}" --password-stdin
                        docker compose push
                    """
                }
            }
        }

        stage('Deploy') {
            steps {
                echo '🚀 Deploying Docker containers...'
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
                        <p>Commit by: ${env.GIT_AUTHOR ?: 'Unknown'} (${env.GIT_AUTHOR_EMAIL ?: ''})</p>
                        <p>Commit message: ${env.GIT_COMMIT_MSG ?: 'Unknown'}</p>
                        <p>Commit SHA: ${env.GIT_COMMIT_SHA ?: 'Unknown'}</p>
                        <p>Build URL: <a href='${env.BUILD_URL}'>${env.BUILD_URL}</a></p>
                        <p>SonarQube Report: <a href="https://sonar.yet-kenya.com/dashboard?id=${env.APP_NAME}">View Analysis</a></p>
                        <p>Image Location: <code>ghcr.io/mikecurious/yet-docs:latest</code></p>
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
                        <p>Commit by: ${env.GIT_AUTHOR ?: 'Unknown'} (${env.GIT_AUTHOR_EMAIL ?: ''})</p>
                        <p>Commit message: ${env.GIT_COMMIT_MSG ?: 'Unknown'}</p>
                        <p>Commit SHA: ${env.GIT_COMMIT_SHA ?: 'Unknown'}</p>
                        <p>Build URL: <a href='${env.BUILD_URL}'>${env.BUILD_URL}</a></p>
                        <p>SonarQube Report: <a href="https://sonar.yet-kenya.com/dashboard?id=${env.APP_NAME}">View Analysis</a></p>
                        """,
                        to: "${env.TEAM_EMAIL}",
                        mimeType: 'text/html'
                    )
                }
            }
        }
    }
}
node {

    stage("Git Clone") {
        git branch: 'main', url: 'https://github.com/twinklee176/task-manager-app.git'
    }

    stage("ECR Login") {
        sh '''
        aws ecr get-login-password --region ap-south-1 | \
        docker login --username AWS --password-stdin \
        796093524638.dkr.ecr.ap-south-1.amazonaws.com
        '''
    }

    stage("Build Docker Image") {
        sh 'docker build -t task-manager .'
        sh 'docker tag task-manager:latest 796093524638.dkr.ecr.ap-south-1.amazonaws.com/twinkle-cicd:${BUILD_NUMBER}'
    }

    stage("Push Image") {
        sh 'docker push 796093524638.dkr.ecr.ap-south-1.amazonaws.com/twinkle-cicd:${BUILD_NUMBER}'
    }

    stage("Trigger Manifest Job") {
        build job: 'update-manifest',
        parameters: [
            string(name: 'DOCKERTAG', value: env.BUILD_NUMBER)
        ]
    }
}

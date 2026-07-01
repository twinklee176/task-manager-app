#  Task Manager Application

A simple **Task Manager** web application built with **Node.js** and **Express.js**, containerized using **Docker**, and deployed to **Amazon EKS** through a complete **GitOps CI/CD pipeline** using **Jenkins**, **Amazon ECR**, and **Argo CD**.

---

## Overview

This project demonstrates an end-to-end GitOps workflow where application source code is stored in one GitHub repository, Kubernetes manifests are maintained in a separate repository, and Argo CD automatically deploys updates to an Amazon EKS cluster whenever Jenkins updates the container image.

---

## Tech Stack

- Node.js
- Express.js
- Docker
- Jenkins
- Amazon ECR
- Amazon EKS
- Kubernetes
- Argo CD
- AWS Load Balancer Controller
- Git & GitHub

---

## Repository Structure

```text
task-manager-app/
│
├── public/
│   └── styles.css
│
├── Dockerfile
├── package.json
├── server.js
├── .gitignore
└── README.md
```

---

##  Features

- Add Tasks
- Delete Tasks
- Responsive User Interface
- Dockerized Application
- CI/CD with Jenkins
- Container Image Stored in Amazon ECR
- GitOps Deployment using Argo CD
- Deployed on Amazon EKS

---

##  Run the Application Locally

### Install Dependencies

```bash
npm install
```

### Start the Application

```bash
npm start
```

Open your browser and visit:

```
http://localhost
```

---

##  Docker

### Build Docker Image

```bash
docker build -t task-manager .
```

### Run Docker Container

```bash
docker run -d -p 80:80 task-manager
```

Verify the running container:

```bash
docker ps
```

---

##  Push Image to Amazon ECR

Authenticate Docker:

```bash
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 796093524638.dkr.ecr.ap-south-1.amazonaws.com
```

Tag the image:

```bash
docker tag task-manager:latest 796093524638.dkr.ecr.ap-south-1.amazonaws.com/twinkle-cicd:1
```

Push the image:

```bash
docker push 796093524638.dkr.ecr.ap-south-1.amazonaws.com/twinkle-cicd:1
```

---
## Commands Used

### Install Docker (Amazon Linux)
```bash
sudo dnf install -y docker
systemctl start docker
docker ps
```

### Install AWS CLI
```bash
sudo dnf install -y unzip
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
aws --version
```

### Git
```bash
yum install git -y
```

### Jenkins Setup
```bash
sudo yum update -y
sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/rpm-stable/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/rpm-stable/jenkins.io-2026.key
sudo yum upgrade
sudo yum install java-21-amazon-corretto -y
sudo yum install jenkins -y
sudo systemctl enable jenkins
sudo systemctl start jenkins
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
sudo usermod -aG docker jenkins
sudo systemctl restart docker
sudo systemctl restart jenkins
```

##  CI/CD Workflow

```text
Developer
      │
      ▼
GitHub (task-manager-app)
      │
      ▼
Jenkins Pipeline
      │
      ├── Clone Repository
      ├── Build Docker Image
      ├── Push Image to Amazon ECR
      └── Trigger Manifest Update
                      │
                      ▼
GitHub (task-manager-manifests)
                      │
                      ▼
Argo CD
                      │
                      ▼
Amazon EKS Cluster
```

---

### Deployment Repository

A separate GitHub repository named:

```text
task-manager-manifests
```

Contains:

- deployment.yaml
- service.yaml
- ingress.yaml

Argo CD continuously monitors this repository for deployment changes.

---



# 🏗️ System Architecture

## Introduction

Before discussing the DevOps implementation, it is important to understand the overall architecture of the project.

TicketHub is designed as a cloud-native application where each component has a specific responsibility. Instead of deploying the application on a single virtual machine, it is deployed on Azure Kubernetes Service (AKS) using Docker containers.

The complete deployment process is automated using GitHub Actions and Argo CD, while Prometheus, Grafana, Azure Monitor, and Log Analytics provide monitoring and observability.

---

# High-Level Components

The project consists of the following major components:

* React Frontend
* Node.js & Express Backend
* MongoDB Atlas
* GitHub Repository
* GitHub Actions
* Azure Container Registry (ACR)
* Azure Kubernetes Service (AKS)
* Helm
* Argo CD
* Prometheus
* Grafana
* Azure Monitor
* Azure Log Analytics

Each component is responsible for a specific part of the application lifecycle.

---

# Application Flow

The application follows a simple request-response architecture.

```
User
   │
   ▼
Frontend (React)
   │
   ▼
Backend API (Node.js + Express)
   │
   ▼
MongoDB Atlas
```

### Flow Explanation

1. A user accesses the TicketHub application through the browser.
2. The React frontend sends API requests to the backend.
3. The backend processes the request.
4. If required, the backend retrieves or stores data in MongoDB Atlas.
5. The backend returns the response to the frontend.
6. The frontend displays the result to the user.

---

# Deployment Flow

The deployment process is completely automated.

```
Developer

        │

        ▼

GitHub Repository

        │

        ▼

GitHub Actions

        │

        ▼

Docker Image Build

        │

        ▼

Azure Container Registry

        │

        ▼

Helm Chart Update

        │

        ▼

Argo CD

        │

        ▼

Azure Kubernetes Service

        │

        ▼

Running Application
```

Whenever new code is pushed to GitHub, this deployment pipeline is executed automatically.

---

# Kubernetes Architecture

Inside the AKS cluster, the following resources are deployed.

```
Namespace
│
├── Frontend Deployment
│      │
│      └── Frontend Service
│
├── Backend Deployment
│      │
│      └── Backend Service
│
├── Ingress
├── ConfigMap
├── Secret
└── ServiceMonitor
```

Each Kubernetes resource has a dedicated responsibility.

---

# Monitoring Architecture

Monitoring is divided into two parts.

### Application Monitoring

```
Backend API

      │

      ▼

/metrics Endpoint

      │

      ▼

Prometheus

      │

      ▼

Grafana
```

Prometheus collects application metrics from the backend, while Grafana visualizes those metrics.

---

### Infrastructure Monitoring

```
AKS Cluster

      │

      ▼

Azure Monitor Agent

      │

      ▼

Azure Monitor

      │

      ▼

Log Analytics Workspace
```

Azure Monitor collects infrastructure metrics and sends logs to Log Analytics for analysis.

---

# Why This Architecture?

I selected this architecture to understand how a real-world application is deployed using modern DevOps practices.

Instead of focusing only on application development, I wanted to implement the complete software delivery lifecycle, including:

* Containerization
* Continuous Integration
* Continuous Deployment
* GitOps
* Kubernetes
* Monitoring
* Cloud Infrastructure

This architecture helped me gain hands-on experience with every stage of a production deployment.

---

# Interview Tips

## Question

**Can you explain the architecture of your project?**

### Sample Answer

> "The project follows a cloud-native architecture. The frontend is developed using React, while the backend is built with Node.js and Express. MongoDB Atlas is used as the managed database. The application is containerized using Docker and deployed to Azure Kubernetes Service. GitHub Actions builds and publishes Docker images to Azure Container Registry. Helm manages the Kubernetes manifests, and Argo CD automatically synchronizes the cluster using GitOps. For monitoring, I implemented Prometheus and Grafana for application metrics, while Azure Monitor and Log Analytics are used for infrastructure monitoring."

---

# Key Takeaways

* The application follows a layered architecture.
* Kubernetes manages the application deployment.
* GitHub Actions automates the build process.
* Argo CD automates deployments using GitOps.
* Prometheus and Grafana monitor the application.
* Azure Monitor provides infrastructure monitoring.
* Every component has a clearly defined responsibility.

---

# Next Document

The next document, **03-DevOps-Implementation.md**, explains the complete DevOps journey of this project, including every major decision, implementation step, commands used, challenges faced, and lessons learned.

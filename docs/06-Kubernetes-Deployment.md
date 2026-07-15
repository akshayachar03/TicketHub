# ☸️ Kubernetes Deployment

## Introduction

After containerizing the application and pushing the Docker images to Azure Container Registry (ACR), the next step was deploying the application to Azure Kubernetes Service (AKS).

Instead of running containers manually, I used Kubernetes to manage the complete application lifecycle.

Kubernetes became responsible for:

* Running the application
* Managing Pods
* Networking
* Service discovery
* External access
* Configuration management
* Monitoring integration

By using Kubernetes, the deployment became more reliable, scalable, and easier to manage.

---

# Deployment Overview

The TicketHub application consists of two main components.

* Frontend (React)
* Backend (Node.js & Express)

Both components are deployed independently.

The backend communicates with MongoDB Atlas, while the frontend communicates with the backend through Kubernetes Services.

---

# Kubernetes Resources Used

The deployment uses the following Kubernetes resources.

| Resource       | Purpose                                       |
| -------------- | --------------------------------------------- |
| Namespace      | Isolates all TicketHub resources              |
| Deployment     | Manages frontend and backend Pods             |
| Service        | Provides stable networking between components |
| Ingress        | Exposes the application externally            |
| ConfigMap      | Stores application configuration              |
| Secret         | Stores sensitive configuration                |
| ServiceMonitor | Enables Prometheus metrics collection         |

Each resource has a specific responsibility in the deployment.

---

# Namespace

I created a dedicated namespace for the application.

Using a namespace keeps all project resources together and separates them from system resources running in the cluster.

Benefits include:

* Better organization
* Easier management
* Resource isolation
* Simplified troubleshooting

---

# Deployments

Separate Deployments were created for the frontend and backend.

The Deployment resource manages the application Pods.

Its responsibilities include:

* Creating Pods
* Restarting failed Pods
* Managing replica count
* Performing rolling updates

Instead of managing Pods manually, Kubernetes automatically maintains the desired number of running Pods.

---

# Services

Each application component has its own Kubernetes Service.

The Services provide stable networking between resources.

For example:

* Frontend Service exposes the frontend Pods.
* Backend Service exposes the backend Pods.

Even if Pods are recreated and their IP addresses change, the Service continues to provide a stable endpoint.

---

# Ingress

To allow users to access the application, I configured an NGINX Ingress.

The Ingress receives external requests and routes them to the appropriate Kubernetes Service.

Instead of exposing every Service directly, the Ingress acts as the single entry point into the cluster.

This simplifies traffic management and provides a cleaner architecture.

---

# ConfigMap

The application requires configuration values that are not sensitive.

These values are stored inside a ConfigMap.

Examples include:

* Application configuration
* Service URLs
* Environment-specific settings

Keeping configuration outside the container image makes the application easier to maintain.

---

# Secret

Sensitive information is stored using Kubernetes Secrets.

Examples include:

* Database connection string
* JWT secret
* Other sensitive configuration values

This prevents sensitive data from being hardcoded into the application.

---

# ServiceMonitor

To integrate Prometheus with the backend application, I created a ServiceMonitor.

The ServiceMonitor tells Prometheus:

* Which Service to monitor
* Which endpoint to scrape
* Which namespace to monitor

This enabled automatic metrics collection from the backend `/metrics` endpoint.

---

# Deployment Workflow

The deployment process followed in this project is:

```text
Developer

      │

      ▼

GitHub Actions

      │

      ▼

Azure Container Registry

      │

      ▼

Helm

      │

      ▼

Argo CD

      │

      ▼

Azure Kubernetes Service

      │

      ▼

Deployments

      │

      ▼

Pods

      │

      ▼

Services

      │

      ▼

Ingress

      │

      ▼

Users
```

---

# How I Verified the Deployment

After deployment, I verified the following.

## Cluster

* AKS cluster was running.
* Nodes were in the Ready state.

## Application

* Frontend Pods were running.
* Backend Pods were running.
* Services were created successfully.
* Ingress was accessible.
* Application loaded successfully.

## Networking

* Frontend communicated with the backend.
* Backend connected to MongoDB Atlas.

## Monitoring

* ServiceMonitor detected the backend.
* Prometheus targets were healthy.
* Grafana dashboards displayed metrics.

---

# Challenges Faced

Deploying the application involved several practical challenges.

Some of the issues I encountered included:

* Understanding how Deployments, Services, and Ingress work together.
* Configuring the NGINX Ingress correctly.
* Troubleshooting ServiceMonitor discovery.
* Managing Kubernetes resource configuration through Helm.

Each issue improved my understanding of Kubernetes and helped me become more comfortable troubleshooting production-style deployments.

A detailed explanation of these issues is available in the **Troubleshooting Guide**.

---

# What I Learned

Deploying the application to Kubernetes helped me understand that Kubernetes is much more than a container runtime.

It provides a complete platform for managing containerized applications.

Some important lessons include:

* Deployments manage Pods.
* Services provide stable networking.
* Ingress manages external traffic.
* ConfigMaps separate configuration from application code.
* Secrets protect sensitive information.
* ServiceMonitor integrates Kubernetes with Prometheus.

Understanding how these resources work together was one of the biggest learning outcomes of the project.

---

# Best Practices

While implementing the deployment, I followed these practices.

* Separate frontend and backend Deployments.
* Use dedicated Services for each application.
* Store configuration in ConfigMaps.
* Store sensitive values in Secrets.
* Use Helm templates instead of plain YAML.
* Use a dedicated namespace.
* Verify every deployment before moving to the next stage.

---

# Summary

Azure Kubernetes Service became the platform that hosts the complete TicketHub application.

By combining Deployments, Services, Ingress, ConfigMaps, Secrets, and ServiceMonitor, I created a structured and production-style Kubernetes deployment.

This deployment formed the foundation for GitOps, monitoring, and automated application delivery throughout the project.

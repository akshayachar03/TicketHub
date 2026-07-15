# ☸️ Azure Kubernetes Service (AKS)

## Introduction

After containerizing the application and storing the Docker images in Azure Container Registry (ACR), the next step was to deploy the application.

Running Docker containers manually works for development and testing, but it is not suitable for production environments. A production application requires features such as automatic restarts, scaling, rolling updates, service discovery, and load balancing.

To provide these capabilities, I deployed the application to **Azure Kubernetes Service (AKS)**.

---

# Why Did I Use Kubernetes?

My goal was to learn how modern applications are deployed and managed in production.

Kubernetes provides features such as:

* Container orchestration
* Automatic scheduling
* Self-healing
* Service discovery
* Rolling updates
* Horizontal scaling
* High availability

Instead of managing containers manually, Kubernetes continuously ensures that the desired application state is maintained.

---

# Why Azure Kubernetes Service (AKS)?

Since the entire project was hosted on Microsoft Azure, I selected Azure Kubernetes Service.

The main reasons were:

* Fully managed Kubernetes service
* Easy integration with Azure Container Registry
* Native integration with Azure Monitor
* Simplified cluster management
* No need to manage the Kubernetes control plane

This allowed me to focus on deploying and managing the application rather than maintaining the Kubernetes infrastructure.

---

# Why Not Install Kubernetes Manually?

I could have installed Kubernetes using kubeadm or another installation method.

However, that would require managing:

* Control plane components
* etcd
* Cluster upgrades
* Certificates
* High availability
* Backup and recovery

Since my objective was to learn application deployment rather than cluster administration, AKS was the better choice.

---

# My Implementation

The implementation followed these steps:

1. Created a Resource Group.
2. Created an Azure Kubernetes Service (AKS) cluster.
3. Connected my local machine to the cluster.
4. Verified the cluster was running.
5. Deployed the frontend and backend applications.
6. Exposed the applications using Kubernetes Services.
7. Configured Ingress for external access.
8. Verified that the application was accessible.

---

# AKS Deployment Workflow

```text id="qq7nra"
Azure Container Registry

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

# Kubernetes Resources Used

During this project, I worked with several Kubernetes resources.

| Resource       | Purpose                                  |
| -------------- | ---------------------------------------- |
| Namespace      | Isolates project resources               |
| Deployment     | Manages application Pods                 |
| Pod            | Runs the frontend and backend containers |
| Service        | Exposes Pods within the cluster          |
| Ingress        | Routes external traffic                  |
| ConfigMap      | Stores application configuration         |
| Secret         | Stores sensitive configuration           |
| ServiceMonitor | Enables Prometheus metrics collection    |

Understanding how these resources work together was one of the biggest learning outcomes of this project.

---

# Commands Used

## View Cluster Information

```bash
kubectl cluster-info
```

Used to verify that the Kubernetes cluster was accessible.

---

## View Nodes

```bash
kubectl get nodes
```

Displays all worker nodes in the AKS cluster.

---

## View Namespaces

```bash
kubectl get namespaces
```

Shows all namespaces in the cluster.

---

## View Pods

```bash
kubectl get pods -A
```

Lists all Pods across every namespace.

---

## View Deployments

```bash
kubectl get deployments -A
```

Displays all Deployments.

---

## View Services

```bash
kubectl get svc -A
```

Lists all Kubernetes Services.

---

## Describe a Pod

```bash
kubectl describe pod <pod-name>
```

Useful when investigating deployment issues.

---

## View Pod Logs

```bash
kubectl logs <pod-name>
```

Used for troubleshooting application startup issues.

---

# How I Verified the Deployment

After deploying the application, I verified:

* AKS cluster was running.
* Nodes were in the Ready state.
* Pods were running successfully.
* Services were created.
* Ingress was routing traffic correctly.
* Backend APIs responded successfully.
* Frontend application loaded correctly.

Only after completing these checks did I proceed to Helm and CI/CD automation.

---

# Challenges Faced

While learning Kubernetes, I initially found it difficult to understand the relationship between different Kubernetes resources.

For example:

* Deployment creates Pods.
* Pods are exposed using Services.
* Ingress routes external traffic to Services.
* ConfigMaps and Secrets provide configuration to Pods.

Once I understood how these components interact, troubleshooting became much easier.

Later in the project, I also encountered practical issues such as:

* Ingress configuration conflicts
* Prometheus ServiceMonitor discovery
* Metrics endpoint troubleshooting

These issues are explained in detail in the **Troubleshooting Guide**.

---

# What I Learned

This stage helped me understand several important Kubernetes concepts.

* Kubernetes manages the desired state of an application.
* Pods are temporary and managed by Deployments.
* Services provide stable networking for Pods.
* Ingress provides external access to applications.
* Namespaces help organize resources.
* Kubernetes continuously monitors and maintains application availability.

Deploying the application to AKS was the point where the project transitioned from local development to a production-style cloud deployment.

---

# Interview Questions

### Why did you use AKS?

I used Azure Kubernetes Service because it is a managed Kubernetes platform that integrates well with Azure services such as Azure Container Registry and Azure Monitor. It allowed me to focus on deploying the application instead of managing the Kubernetes control plane.

---

### Why Kubernetes instead of Docker alone?

Docker is responsible for creating and running containers, but it does not manage container orchestration. Kubernetes provides scheduling, self-healing, service discovery, scaling, and rolling updates, making it suitable for production deployments.

---

### Why are Deployments used instead of creating Pods directly?

Pods are temporary and can be deleted or fail. Deployments ensure that the desired number of Pods is always running and automatically recreate Pods if they fail.

---

### Why are Services required?

Pods receive dynamic IP addresses. A Service provides a stable endpoint that allows other components to communicate with the application reliably.

---

# Cross Questions

### Why didn't you use Azure App Service instead of AKS?

Azure App Service is an excellent Platform as a Service (PaaS) offering for web applications. However, my objective was to gain hands-on experience with Kubernetes, container orchestration, and cloud-native deployment practices. AKS provided much greater exposure to production-style DevOps concepts.

---

### Could this project run on another Kubernetes platform?

Yes.

Since Kubernetes is cloud-agnostic, the same manifests and Helm charts could be deployed to Amazon EKS, Google GKE, or even an on-premises Kubernetes cluster with only minor environment-specific changes.

---

### What happens if a Pod crashes?

The Deployment continuously monitors the desired number of replicas. If a Pod crashes or is deleted, Kubernetes automatically creates a replacement Pod to maintain the desired state.

---

# Summary

Azure Kubernetes Service became the platform that runs the entire TicketHub application.

Instead of manually managing Docker containers, Kubernetes automatically handled deployment, scheduling, networking, and application availability, providing a production-ready environment for the application.

The next step was to simplify Kubernetes deployments by introducing **Helm**, which allowed me to manage multiple Kubernetes resources as reusable templates.

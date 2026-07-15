# 🚀 Step-by-Step Deployment Guide

## Introduction

This document explains how to deploy the TicketHub project from scratch.

The deployment follows the same sequence that I used while building the project. Every major component is installed and verified before moving to the next stage.

By the end of this guide, you will have:

* Azure infrastructure
* Kubernetes cluster
* GitHub Actions pipeline
* GitOps deployment using Argo CD
* Prometheus and Grafana monitoring
* Azure Monitor integration

---

# Deployment Prerequisites

Before starting, ensure the following tools are installed.

| Tool               | Purpose                     |
| ------------------ | --------------------------- |
| Git                | Clone the repository        |
| Docker             | Build container images      |
| Azure CLI          | Manage Azure resources      |
| kubectl            | Manage Kubernetes           |
| Helm               | Deploy Kubernetes resources |
| GitHub Account     | Source code repository      |
| Azure Subscription | Cloud infrastructure        |

---

# Step 1 — Clone the Repository

Clone the project repository.

```bash
git clone <repository-url>

cd TicketHub
```

Verify that all project files are available.

---

# Step 2 — Login to Azure

Authenticate with Azure.

```bash
az login
```

Verify the active subscription.

```bash
az account show
```

---

# Step 3 — Create Azure Resources

Create the required Azure infrastructure.

Resources include:

* Resource Group
* Azure Kubernetes Service
* Azure Container Registry
* Log Analytics Workspace

Verify that all resources are created successfully.

---

# Step 4 — Connect to AKS

Download the Kubernetes credentials.

```bash
az aks get-credentials \
  --resource-group <resource-group> \
  --name <aks-cluster>
```

Verify cluster connectivity.

```bash
kubectl get nodes
```

All nodes should be in the **Ready** state.

---

# Step 5 — Verify Azure Container Registry

Ensure that Azure Container Registry is available.

```bash
az acr list --output table
```

Verify that Docker images can be pushed successfully.

---

# Step 6 — Deploy the Application

Deploy the Helm chart.

```bash
helm install tickethub ./helm/tickethub
```

Verify that:

* Namespace exists
* Deployments are created
* Pods are running
* Services are created

Useful commands:

```bash
kubectl get pods -A

kubectl get deployments -A

kubectl get svc -A
```

---

# Step 7 — Install Argo CD

Deploy Argo CD into the Kubernetes cluster.

Configure:

* Git repository
* Helm chart
* Automatic synchronization

Verify that:

* Application status is **Healthy**
* Application status is **Synced**

---

# Step 8 — Configure GitHub Actions

Configure the required GitHub Secrets.

Examples include:

* Azure Credentials
* Azure Subscription ID
* Azure Tenant ID
* Azure Client ID
* Azure Container Registry credentials

Push a small code change and verify that the workflow executes successfully.

---

# Step 9 — Verify CI Pipeline

After the workflow completes, verify:

* Docker images built successfully.
* Images pushed to Azure Container Registry.
* Helm image tag updated.
* Repository updated automatically.

---

# Step 10 — Verify GitOps Deployment

Confirm that Argo CD detects the updated repository.

Verify:

* Automatic synchronization.
* New Pods created.
* Updated application running successfully.

---

# Step 11 — Install Prometheus and Grafana

Install the monitoring stack.

Verify:

* Prometheus is running.
* Grafana is running.
* Prometheus targets are healthy.

Confirm that the backend exposes the `/metrics` endpoint.

---

# Step 12 — Configure Azure Monitor

Enable Azure Monitor for the AKS cluster.

Connect it to the Log Analytics Workspace.

Verify:

* Azure Monitor Agent running.
* Monitoring add-on enabled.
* Infrastructure telemetry collected.

---

# Step 13 — Verify Log Analytics

Open the Log Analytics Workspace.

Run a simple heartbeat query.

Verify that:

* Heartbeat records exist.
* AKS cluster is reporting successfully.
* Monitoring data is continuously updated.

---

# Step 14 — Final Verification

Before considering the deployment complete, verify the following.

## Application

* Frontend accessible.
* Backend APIs working.
* Database connection successful.

---

## Kubernetes

* Nodes Ready.
* Pods Running.
* Services Available.
* Ingress Working.

---

## CI/CD

* GitHub Actions successful.
* Images published to ACR.
* Argo CD synchronized.

---

## Monitoring

* Prometheus collecting metrics.
* Grafana dashboards displaying data.
* Azure Monitor enabled.
* Log Analytics receiving telemetry.

---

# Deployment Checklist

Use the following checklist after every deployment.

* Azure login completed
* Azure resources available
* AKS connected
* Docker images available
* Helm deployment successful
* Argo CD synchronized
* Application accessible
* Prometheus healthy
* Grafana dashboards working
* Azure Monitor enabled
* Log Analytics receiving data

---

# Summary

Following this guide deploys the complete TicketHub project on Microsoft Azure.

The deployment includes:

* Azure infrastructure
* Kubernetes
* GitHub Actions
* GitOps using Argo CD
* Prometheus
* Grafana
* Azure Monitor
* Azure Log Analytics

By following these steps in sequence, the application can be deployed consistently and verified at every stage.

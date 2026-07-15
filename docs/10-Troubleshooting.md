# 🛠️ TicketHub DevOps Troubleshooting Guide

---

# Troubleshooting Philosophy

One of the biggest lessons I learned during this project is that troubleshooting should always be systematic.

Whenever I encountered an issue, I avoided changing multiple configurations at the same time. Instead, I isolated each layer of the application and verified it before moving to the next.

## Debugging Flow

```text
Browser
↓
Frontend
↓
Backend API
↓
Docker
↓
Azure Container Registry
↓
Azure Kubernetes Service
↓
Helm
↓
GitHub Actions
↓
Argo CD
↓
Prometheus
↓
Grafana
↓
Azure Monitor
↓
Log Analytics
```

For every issue I followed the same approach:

1. Understand the error.
2. Reproduce the issue.
3. Verify the current configuration.
4. Identify the root cause.
5. Apply the smallest possible fix.
6. Verify the solution.
7. Continue to the next layer.

---

# Docker & Local Environment

## Issue 1 – `/metrics` Endpoint Returned 404

### What was the issue?

After integrating Prometheus, accessing `http://localhost:5000/metrics` returned **Route not found** instead of Prometheus metrics.

### What was the root cause?

Another Node.js process was already running on port **5000**. My requests were reaching the old process instead of the updated backend.

### What was the solution?

I temporarily started the backend on port **5001**, verified the endpoint, stopped the old process, and restarted the updated backend on port **5000**.

### What did I do?

- Verified `prom-client` was installed.
- Checked that the `/metrics` route existed.
- Started the backend on port **5001**.
- Verified `/metrics` using `curl`.
- Stopped the old Node.js process.
- Restarted the backend.
- Confirmed Prometheus metrics were displayed.

### Commands Used

```bash
curl http://localhost:5001/metrics
```

### Lesson Learned

Always verify that requests are reaching the correct application process before modifying code.

---

## Issue 2 – Port 5000 Already in Use

### What was the issue?

While running:

```bash
kubectl port-forward svc/tickethub-backend-service 5000:5000
```

I received:

```text
Unable to listen on port 5000
address already in use
```

### What was the root cause?

The backend application was already running locally on port **5000**.

### What was the solution?

I stopped trying to use port forwarding and continued using the already running backend.

### What did I do?

- Read the error carefully.
- Verified the backend was already running.
- Confirmed the application was accessible.
- Cancelled the unnecessary port-forward command.

### Commands Used

```bash
kubectl port-forward svc/tickethub-backend-service 5000:5000
```

### Lesson Learned

Always verify whether a port is already occupied before using `kubectl port-forward`.

---

# Azure Container Registry (ACR)

## Verification 1 – Docker Images Built Successfully

### What was the issue?

Before deployment, I needed to verify that both frontend and backend Docker images had been built successfully.

### What was the root cause?

There was no issue. This was a validation step to prevent deployment failures later.

### What was the solution?

I verified that both Docker images existed locally before pushing them to Azure Container Registry.

### What did I do?

- Listed all Docker images.
- Verified frontend and backend images.
- Confirmed image tags.

### Commands Used

```bash
docker images
```

### Lesson Learned

Always verify Docker images before pushing them to a registry.

---

## Verification 2 – Images Successfully Pushed to Azure Container Registry

### What was the issue?

Before Kubernetes deployment, I needed to ensure that the latest images were available in Azure Container Registry.

### What was the root cause?

There was no issue. This was a validation step to ensure Kubernetes could pull the required images.

### What was the solution?

I verified the repositories and image tags inside Azure Container Registry.

### What did I do?

- Logged into Azure Container Registry.
- Verified repositories.
- Checked the latest image tags.
- Continued with Kubernetes deployment.

### Commands Used

```bash
az acr list
az acr repository list --name <acr-name>
az acr repository show-tags --name <acr-name> --repository tickethub-backend
```

### Lesson Learned

Always confirm that images exist in Azure Container Registry before troubleshooting Kubernetes deployments.

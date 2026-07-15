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
---

# Azure Kubernetes Service (AKS)

## Issue 1 – Backend Pod Entered CrashLoopBackOff

### What was the issue?

After deploying the backend application to AKS, the backend Pod failed to start correctly and entered the **CrashLoopBackOff** state. Kubernetes repeatedly attempted to restart the container.

### What was the root cause?

The backend container was failing during startup because the application configuration was not correct during deployment. Since the application exited immediately, Kubernetes continuously restarted the Pod.

### What was the solution?

I inspected the Pod logs, identified the startup problem, corrected the configuration, and redeployed the application.

### What did I do?

- Checked the Pod status.
- Described the Pod to inspect events.
- Viewed the container logs.
- Fixed the application configuration.
- Redeployed the application.
- Verified the Pod reached the **Running** state.

### Commands Used

```bash
kubectl get pods -n tickethub
kubectl describe pod <pod-name> -n tickethub
kubectl logs <pod-name> -n tickethub
```

### Lesson Learned

Whenever a Pod enters **CrashLoopBackOff**, the first place to investigate is the container logs.

---

## Issue 2 – Verify Deployment Rollout

### What was the issue?

After applying Kubernetes manifests, I needed to ensure that the Deployment completed successfully instead of assuming it had worked.

### What was the root cause?

There was no deployment failure, but skipping rollout verification could hide failed updates.

### What was the solution?

I always verified the rollout status after every deployment.

### What did I do?

- Applied the updated manifests.
- Waited for the rollout to finish.
- Confirmed Kubernetes reported a successful rollout.

### Commands Used

```bash
kubectl rollout status deployment/tickethub-backend -n tickethub
kubectl rollout status deployment/tickethub-frontend -n tickethub
```

### Lesson Learned

A successful `kubectl apply` does not guarantee a successful deployment.

---

## Issue 3 – Backend Service Missing Labels

### What was the issue?

Prometheus could not discover the backend Service even though the backend Pod was running correctly.

### What was the root cause?

The Kubernetes Service did not contain the labels expected by the ServiceMonitor.

### What was the solution?

I updated the Service manifest with the required labels and redeployed it.

### What did I do?

- Displayed the Service labels.
- Compared them with the ServiceMonitor selector.
- Added the missing label.
- Applied the updated Service manifest.
- Verified the labels.

### Commands Used

```bash
kubectl get svc tickethub-backend-service --show-labels -n tickethub
kubectl apply -f backend-service.yaml
```

### Lesson Learned

Labels are essential for Kubernetes resource discovery.

---

## Verification 1 – Pod Verification

### What was the issue?

Before moving to the next deployment stage, I needed to verify that all Pods were healthy.

### What was the solution?

I checked the status of every Pod after each deployment.

### What did I do?

- Verified Pod status.
- Confirmed all Pods were in the **Running** state.
- Ensured there were no restart loops.

### Commands Used

```bash
kubectl get pods -n tickethub
```

### Lesson Learned

Always verify Pod health before troubleshooting higher-level components.

---

## Verification 2 – Deployment Verification

### What was the issue?

I needed to confirm that the expected number of replicas had been created.

### What was the solution?

I checked all Deployments after each rollout.

### What did I do?

- Listed all Deployments.
- Verified READY replicas.
- Confirmed AVAILABLE replicas matched the desired count.

### Commands Used

```bash
kubectl get deployments -n tickethub
```

### Lesson Learned

Pods may exist, but the Deployment is the source of truth for application state.

---

## Verification 3 – Service Verification

### What was the issue?

The frontend and backend communicate through Kubernetes Services. I needed to ensure they were created correctly.

### What was the solution?

I verified all Services after deployment.

### What did I do?

- Listed Services.
- Verified ClusterIP assignment.
- Confirmed expected ports.

### Commands Used

```bash
kubectl get svc -n tickethub
```

### Lesson Learned

Always verify Services before troubleshooting networking issues.

---

# Helm

## Verification 1 – Validate Helm Templates

### What was the issue?

Before deploying with Helm, I wanted to ensure that the generated Kubernetes manifests were valid.

### What was the solution?

I rendered the templates locally before deployment.

### What did I do?

- Rendered the chart.
- Reviewed the generated manifests.
- Fixed any template issues before deployment.

### Commands Used

```bash
helm template tickethub ./helm/tickethub
```

### Lesson Learned

Rendering templates locally helps catch errors before they reach the cluster.

---

## Verification 2 – Helm Chart Validation

### What was the issue?

I needed to validate the Helm chart structure and configuration.

### What was the solution?

I used Helm's built-in linting before deployment.

### What did I do?

- Ran Helm lint.
- Fixed any warnings.
- Continued with deployment only after validation succeeded.

### Commands Used

```bash
helm lint ./helm/tickethub
```

### Lesson Learned

Running `helm lint` before deployment helps detect common chart issues early.

---

# Part 2 Summary

This phase focused on validating Kubernetes resources and Helm deployments.

By verifying Pods, Deployments, Services, rollouts, and Helm templates at every stage, I reduced deployment failures and made troubleshooting much more systematic.
### Lesson Learned

Always confirm that images exist in Azure Container Registry before troubleshooting Kubernetes deployments.


# 🚀 TicketHub Project Walkthrough

> **Purpose**
>
> This document explains the TicketHub project from a DevOps engineer's perspective. The focus is on the complete software delivery lifecycle, cloud infrastructure, CI/CD, GitOps, Kubernetes deployment, and monitoring rather than application development.

---

# 1. Introduction

TicketHub is a cloud-native ticket management application deployed on Microsoft Azure using modern DevOps practices.

Instead of treating the application as the primary focus, this project uses it as a workload to demonstrate how to build a complete DevOps platform with automation, Kubernetes, GitOps, and monitoring.

The project includes:

- Docker containerization
- Azure Container Registry (ACR)
- Azure Kubernetes Service (AKS)
- Helm
- GitHub Actions
- Argo CD (GitOps)
- Prometheus
- Grafana
- Azure Monitor
- Log Analytics

---

# 2. Project Objective

The primary objective was to gain hands-on experience implementing a production-style DevOps workflow.

Goals:

- Containerize the application.
- Deploy to Kubernetes.
- Automate CI/CD.
- Implement GitOps.
- Monitor the application and infrastructure.
- Learn Azure-native services.

---

# 3. Application Overview

The application is a simple ticket management system built using:

- React (Frontend)
- Node.js & Express (Backend)
- MongoDB Atlas (Database)

The application itself is intentionally simple because the focus of the project is the DevOps lifecycle.

---

# 4. High-Level Architecture

Developer
→ GitHub Repository
→ GitHub Actions
→ Azure Container Registry
→ Helm
→ Argo CD
→ Azure Kubernetes Service
→ Prometheus
→ Grafana
→ Azure Monitor
→ Log Analytics

---

# 5. Azure Infrastructure

Azure resources used:

- Resource Group
- Azure Kubernetes Service
- Azure Container Registry
- Log Analytics Workspace
- Azure Monitor

These services provide the cloud platform required for deployment and monitoring.

---

# 6. Docker

Both frontend and backend were containerized independently.

Benefits:

- Consistent runtime
- Easy deployment
- Environment independence
- Versioned container images

Docker images are tagged and pushed to Azure Container Registry.

---

# 7. Azure Container Registry

Azure Container Registry stores the Docker images built by GitHub Actions.

Workflow:

1. Build image
2. Tag image
3. Push to ACR
4. AKS pulls latest image during deployment

---

# 8. Azure Kubernetes Service

AKS hosts the application.

Resources used:

- Namespace
- Deployments
- Services
- Ingress
- ConfigMaps
- Secrets
- ServiceMonitor

AKS manages scheduling, networking, scaling, and self-healing.

---

# 9. Helm

Helm templates Kubernetes manifests and manages releases.

Advantages:

- Reusable templates
- Environment-specific values
- Easier upgrades
- Cleaner deployments

---

# 10. GitHub Actions (CI)

GitHub Actions performs Continuous Integration.

Workflow:

- Trigger on Git push
- Checkout source
- Authenticate with Azure
- Build Docker images
- Push images to ACR
- Update Helm image tags
- Commit updated configuration

No deployment is performed directly from GitHub Actions.

---

# 11. GitOps with Argo CD (CD)

Argo CD continuously watches the Git repository.

When Helm values change:

- Detect repository update
- Compare desired and live state
- Synchronize AKS
- Perform rolling update

Git remains the single source of truth.

---

# 12. Kubernetes Deployment

Deployment process:

Developer
→ GitHub Actions
→ ACR
→ Argo CD
→ AKS
→ Pods
→ Services
→ Ingress
→ Users

Deployment is fully automated after a Git push.

---

# 13. Monitoring & Observability

Application Monitoring:

- Prometheus collects metrics.
- Grafana visualizes metrics.

Infrastructure Monitoring:

- Azure Monitor collects infrastructure telemetry.
- Log Analytics stores telemetry.
- KQL is used for analysis.

---

# 14. End-to-End DevOps Workflow

1. Developer pushes code.
2. GitHub Actions starts.
3. Docker images are built.
4. Images are pushed to ACR.
5. Helm values are updated.
6. Changes are committed.
7. Argo CD detects updates.
8. AKS is synchronized.
9. Application is deployed.
10. Prometheus collects metrics.
11. Grafana visualizes metrics.
12. Azure Monitor collects infrastructure data.
13. Log Analytics stores telemetry.

---

# 15. Challenges Faced

Some practical issues encountered:

- /metrics endpoint returned 404
- CrashLoopBackOff during deployment
- Service label mismatch
- ServiceMonitor selector mismatch
- Prometheus target DOWN
- Grafana showing No Data
- Microsoft.Insights provider registration
- Telemetry delay in Log Analytics

These were resolved through systematic troubleshooting.

---

# 16. Key Learnings

- Kubernetes labels are critical.
- GitOps simplifies deployments.
- CI and CD should have separate responsibilities.
- Verify each deployment stage independently.
- Monitor both the application and infrastructure.

---

# 17. Future Improvements

Potential enhancements:

- Terraform
- Azure Key Vault
- Horizontal Pod Autoscaler
- KEDA
- OpenTelemetry
- Loki
- Velero
- Azure Application Gateway
- GitHub Advanced Security

---

# 18. Project Summary

TicketHub demonstrates a complete DevOps workflow on Microsoft Azure.

The project covers containerization, Kubernetes orchestration, CI/CD, GitOps, and monitoring using industry-standard tools.

The primary outcome was gaining practical experience building, deploying, automating, monitoring, and troubleshooting a cloud-native application using Azure and Kubernetes.

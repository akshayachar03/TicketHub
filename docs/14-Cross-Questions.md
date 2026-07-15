# 🔍 Cross Questions (Advanced Interview Preparation)

> This document contains follow-up questions that interviewers commonly ask after the initial project discussion. These questions focus on architectural decisions, trade-offs, production readiness, scalability, security, and failure scenarios.

---

# Docker

## Why Docker instead of deploying directly on a VM?

**Answer:** Docker provides consistent runtime environments, portability, versioned artifacts, and is the standard packaging format for Kubernetes.

## Why separate frontend and backend into different images?

**Answer:** They have different runtimes, release independently, can scale independently, and reduce unnecessary rebuilds.

---

# Azure Container Registry (ACR)

## Why ACR instead of Docker Hub?

**Answer:** ACR integrates natively with AKS, supports private repositories, Azure RBAC, and managed authentication.

## What happens if ACR is unavailable?

**Answer:** Existing Pods continue running, but new Pods or rolling updates may fail because Kubernetes cannot pull images.

---

# Azure Kubernetes Service (AKS)

## Why AKS instead of Azure App Service?

**Answer:** I wanted container orchestration, rolling updates, self-healing, scalability, Kubernetes experience, and GitOps support. App Service is simpler but offers less control.

## Why Kubernetes instead of Docker Compose?

**Answer:** Docker Compose is suitable for local development, while Kubernetes provides orchestration, service discovery, rolling updates, self-healing, and production scalability.

## How would you scale the application?

**Answer:** Use Horizontal Pod Autoscaler (HPA), Cluster Autoscaler, resource requests/limits, and optimize stateless services.

## How would you achieve high availability?

**Answer:** Deploy multiple replicas across availability zones, use readiness/liveness probes, distribute traffic through Services/Ingress, and enable cluster autoscaling.

---

# Helm

## Why Helm instead of plain YAML?

**Answer:** Helm reduces duplication through templates, centralizes configuration in `values.yaml`, and simplifies upgrades and rollbacks.

## When would you avoid Helm?

**Answer:** For very small or static projects where only a few Kubernetes manifests are required.

---

# GitHub Actions

## Why GitHub Actions instead of Azure DevOps Pipelines?

**Answer:** The source code was hosted on GitHub, making GitHub Actions easy to integrate with minimal setup. Azure DevOps would also have been a valid enterprise choice.

## What happens if the workflow fails after building the image?

**Answer:** Since deployment is handled by Argo CD, the cluster remains unchanged until the Git configuration is updated successfully.

---

# GitOps & Argo CD

## Why GitOps?

**Answer:** Git becomes the single source of truth, making deployments auditable, repeatable, and easier to roll back.

## Why Argo CD instead of `kubectl apply`?

**Answer:** Argo CD continuously reconciles the cluster with Git and automatically corrects configuration drift.

## What happens if Argo CD is down?

**Answer:** Running workloads continue operating. However, new Git changes are not synchronized until Argo CD is restored.

## What is configuration drift?

**Answer:** It occurs when the live cluster differs from the desired configuration stored in Git.

---

# Prometheus

## Why Prometheus when Azure Monitor already exists?

**Answer:** Prometheus specializes in Kubernetes and application metrics, while Azure Monitor focuses on Azure infrastructure and platform telemetry.

## What happens if Prometheus goes down?

**Answer:** The application continues running, but metrics collection and Grafana dashboards relying on Prometheus are affected.

---

# Grafana

## Why Grafana instead of Azure Dashboards?

**Answer:** Grafana offers richer visualization, integrates naturally with Prometheus, and is widely adopted in cloud-native environments.

---

# Azure Monitor & Log Analytics

## Why use Azure Monitor in addition to Prometheus?

**Answer:** Azure Monitor provides Azure-native telemetry, platform metrics, alerts, and integration with Log Analytics.

## Why Log Analytics?

**Answer:** It centralizes logs and supports powerful analysis using Kusto Query Language (KQL).

---

# Security

## How would you improve security?

**Answer:**
- Store secrets in Azure Key Vault.
- Use Managed Identity.
- Scan container images.
- Apply Network Policies.
- Enable RBAC.
- Restrict Ingress exposure.

## How would you manage secrets in production?

**Answer:** I would integrate Azure Key Vault with Kubernetes instead of storing secrets directly in manifests.

---

# CI/CD

## Why separate CI and CD?

**Answer:** CI builds and validates artifacts, while CD handles deployments. Separating responsibilities improves reliability and flexibility.

## How would you implement zero-downtime deployment?

**Answer:** Use Kubernetes rolling updates, readiness probes, and sufficient replicas. For advanced scenarios, implement blue-green or canary deployments.

## How would you roll back a failed deployment?

**Answer:** Revert the Git change and let Argo CD synchronize the previous version, or use Helm rollback if appropriate.

---

# Monitoring

## How do you know your deployment is healthy?

**Answer:** I verify:
- Pods are Running.
- Rollout completed.
- Prometheus targets are UP.
- Grafana dashboards show metrics.
- Azure Monitor agents are healthy.
- Log Analytics receives telemetry.

---

# Troubleshooting

## What was the most difficult issue?

**Answer:** Prometheus service discovery because I had to verify the `/metrics` endpoint, Service labels, ServiceMonitor selectors, and target status before metrics appeared.

## How do you troubleshoot a deployment?

**Answer:** I follow a layered approach:

Application → Docker → ACR → Kubernetes → Helm → GitHub Actions → Argo CD → Prometheus → Grafana → Azure Monitor → Log Analytics

---

# Production Readiness

## What would you add before using this in production?

**Answer:**
- Terraform
- Azure Key Vault
- Managed Identity
- HPA
- Cluster Autoscaler
- Azure Application Gateway
- Backup & Disaster Recovery
- Centralized logging
- Image scanning
- Policy enforcement
- Cost monitoring

---

# Final Question

## If you had one month to improve this project, what would you do?

**Answer:** I would provision the infrastructure using Terraform, secure secrets with Azure Key Vault, implement HPA and Cluster Autoscaler, add automated security scanning, integrate OpenTelemetry, improve observability, and introduce production-grade deployment strategies such as blue-green or canary releases.

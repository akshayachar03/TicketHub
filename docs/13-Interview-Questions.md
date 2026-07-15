# 📘 Interview Questions

> This document contains interview questions and concise answers based on the TicketHub project. The questions are grouped by topic and focus on the technologies used in the implementation.

---

# 1. Project Overview

## Q1. Tell me about your project.

**Answer:** TicketHub is a cloud-native ticket management application deployed on Azure. I focused on implementing a complete DevOps lifecycle using Docker, AKS, Helm, GitHub Actions, Argo CD, Prometheus, Grafana, Azure Monitor, and Log Analytics.

## Q2. What was the objective of this project?

**Answer:** To gain hands-on experience with containerization, Kubernetes, CI/CD, GitOps, monitoring, and Azure-native DevOps services.

## Q3. Which part of the project did you focus on most?

**Answer:** The DevOps implementation rather than application development.

---

# 2. Docker

## Q1. Why did you use Docker?

**Answer:** To package the frontend and backend into portable, consistent containers that run the same across environments.

## Q2. Why separate frontend and backend images?

**Answer:** They have different runtimes, release cycles, and scaling requirements.

## Q3. What is the difference between an image and a container?

**Answer:** An image is an immutable template. A container is a running instance of that image.

---

# 3. Azure Container Registry (ACR)

## Q1. Why did you use ACR?

**Answer:** To securely store private Docker images and integrate them with AKS.

## Q2. Why not Docker Hub?

**Answer:** ACR integrates natively with Azure, supports private repositories, and simplifies authentication with AKS.

---

# 4. Azure Kubernetes Service (AKS)

## Q1. Why AKS?

**Answer:** AKS is a managed Kubernetes service that provides orchestration without managing the Kubernetes control plane.

## Q2. Which Kubernetes resources did you use?

**Answer:** Namespace, Deployments, Services, Ingress, ConfigMaps, Secrets, and ServiceMonitor.

## Q3. What is a Deployment?

**Answer:** A Deployment manages Pods, rolling updates, and self-healing.

## Q4. Difference between Deployment and Pod?

**Answer:** Pods run containers. Deployments manage Pods and maintain the desired state.

---

# 5. Helm

## Q1. Why Helm?

**Answer:** Helm templates Kubernetes manifests and centralizes configuration through values.yaml.

## Q2. What are the main components of a Helm chart?

**Answer:** Chart.yaml, values.yaml, templates/, and charts/.

---

# 6. GitHub Actions

## Q1. What did your GitHub Actions workflow do?

**Answer:** It built Docker images, pushed them to ACR, updated Helm image tags, and committed the updated configuration.

## Q2. Did GitHub Actions deploy the application?

**Answer:** No. Deployment was handled by Argo CD using GitOps.

---

# 7. Argo CD & GitOps

## Q1. What is GitOps?

**Answer:** GitOps is a deployment model where Git is the single source of truth for infrastructure and application configuration.

## Q2. Why Argo CD?

**Answer:** It continuously synchronizes the Kubernetes cluster with the desired state stored in Git.

## Q3. What does Synced mean?

**Answer:** The live Kubernetes state matches the desired state in Git.

---

# 8. Prometheus

## Q1. What does Prometheus do?

**Answer:** It collects and stores application metrics by scraping configured endpoints.

## Q2. How did Prometheus collect metrics?

**Answer:** It scraped the backend `/metrics` endpoint through a ServiceMonitor.

---

# 9. Grafana

## Q1. Why Grafana?

**Answer:** To visualize metrics collected by Prometheus using dashboards.

## Q2. Why did Grafana initially show 'No Data'?

**Answer:** Because Prometheus was not scraping metrics successfully.

---

# 10. Azure Monitor & Log Analytics

## Q1. Why Azure Monitor?

**Answer:** To monitor Azure infrastructure and collect platform telemetry.

## Q2. Why Log Analytics?

**Answer:** To centralize logs and query them using Kusto Query Language (KQL).

## Q3. What query did you use to validate ingestion?

**Answer:**
```kusto
Heartbeat
| take 10
```

---

# 11. Monitoring

## Q1. Why both Prometheus and Azure Monitor?

**Answer:** Prometheus focuses on application metrics, while Azure Monitor focuses on Azure infrastructure and platform telemetry.

---

# 12. Troubleshooting

## Q1. What was the most challenging issue?

**Answer:** Prometheus service discovery because it required verifying `/metrics`, Service labels, ServiceMonitor selectors, and target health.

## Q2. How do you approach troubleshooting?

**Answer:** I troubleshoot layer by layer: Application → Docker → Kubernetes → GitOps → Monitoring.

---

# 13. CI/CD

## Q1. Explain your CI/CD pipeline.

**Answer:** GitHub Actions builds and publishes Docker images. Argo CD detects the updated Git configuration and deploys the application to AKS automatically.

---

# 14. Final Question

## Q1. What was your biggest learning from this project?

**Answer:** Building a reliable DevOps workflow requires more than automation. It requires understanding how each component integrates with the next, verifying every stage, and troubleshooting issues systematically.

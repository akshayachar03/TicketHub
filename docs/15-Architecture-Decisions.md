# 🏗️ Architecture Decisions

> This document explains why I selected each technology for the TicketHub project, what alternatives I considered, and the trade-offs involved. The goal is to justify the architectural decisions from a DevOps perspective.

---

# 1. Why React?

### Why I selected it

I chose React because it is a widely adopted frontend framework with a component-based architecture. It allowed me to create a simple user interface while keeping the focus on the DevOps implementation.

### Alternatives Considered

- Angular
- Vue.js
- Plain HTML/CSS/JavaScript

### Why I didn't choose them

React has a larger ecosystem, more community support, and is commonly used in enterprise projects.

### Trade-offs

- More build tooling than plain JavaScript.
- Requires a Node.js build process.

---

# 2. Why Node.js & Express?

### Why I selected it

Node.js and Express made it easy to create REST APIs and expose the `/metrics` endpoint for Prometheus.

### Alternatives Considered

- Spring Boot
- ASP.NET Core
- Django

### Why I didn't choose them

My focus was DevOps rather than learning a new backend framework.

### Trade-offs

- Single-threaded runtime.
- Requires careful handling of CPU-intensive tasks.

---

# 3. Why MongoDB Atlas?

### Why I selected it

Using MongoDB Atlas eliminated the need to manage a database inside Kubernetes, allowing me to focus on application deployment.

### Alternatives Considered

- Azure SQL Database
- PostgreSQL
- MySQL

### Trade-offs

- External dependency.
- Internet connectivity required.

---

# 4. Why Docker?

### Why I selected it

Docker provides a consistent runtime environment and makes deployments repeatable across development and production.

### Alternatives Considered

- Manual server deployment
- Virtual Machines

### Why Docker?

Containers are lightweight, portable, and the standard packaging format for Kubernetes.

### Trade-offs

- Requires image management.
- Additional learning curve.

---

# 5. Why Azure Container Registry (ACR)?

### Why I selected it

ACR integrates seamlessly with Azure Kubernetes Service and securely stores Docker images.

### Alternatives Considered

- Docker Hub
- GitHub Container Registry

### Why ACR?

Native Azure integration, private registry support, and simplified authentication with AKS.

### Trade-offs

- Azure-specific service.

---

# 6. Why Azure Kubernetes Service (AKS)?

### Why I selected it

AKS is a managed Kubernetes service that reduces operational overhead while providing production-grade orchestration.

### Alternatives Considered

- Azure App Service
- Self-managed Kubernetes
- Docker Compose

### Why AKS?

I wanted hands-on Kubernetes experience and enterprise-grade deployment capabilities.

### Trade-offs

- More complexity than App Service.
- Higher learning curve.

---

# 7. Why Helm?

### Why I selected it

Helm simplifies Kubernetes deployments by templating manifests and centralizing configuration.

### Alternatives Considered

- Plain Kubernetes YAML

### Why Helm?

Managing multiple YAML files manually becomes difficult as projects grow.

### Trade-offs

- Template syntax adds complexity.
- Requires understanding Helm charts.

---

# 8. Why GitHub Actions?

### Why I selected it

GitHub Actions integrates directly with the repository and automates the build process.

### Alternatives Considered

- Azure DevOps Pipelines
- Jenkins
- GitLab CI

### Why GitHub Actions?

It was simple to configure, required no additional infrastructure, and integrated naturally with GitHub.

### Trade-offs

- Tightly coupled to GitHub.
- Fewer enterprise features than Azure DevOps.

---

# 9. Why GitOps?

### Why I selected it

GitOps makes Git the single source of truth for deployments, improving consistency, traceability, and rollback capabilities.

### Alternatives Considered

- Manual `kubectl apply`
- Direct deployment from CI

### Trade-offs

- Additional tooling.
- Requires disciplined Git workflows.

---

# 10. Why Argo CD?

### Why I selected it

Argo CD provides continuous synchronization between Git and Kubernetes.

### Alternatives Considered

- Flux CD
- Manual deployments

### Why Argo CD?

It offers a user-friendly interface, strong GitOps support, and easy visualization of application health.

### Trade-offs

- Additional component to manage.

---

# 11. Why Prometheus?

### Why I selected it

Prometheus is the standard monitoring solution for Kubernetes applications.

### Alternatives Considered

- Azure Monitor only

### Why Prometheus?

It provides application-level metrics and integrates directly with Kubernetes through ServiceMonitors.

### Trade-offs

- Focuses on metrics rather than logs.

---

# 12. Why Grafana?

### Why I selected it

Grafana provides flexible dashboards for visualizing Prometheus metrics.

### Alternatives Considered

- Azure Dashboards

### Why Grafana?

It offers rich visualization capabilities and is widely adopted in cloud-native environments.

### Trade-offs

- Requires a metrics backend such as Prometheus.

---

# 13. Why Azure Monitor?

### Why I selected it

Azure Monitor complements Prometheus by collecting Azure infrastructure telemetry and platform metrics.

### Alternatives Considered

- Prometheus alone

### Why Azure Monitor?

Prometheus focuses on the application, while Azure Monitor provides visibility into Azure resources.

### Trade-offs

- Azure-specific service.
- Some advanced features may incur additional cost.

---

# 14. Why Log Analytics?

### Why I selected it

Log Analytics centralizes logs and enables powerful querying with Kusto Query Language (KQL).

### Alternatives Considered

- ELK Stack
- Loki

### Why Log Analytics?

It integrates natively with Azure Monitor and AKS.

### Trade-offs

- Azure-specific.
- Query syntax requires learning KQL.

---

# 15. Overall Architecture Decisions

The primary objective of this project was to build a modern Azure DevOps workflow rather than just deploy an application.

Key architectural decisions included:

- Containerizing the application with Docker.
- Using AKS for orchestration.
- Managing deployments with Helm.
- Automating builds with GitHub Actions.
- Implementing GitOps using Argo CD.
- Monitoring applications with Prometheus and Grafana.
- Monitoring Azure infrastructure with Azure Monitor and Log Analytics.

Together, these decisions created a complete cloud-native DevOps platform that reflects common practices used in enterprise environments.

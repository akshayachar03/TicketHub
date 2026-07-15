# ☁️ Azure Infrastructure

## Introduction

The TicketHub project is deployed entirely on Microsoft Azure.

After completing the application development, I provisioned the required Azure services to host, deploy, monitor, and manage the application.

Instead of deploying everything on a single virtual machine, I used managed Azure services to build a cloud-native deployment.

This approach reduced operational overhead while allowing me to learn industry-standard Azure services used in modern DevOps environments.

---

# Azure Services Used

The project uses the following Azure services.

| Azure Service                  | Purpose                                  |
| ------------------------------ | ---------------------------------------- |
| Resource Group                 | Logical container for Azure resources    |
| Azure Kubernetes Service (AKS) | Hosts the application                    |
| Azure Container Registry (ACR) | Stores Docker images                     |
| Azure Monitor                  | Infrastructure monitoring                |
| Log Analytics Workspace        | Stores monitoring data                   |
| Azure CLI                      | Infrastructure management and deployment |

Each service plays a specific role in the overall architecture.

---

# Azure Resource Group

The first resource I created was a Resource Group.

The Resource Group acts as a logical container for all Azure resources related to the project.

Benefits include:

* Easy resource management
* Simplified deployment
* Centralized billing
* Easier cleanup

Keeping all project resources inside one Resource Group makes administration much simpler.

---

# Azure Kubernetes Service (AKS)

Azure Kubernetes Service is the core infrastructure component of the project.

It hosts:

* Frontend application
* Backend application
* Argo CD
* Prometheus
* Grafana
* NGINX Ingress Controller

AKS is responsible for:

* Running application Pods
* Scheduling workloads
* Networking
* Rolling updates
* Self-healing

Instead of managing Kubernetes manually, Azure manages the Kubernetes control plane.

---

# Azure Container Registry (ACR)

Azure Container Registry stores all Docker images used by the project.

Whenever GitHub Actions builds new images, they are pushed to ACR.

AKS then pulls these images during deployment.

Benefits include:

* Private image storage
* Secure integration with Azure
* Faster image pulls
* Native AKS integration

---

# Azure Monitor

Azure Monitor provides visibility into the Azure infrastructure.

It monitors:

* AKS cluster
* Nodes
* Infrastructure health
* Resource telemetry

Azure Monitor complements Prometheus by focusing on infrastructure instead of application metrics.

---

# Log Analytics Workspace

The Log Analytics Workspace stores telemetry collected by Azure Monitor.

It enables:

* Log storage
* KQL queries
* Infrastructure troubleshooting
* Monitoring verification

Heartbeat records confirmed that monitoring agents were successfully connected to the workspace.

---

# Azure CLI

Throughout the project, Azure CLI was used to manage Azure resources.

Examples include:

* Logging into Azure
* Creating resources
* Connecting to AKS
* Managing Azure Container Registry
* Enabling Azure Monitor
* Verifying infrastructure

Using Azure CLI helped automate many infrastructure management tasks.

---

# Infrastructure Architecture

The Azure infrastructure is organized as follows.

```text id="r5fmln"
Azure Subscription

        │

        ▼

Resource Group

        │

        ├── Azure Kubernetes Service

        ├── Azure Container Registry

        ├── Azure Monitor

        └── Log Analytics Workspace
```

All Azure resources are grouped under a single Resource Group.

---

# Infrastructure Workflow

The deployment flow within Azure is shown below.

```text id="xqz95m"
GitHub Actions

        │

        ▼

Azure Container Registry

        │

        ▼

Azure Kubernetes Service

        │

        ▼

Running Application

        │

        ▼

Azure Monitor

        │

        ▼

Log Analytics Workspace
```

This workflow shows how application deployment and infrastructure monitoring are connected.

---

# How I Verified the Infrastructure

After provisioning the Azure resources, I verified:

* Resource Group created successfully.
* AKS cluster running.
* ACR accessible.
* Docker images available in ACR.
* Azure Monitor enabled.
* Log Analytics Workspace connected.
* Monitoring agents running.
* Heartbeat data available.

These checks confirmed that the Azure environment was functioning correctly.

---

# Challenges Faced

During the Azure implementation, I encountered a few practical issues.

Examples include:

* Registering the **Microsoft.Insights** resource provider before enabling Azure Monitor.
* Waiting for monitoring data to appear in Log Analytics.
* Verifying Azure Monitor Agent deployment.

Resolving these issues improved my understanding of Azure monitoring services and resource provisioning.

Detailed troubleshooting steps are documented in the **Troubleshooting Guide**.

---

# What I Learned

Working with Azure helped me understand how different managed services work together to support a cloud-native application.

Some key lessons include:

* Resource Groups organize Azure resources.
* AKS provides managed Kubernetes.
* ACR stores container images.
* Azure Monitor focuses on infrastructure monitoring.
* Log Analytics stores telemetry for analysis.
* Azure CLI simplifies resource management.

Using managed Azure services allowed me to focus on application deployment and DevOps practices rather than managing infrastructure manually.

---

# Best Practices

While implementing the Azure infrastructure, I followed these practices.

* Keep related resources in a single Resource Group.
* Use managed Azure services whenever possible.
* Store container images in ACR.
* Monitor infrastructure using Azure Monitor.
* Verify monitoring after enabling services.
* Use Azure CLI for repeatable administration tasks.

---

# Summary

Microsoft Azure provides the foundation for the TicketHub project.

By combining Azure Kubernetes Service, Azure Container Registry, Azure Monitor, and Log Analytics, I built a cloud-native infrastructure capable of hosting, deploying, and monitoring the application.

This infrastructure integrates seamlessly with the CI/CD pipeline, GitOps workflow, and Kubernetes deployment, creating a complete end-to-end DevOps solution.

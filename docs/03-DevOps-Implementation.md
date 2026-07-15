# ⚙️ DevOps Implementation

## Introduction

This document explains the complete DevOps implementation of the TicketHub project.

The primary objective of this project was not to build another movie ticket booking application, but to understand how modern DevOps tools work together to deploy, automate, monitor, and manage an application in a production-like environment.

Instead of learning Docker, Kubernetes, GitHub Actions, Helm, Argo CD, and Prometheus individually, I wanted to integrate them into a single project and understand how they fit into the software delivery lifecycle.

This document explains every major decision I made during the project, why I selected a particular tool, how I implemented it, the challenges I encountered, and the lessons I learned.

---

# My Learning Goal

When I started this project, my objective was to gain hands-on experience with the complete DevOps lifecycle.

I wanted to answer questions such as:

* How is an application containerized?
* How are Docker images stored?
* How are applications deployed to Kubernetes?
* How can deployments be automated?
* What is GitOps?
* How does Argo CD work?
* How can applications be monitored?
* How are production issues identified and resolved?

Instead of learning these concepts individually, I decided to implement them in a single end-to-end project.

---

# DevOps Lifecycle Implemented

The project covers the following DevOps stages:

```text
Planning
    │
    ▼
Application Development
    │
    ▼
Version Control (GitHub)
    │
    ▼
Containerization (Docker)
    │
    ▼
Continuous Integration (GitHub Actions)
    │
    ▼
Container Registry (Azure Container Registry)
    │
    ▼
Deployment (Helm)
    │
    ▼
GitOps (Argo CD)
    │
    ▼
Azure Kubernetes Service (AKS)
    │
    ▼
Monitoring
    ├── Prometheus
    ├── Grafana
    └── Azure Monitor
```

Each stage builds upon the previous one, resulting in a complete cloud-native deployment pipeline.

---

# Why I Chose This DevOps Stack

One of the first questions interviewers often ask is:

> **"Why did you choose these tools?"**

My selection was based on learning industry-standard technologies that integrate well with Microsoft Azure.

| Tool                           | Why I Chose It                                                   |
| ------------------------------ | ---------------------------------------------------------------- |
| GitHub                         | Source code management and collaboration                         |
| Docker                         | Standard containerization platform                               |
| GitHub Actions                 | Native CI/CD solution for GitHub repositories                    |
| Azure Container Registry (ACR) | Secure storage for Docker images within Azure                    |
| Azure Kubernetes Service (AKS) | Managed Kubernetes service that reduces operational overhead     |
| Helm                           | Simplifies Kubernetes deployments using reusable templates       |
| Argo CD                        | Implements GitOps and keeps Kubernetes synchronized with Git     |
| Prometheus                     | Industry-standard metrics collection for Kubernetes applications |
| Grafana                        | Powerful dashboard and visualization platform                    |
| Azure Monitor                  | Native Azure service for infrastructure monitoring               |
| Log Analytics                  | Centralized logging and troubleshooting                          |

---

# Overall Implementation Journey

The project was implemented in multiple phases.

## Phase 1 — Application Development

Developed the frontend and backend application and verified that it worked correctly in the local environment.

At this stage, the application was executed using Node.js and React without containers.

---

## Phase 2 — Containerization

Created Dockerfiles for both the frontend and backend.

The goal was to package the application with all its dependencies so that it could run consistently across different environments.

Both containers were tested locally before proceeding to Kubernetes.

---

## Phase 3 — Container Registry

Created an Azure Container Registry (ACR).

The Docker images were built locally and pushed to ACR.

This registry became the source of container images for Kubernetes deployments.

---

## Phase 4 — Kubernetes Deployment

Created an Azure Kubernetes Service (AKS) cluster.

Initially, the application was deployed using Kubernetes manifests.

Later, these manifests were converted into Helm templates to improve maintainability.

---

## Phase 5 — Continuous Integration

Implemented GitHub Actions.

Whenever code was pushed to GitHub:

* Docker images were built automatically.
* Images were pushed to Azure Container Registry.
* Helm image tags were updated automatically.

This removed the need for manual image builds.

---

## Phase 6 — GitOps

Integrated Argo CD.

Instead of deploying directly from GitHub Actions, Argo CD continuously monitored the Git repository and synchronized the Kubernetes cluster.

This made Git the single source of truth for deployments.

---

## Phase 7 — Monitoring

Added monitoring after the application was successfully deployed.

Monitoring was implemented in two layers:

### Application Monitoring

* Prometheus
* Grafana

### Infrastructure Monitoring

* Azure Monitor
* Azure Log Analytics

This provided visibility into both the application and the Kubernetes cluster.

---

# Why This Approach?

I intentionally implemented the project in stages instead of configuring everything at once.

This approach helped me:

* Understand each technology independently.
* Verify every stage before moving to the next.
* Troubleshoot issues more effectively.
* Learn how the complete DevOps workflow is connected.

If I had configured every tool simultaneously, identifying and resolving problems would have been significantly more difficult.

---

# What This Document Covers

The following sections explain every implementation step in detail.

For each major technology, I will cover:

* Why I selected it.
* How I configured it.
* Commands used.
* Important configuration files.
* Challenges encountered.
* Solutions implemented.
* Best practices followed.
* Common interview questions.

---

# Interview Tips

## Question

**"Can you briefly explain the DevOps implementation in your project?"**

### Sample Answer

> "After completing the application, I containerized the frontend and backend using Docker. I pushed the images to Azure Container Registry and deployed them on Azure Kubernetes Service. To simplify Kubernetes deployments, I used Helm. I automated the build process using GitHub Actions, and instead of deploying directly from the pipeline, I implemented GitOps using Argo CD so that deployments were managed from Git. Finally, I integrated Prometheus and Grafana for application monitoring, along with Azure Monitor and Log Analytics for infrastructure monitoring."

---

# What's Next?

The next section of this document begins with the first implementation step:

**Containerization using Docker**

This section explains why Docker was introduced, how the images were created, and what challenges were encountered during containerization.

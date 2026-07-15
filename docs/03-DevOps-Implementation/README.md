# ⚙️ DevOps Implementation

## Introduction

This section documents the complete DevOps implementation of the TicketHub project.

The goal of this project was not only to develop a movie ticket booking application, but also to understand how a real-world application moves from development to production using modern DevOps practices.

Instead of learning Docker, Kubernetes, CI/CD, GitOps, and Monitoring individually, I implemented all of them in a single project to understand how they work together throughout the software delivery lifecycle.

This documentation focuses on the implementation journey, the decisions I made, the challenges I faced, and the lessons I learned while building the project.

---

# DevOps Journey

The implementation followed the sequence below:

```text
Application Development
        │
        ▼
Docker
        │
        ▼
Azure Container Registry (ACR)
        │
        ▼
Azure Kubernetes Service (AKS)
        │
        ▼
Helm
        │
        ▼
GitHub Actions (CI)
        │
        ▼
Argo CD (GitOps)
        │
        ▼
Prometheus
        │
        ▼
Grafana
        │
        ▼
Azure Monitor
        │
        ▼
Azure Log Analytics
```

Each stage prepared the foundation for the next one. I intentionally implemented the project incrementally so I could understand every technology before moving forward.

---

# Documents in this Section

| Document                                                      | Description                                           |
| ------------------------------------------------------------- | ----------------------------------------------------- |
| [01-Docker](01-Docker.md)                                     | Containerizing the frontend and backend applications  |
| [02-Azure-Container-Registry](02-Azure-Container-Registry.md) | Storing Docker images in Azure Container Registry     |
| [03-Azure-Kubernetes-Service](03-Azure-Kubernetes-Service.md) | Deploying the application on Azure Kubernetes Service |
| [04-Helm](04-Helm.md)                                         | Managing Kubernetes resources using Helm              |
| [05-GitHub-Actions](05-GitHub-Actions.md)                     | Automating builds using GitHub Actions                |
| [06-Argo-CD](06-Argo-CD.md)                                   | Implementing GitOps using Argo CD                     |
| [07-Prometheus](07-Prometheus.md)                             | Collecting application metrics                        |
| [08-Grafana](08-Grafana.md)                                   | Visualizing application and cluster metrics           |
| [09-Azure-Monitor](09-Azure-Monitor.md)                       | Monitoring Azure infrastructure                       |
| [10-Log-Analytics](10-Log-Analytics.md)                       | Centralized logging and KQL queries                   |

---

# Learning Approach

While working on this project, I followed a simple approach for every technology.

For each implementation, I tried to answer the following questions:

* Why is this tool required?
* Why did I choose this tool over other alternatives?
* How did I implement it?
* What challenges did I face?
* How did I troubleshoot those challenges?
* What did I learn from the implementation?

This helped me understand not only how to use each tool but also why it is used in real-world DevOps environments.

---

# Interview Focus

These documents are written primarily for interview preparation.

Instead of explaining only theoretical concepts, they focus on:

* Practical implementation
* Design decisions
* Commands used
* Challenges faced
* Troubleshooting steps
* Lessons learned
* Common interview questions
* Follow-up questions that interviewers may ask

The intention is to help explain the project confidently during technical interviews.

---

# Next Step

The first implementation in the DevOps journey is **Docker**.

The next document, **01-Docker.md**, explains why Docker was introduced, how the frontend and backend were containerized, how the containers were tested, and what was learned during the implementation.

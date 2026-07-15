# 📖 Project Overview

## Introduction

TicketHub is a cloud-native movie ticket booking application that I built to gain practical experience with modern DevOps practices on Microsoft Azure.

Although the application itself is developed using the MERN stack, the primary focus of this project was **not application development**. My objective was to understand how a real-world application moves from development to production using Docker, Kubernetes, CI/CD, GitOps, and monitoring.

Throughout this project, I implemented an end-to-end DevOps workflow starting from source code management to automated deployment and production monitoring.

---

# Why I Built This Project

During my Azure DevOps learning journey, I realized that understanding individual tools was not enough. I wanted to understand how these tools work together in a real deployment pipeline.

Instead of learning Docker, Kubernetes, GitHub Actions, Helm, or Argo CD separately, I decided to integrate them into a single project.

This project helped me understand the complete software delivery lifecycle and provided hands-on experience with cloud-native application deployment.

---

# Primary Objective

The main objective of this project was to build a production-style deployment pipeline that demonstrates the complete DevOps lifecycle.

The project covers:

* Containerization using Docker
* Container image management using Azure Container Registry (ACR)
* Kubernetes deployment using Azure Kubernetes Service (AKS)
* Continuous Integration using GitHub Actions
* GitOps deployment using Argo CD
* Monitoring using Prometheus and Grafana
* Infrastructure monitoring using Azure Monitor
* Centralized logging using Azure Log Analytics

---

# Why a Movie Ticket Booking Application?

The application itself was chosen only as a sample workload.

The business domain was not the primary focus of this project. Any application could have been used, but a movie ticket booking system provides multiple API endpoints, authentication, CRUD operations, and realistic traffic, making it suitable for demonstrating DevOps concepts.

---

# Technologies Used

| Category                | Technology                     |
| ----------------------- | ------------------------------ |
| Cloud Platform          | Microsoft Azure                |
| Source Control          | Git & GitHub                   |
| Frontend                | React                          |
| Backend                 | Node.js & Express.js           |
| Database                | MongoDB Atlas                  |
| Containerization        | Docker                         |
| Container Registry      | Azure Container Registry (ACR) |
| Container Orchestration | Azure Kubernetes Service (AKS) |
| Package Management      | Helm                           |
| GitOps                  | Argo CD                        |
| CI/CD                   | GitHub Actions                 |
| Monitoring              | Prometheus & Grafana           |
| Cloud Monitoring        | Azure Monitor                  |
| Logging                 | Azure Log Analytics            |

---

# What I Learned

This project gave me practical experience with:

* Building and running Docker containers
* Deploying applications to Kubernetes
* Managing Kubernetes resources using Helm
* Automating deployments using GitHub Actions
* Implementing GitOps using Argo CD
* Monitoring applications with Prometheus and Grafana
* Monitoring Azure infrastructure using Azure Monitor
* Debugging Kubernetes deployments and resolving deployment issues

More importantly, it helped me understand how these tools work together as part of a complete DevOps ecosystem.

---

# Project Scope

The project demonstrates the following areas:

* Cloud-native application deployment
* Containerization
* Kubernetes orchestration
* Continuous Integration
* Continuous Deployment
* GitOps
* Application monitoring
* Infrastructure monitoring
* Centralized logging
* Production-style deployment practices

The focus of the project is on implementing and understanding DevOps concepts rather than developing complex business functionality.

---

# Documents to Read Next

This document provides a high-level introduction to the project.

The next document, **02-System-Architecture.md**, explains how all the major components interact with each other, including the deployment workflow, request flow, and monitoring architecture.

---

# Interview Tips

### If an interviewer asks:

**"Can you briefly explain your project?"**

A good response would be:

> "TicketHub is a cloud-native movie ticket booking application that I used as a platform to learn and implement modern DevOps practices. My primary goal wasn't to build another CRUD application, but to understand the complete software delivery lifecycle. I containerized the application using Docker, deployed it on Azure Kubernetes Service using Helm, automated the build process with GitHub Actions, implemented GitOps using Argo CD, and added monitoring with Prometheus, Grafana, Azure Monitor, and Log Analytics. This project gave me hands-on experience in deploying, automating, monitoring, and troubleshooting applications in a Kubernetes environment."

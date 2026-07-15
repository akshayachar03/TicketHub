# 🔄 Argo CD

## Introduction

After implementing GitHub Actions, my CI pipeline was able to:

* Build Docker images
* Push images to Azure Container Registry (ACR)
* Update the Helm chart with the latest image tag

The next decision was how to deploy those changes to Azure Kubernetes Service (AKS).

One option was to allow GitHub Actions to deploy directly to the Kubernetes cluster.

Instead, I decided to implement **GitOps** using Argo CD.

---

# Why Did I Use Argo CD?

I wanted the Git repository to become the **single source of truth** for my Kubernetes deployments.

Instead of allowing multiple tools or engineers to make direct changes to the cluster, I wanted every deployment to originate from Git.

Argo CD continuously watches the Git repository and compares it with the current state of the Kubernetes cluster.

Whenever a difference is detected, Argo CD automatically synchronizes the cluster to match the Git repository.

---

# Why GitOps?

GitOps provides several advantages over traditional deployment methods.

Some of the benefits are:

* Git becomes the single source of truth.
* Every deployment is version-controlled.
* Rollbacks become much easier.
* Infrastructure changes are traceable.
* No manual deployments to Kubernetes.
* Better consistency across environments.

---

# Why Not Deploy Directly from GitHub Actions?

Deploying directly from GitHub Actions is a common approach.

However, I wanted to separate **Continuous Integration (CI)** from **Continuous Deployment (CD)**.

In my implementation:

GitHub Actions is responsible for:

* Building Docker images
* Pushing images to Azure Container Registry
* Updating the Helm chart

Argo CD is responsible for:

* Monitoring the Git repository
* Detecting changes
* Deploying updates to Kubernetes
* Keeping the cluster synchronized

This separation makes the deployment process cleaner and follows GitOps best practices.

---

# My Implementation

I deployed Argo CD into the Kubernetes cluster.

Then I created an Argo CD Application that pointed to my GitHub repository containing the Helm chart.

Whenever GitHub Actions updated the image tag inside `values.yaml`, Argo CD detected the commit and synchronized the cluster automatically.

This meant I never had to run deployment commands manually after each code change.

---

# GitOps Workflow

```text
Developer Pushes Code

        │

        ▼

GitHub Actions

        │

        ▼

Docker Images Built

        │

        ▼

Images Pushed to ACR

        │

        ▼

Helm values.yaml Updated

        │

        ▼

GitHub Repository

        │

        ▼

Argo CD Detects Change

        │

        ▼

Synchronizes AKS Cluster

        │

        ▼

Application Updated
```

---

# Desired State vs Live State

One of the most important GitOps concepts I learned was the difference between **Desired State** and **Live State**.

### Desired State

The desired state is the configuration stored in the Git repository.

For example:

* Deployment configuration
* Replica count
* Docker image tag
* Service configuration

Git always contains the desired configuration.

---

### Live State

The live state is the actual configuration currently running inside the Kubernetes cluster.

Argo CD continuously compares:

Desired State

↓

Live State

If both are different, Argo CD synchronizes the cluster until they match again.

---

# Automatic Synchronization

I configured Argo CD to automatically synchronize the cluster.

This means:

* No manual deployment commands.
* No manual image updates.
* No manual Kubernetes changes.

Every deployment begins with a Git commit.

---

# Self-Healing

One feature I found particularly interesting was **Self-Healing**.

If someone manually modifies a Kubernetes resource inside the cluster, Argo CD detects that the live state no longer matches Git.

It automatically restores the cluster back to the configuration stored in Git.

This prevents configuration drift.

---

# Benefits I Observed

After implementing Argo CD:

* Deployments became automatic.
* Git became the deployment source.
* No manual Kubernetes deployments.
* Easier rollback using Git history.
* Better visibility into deployment status.

It significantly improved the reliability of the deployment process.

---

# How I Verified the Deployment

After every successful GitHub Actions workflow, I verified:

* New Docker images existed in Azure Container Registry.
* `values.yaml` contained the updated image tag.
* Argo CD detected the repository change.
* Application status changed to **Synced**.
* Application status became **Healthy**.
* The updated version was running in AKS.

---

# Challenges Faced

Initially, understanding GitOps required a different mindset.

I was accustomed to thinking that CI pipelines should deploy applications directly.

Through this implementation, I learned that GitOps separates deployment responsibility from the CI pipeline.

Instead of pushing changes to Kubernetes, GitHub Actions simply updates Git.

Argo CD then continuously reconciles the cluster with the repository.

This architecture is easier to manage and provides better traceability.

---

# What I Learned

Implementing Argo CD helped me understand several important concepts.

* Git should be the single source of truth.
* CI and CD can be independent processes.
* Kubernetes clusters should continuously reconcile with Git.
* Automated synchronization reduces deployment errors.
* Self-healing helps prevent configuration drift.

These concepts were completely new to me before starting this project, and implementing them gave me practical GitOps experience.

---

# Interview Questions

### Why did you use Argo CD?

I used Argo CD to implement GitOps. Instead of deploying directly from GitHub Actions, Argo CD continuously monitors the Git repository and synchronizes the Kubernetes cluster whenever changes are detected.

---

### What is GitOps?

GitOps is a deployment approach where Git serves as the single source of truth for infrastructure and application configuration. Changes are made through Git commits, and a GitOps controller such as Argo CD continuously reconciles the cluster with the repository.

---

### What was GitHub Actions responsible for?

GitHub Actions handled Continuous Integration by building Docker images, pushing them to Azure Container Registry, and updating the Helm chart.

---

### What was Argo CD responsible for?

Argo CD handled Continuous Deployment by monitoring the Git repository and synchronizing the Kubernetes cluster whenever the desired state changed.

---

### What is Self-Healing?

Self-healing is an Argo CD feature that automatically restores Kubernetes resources if they are manually modified and no longer match the configuration stored in Git.

---

# Cross Questions

### Could GitHub Actions replace Argo CD?

Yes.

GitHub Actions can deploy directly to Kubernetes.

However, I intentionally used Argo CD to learn GitOps and to separate CI from CD.

---

### What happens if someone manually changes a Deployment in Kubernetes?

Argo CD detects that the live state differs from the desired state stored in Git.

If automatic synchronization and self-healing are enabled, Argo CD restores the Deployment to match the Git repository.

---

### What happens if Argo CD is unavailable?

The running application continues to serve traffic because Kubernetes keeps the existing workloads running.

However, new Git changes will not be synchronized until Argo CD becomes available again.

---

# Summary

Argo CD transformed the deployment process from a traditional CI/CD pipeline into a GitOps workflow.

Instead of deploying directly from GitHub Actions, every deployment originated from Git, making the deployment process more reliable, traceable, and easier to manage.

This implementation gave me practical experience with one of the most widely adopted GitOps tools used in modern Kubernetes environments.

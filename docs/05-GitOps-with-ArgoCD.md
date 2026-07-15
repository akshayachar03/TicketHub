# 🔄 GitOps with Argo CD

## Introduction

One of the major goals of this project was to implement a modern deployment strategy rather than relying on traditional CI/CD pipelines.

Initially, I considered deploying the application directly from GitHub Actions after building the Docker images.

However, I wanted to understand the GitOps approach, where Git becomes the single source of truth for the Kubernetes cluster.

To achieve this, I implemented **GitOps using Argo CD**.

---

# What is GitOps?

GitOps is a deployment methodology where the desired state of the application and infrastructure is stored in a Git repository.

Instead of manually applying Kubernetes manifests or allowing CI pipelines to deploy directly to the cluster, GitOps continuously compares the Kubernetes cluster with the configuration stored in Git.

If any differences are detected, the cluster is automatically synchronized with the repository.

---

# Why Did I Implement GitOps?

I wanted every deployment to be controlled through Git.

This provides several advantages.

* Every deployment is version-controlled.
* Every change is traceable.
* Rollbacks become easier.
* Manual changes to the cluster are avoided.
* Git becomes the single source of truth.

Instead of remembering deployment commands, I only needed to commit changes to Git.

---

# Traditional Deployment vs GitOps

## Traditional Deployment

In a traditional CI/CD pipeline:

```text
Developer

      │

      ▼

GitHub Actions

      │

      ▼

Deploy Directly to Kubernetes
```

The CI pipeline has direct access to the Kubernetes cluster.

---

## GitOps Deployment

In my project:

```text
Developer

      │

      ▼

GitHub Actions

      │

      ▼

Update Git Repository

      │

      ▼

Argo CD

      │

      ▼

Synchronize AKS Cluster
```

Instead of deploying directly, GitHub Actions updates the Git repository.

Argo CD detects the changes and performs the deployment.

---

# Why Is Git the Single Source of Truth?

One of the most important GitOps principles is that Git should always describe the desired state of the system.

This means:

* Kubernetes manifests are stored in Git.
* Helm configuration is stored in Git.
* Image versions are stored in Git.
* Deployment history is stored in Git.

If someone asks how the cluster should look, the answer is always:

**"Look at the Git repository."**

---

# Desired State vs Live State

Understanding these two concepts was one of the biggest learning outcomes of this project.

## Desired State

The desired state is the configuration stored in Git.

For example:

* Deployment configuration
* Replica count
* Docker image version
* Service configuration

Git always represents the desired state.

---

## Live State

The live state is the current state of the Kubernetes cluster.

If the cluster differs from Git, Argo CD identifies the difference.

---

# Reconciliation

Argo CD continuously performs reconciliation.

The process is simple.

1. Read the Git repository.
2. Read the Kubernetes cluster.
3. Compare both states.
4. Detect differences.
5. Synchronize the cluster.

This process runs continuously.

---

# Automatic Synchronization

I enabled automatic synchronization for the application.

This means:

* No manual deployment commands.
* No manual image updates.
* No manual Kubernetes changes.

Every deployment starts with a Git commit.

---

# Self-Healing

One feature I found particularly useful was self-healing.

Suppose someone manually changes a Deployment inside Kubernetes.

The cluster no longer matches the Git repository.

Argo CD detects this configuration drift and restores the Deployment so that it matches the desired state stored in Git.

This helps maintain consistency across the cluster.

---

# Benefits I Observed

After implementing GitOps, I observed several benefits.

* Automated deployments
* Better deployment visibility
* Easier rollback
* Reduced manual intervention
* Improved deployment consistency
* Version-controlled infrastructure
* Reduced configuration drift

These benefits make GitOps a strong deployment model for Kubernetes applications.

---

# My GitOps Workflow

The deployment workflow in this project is:

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

Images Pushed to Azure Container Registry

        │

        ▼

Helm values.yaml Updated

        │

        ▼

Git Commit

        │

        ▼

Argo CD Detects Changes

        │

        ▼

AKS Cluster Updated
```

This workflow ensures that every deployment is driven by Git.

---

# What I Learned

Implementing GitOps changed the way I think about deployments.

Instead of treating deployment as a manual activity, I learned that deployment should be an automated reconciliation process.

Some important lessons include:

* Git should describe the desired system state.
* Deployments should be repeatable.
* Configuration drift should be avoided.
* Infrastructure should be version-controlled.
* CI and CD should have separate responsibilities.

These concepts were completely new to me before implementing this project.

---

# Best Practices

While implementing GitOps, I followed these practices.

* Store Kubernetes configuration in Git.
* Avoid manual changes to the cluster.
* Keep Git as the source of truth.
* Separate build and deployment responsibilities.
* Verify synchronization after every deployment.

These practices made the deployment process more predictable and easier to manage.

---

# Summary

GitOps was one of the most valuable concepts I learned during this project.

By implementing Argo CD, I transformed a traditional CI/CD pipeline into a GitOps workflow where Git became the single source of truth for the Kubernetes cluster.

This approach improved deployment consistency, reduced manual intervention, and provided a reliable mechanism for managing application deployments on Azure Kubernetes Service.

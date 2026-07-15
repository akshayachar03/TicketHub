# 🚀 CI/CD Pipeline

## Introduction

After implementing Docker, Azure Container Registry (ACR), Azure Kubernetes Service (AKS), Helm, GitHub Actions, and Argo CD, the next objective was to automate the software delivery process.

Instead of manually building Docker images and updating the Kubernetes deployment after every code change, I implemented a Continuous Integration and Continuous Deployment (CI/CD) pipeline.

The pipeline automates the complete workflow from source code changes to application deployment on AKS.

---

# What is CI/CD?

CI/CD stands for:

* **Continuous Integration (CI)** – Automatically build and validate the application whenever code changes are pushed to the repository.
* **Continuous Deployment (CD)** – Automatically deploy the latest version of the application to the Kubernetes cluster.

In my project:

* **GitHub Actions** handles the Continuous Integration (CI) process.
* **Argo CD** handles the Continuous Deployment (CD) process using GitOps.

---

# Why Did I Implement CI/CD?

Initially, every deployment required several manual steps.

For every code change, I had to:

* Build Docker images.
* Push images to Azure Container Registry.
* Update image tags.
* Deploy the updated application.

Although these steps worked, they were repetitive and increased the possibility of human error.

The CI/CD pipeline automated these tasks, making deployments faster, more consistent, and repeatable.

---

# CI/CD Architecture

The complete pipeline followed in this project is shown below.

```text
Developer

      │

      ▼

Git Push

      │

      ▼

GitHub Repository

      │

      ▼

GitHub Actions (CI)

      │

      ├── Checkout Code

      ├── Login to Azure

      ├── Build Docker Images

      ├── Push Images to ACR

      ├── Update Helm values.yaml

      └── Commit Changes

      │

      ▼

GitHub Repository

      │

      ▼

Argo CD (CD)

      │

      ▼

Azure Kubernetes Service

      │

      ▼

Running Application
```

---

# Continuous Integration (CI)

The CI stage begins whenever new code is pushed to the GitHub repository.

The GitHub Actions workflow automatically performs the following tasks:

1. Downloads the latest source code.
2. Authenticates with Azure.
3. Builds Docker images for the frontend and backend.
4. Pushes the images to Azure Container Registry.
5. Updates the image tag in the Helm chart.
6. Commits the updated configuration back to GitHub.

The CI pipeline ends after these steps are completed successfully.

---

# Continuous Deployment (CD)

Deployment is handled separately using Argo CD.

After GitHub Actions updates the Helm configuration, Argo CD detects the change in the Git repository.

It then:

* Compares the Git repository with the Kubernetes cluster.
* Detects configuration differences.
* Synchronizes the cluster.
* Performs a rolling update.
* Brings the cluster to the desired state.

This approach follows GitOps principles.

---

# Image Versioning

Every deployment should uniquely identify the application version.

For this reason, Docker images are tagged using the Git commit SHA.

Example:

```text
tickethub-backend:ba40378b5398baaa3e432df584e24b61cb759b01
```

Using commit-based image tags provides:

* Traceability
* Easier debugging
* Safer deployments
* Simpler rollbacks

---

# Why Separate CI and CD?

One important design decision was separating the build process from the deployment process.

GitHub Actions is responsible for:

* Building images
* Publishing images
* Updating Git

Argo CD is responsible for:

* Watching Git
* Deploying changes
* Synchronizing Kubernetes

This separation reduces complexity and follows GitOps best practices.

---

# Benefits of the Pipeline

Implementing CI/CD provided several benefits.

* Automated deployments
* Consistent build process
* Reduced manual effort
* Faster releases
* Better version control
* Improved deployment reliability
* Easier rollback using Git history
* Better collaboration

---

# How I Verified the Pipeline

After every code change, I verified:

* GitHub Actions workflow completed successfully.
* Docker images were created.
* Images were pushed to Azure Container Registry.
* Helm values were updated.
* Argo CD detected the repository changes.
* Kubernetes synchronized successfully.
* The latest application version was running on AKS.

---

# Challenges Faced

During implementation, I learned that a successful CI/CD pipeline depends on every stage working correctly.

Some important areas I had to verify included:

* Azure authentication.
* Docker image creation.
* Image tagging.
* GitHub Secrets.
* Helm configuration updates.
* Argo CD synchronization.

By validating each stage individually, I was able to identify and resolve issues much more quickly.

---

# What I Learned

This project helped me understand that CI/CD is much more than automating deployments.

A well-designed pipeline should:

* Be repeatable.
* Be reliable.
* Be version-controlled.
* Minimize manual intervention.
* Integrate smoothly with Kubernetes and GitOps.

Implementing the pipeline gave me practical experience with the complete software delivery lifecycle.

---

# Summary

The CI/CD pipeline automated the entire deployment workflow for the TicketHub project.

GitHub Actions handled the Continuous Integration process by building and publishing Docker images, while Argo CD handled Continuous Deployment by synchronizing the Kubernetes cluster with the Git repository.

This implementation significantly reduced manual deployment effort and established a reliable, production-style deployment process.

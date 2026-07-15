# 🚀 GitHub Actions

## Introduction

After successfully deploying the application to Azure Kubernetes Service (AKS), I realized that building Docker images and pushing them to Azure Container Registry (ACR) manually after every code change was repetitive and time-consuming.

A typical deployment required me to:

* Build the frontend Docker image.
* Build the backend Docker image.
* Tag both images.
* Push both images to Azure Container Registry.
* Update the Helm chart with the latest image tags.
* Deploy the updated application.

Although these steps were straightforward, repeating them for every change increased the chances of human error.

To automate this process, I implemented **GitHub Actions**.

---

# Why Did I Choose GitHub Actions?

The source code for this project is hosted on GitHub.

Using GitHub Actions allowed me to automate the build process without installing or maintaining a separate CI server.

Some advantages were:

* Native integration with GitHub
* Workflow files stored with the source code
* Automatic execution on every push
* Easy integration with Azure services
* No additional infrastructure to manage

---

# Why Not Jenkins?

Jenkins is one of the most widely used CI/CD tools and is commonly used in enterprise environments.

However, for this project, GitHub Actions was a better choice because:

* My repository was already hosted on GitHub.
* GitHub provides hosted runners.
* Workflow setup was simpler.
* No Jenkins server installation or maintenance was required.

If this project were running in an enterprise environment with multiple repositories and complex pipelines, Jenkins would also be a strong option.

---

# My Implementation

The GitHub Actions workflow performs the following tasks automatically whenever code is pushed to the repository.

1. Checkout the latest source code.
2. Authenticate with Azure.
3. Build the frontend Docker image.
4. Build the backend Docker image.
5. Push both images to Azure Container Registry.
6. Update the image tag in the Helm chart.
7. Commit the updated Helm configuration back to GitHub.

At this stage, the deployment itself was not performed by GitHub Actions.

Instead, Argo CD detected the updated Helm configuration and synchronized the Kubernetes cluster.

This separation kept the CI and CD responsibilities independent.

---

# CI Workflow

The workflow followed in this project is shown below.

```text
Developer Pushes Code

        │

        ▼

GitHub Repository

        │

        ▼

GitHub Actions

        │

        ├── Checkout Source Code

        ├── Login to Azure

        ├── Build Backend Image

        ├── Build Frontend Image

        ├── Push Images to ACR

        ├── Update Helm values.yaml

        └── Commit Changes

        │

        ▼

GitHub Repository
```

---

# Why Separate CI and CD?

One important design decision was separating Continuous Integration from Continuous Deployment.

GitHub Actions was responsible only for:

* Building the application
* Publishing Docker images
* Updating deployment configuration

Deployment to Kubernetes was handled separately by Argo CD.

This follows the GitOps principle where Git remains the single source of truth.

---

# GitHub Secrets

To authenticate with Azure securely, sensitive information was stored as GitHub Secrets.

Examples include:

* Azure Credentials
* Azure Client ID
* Azure Tenant ID
* Azure Subscription ID
* Azure Container Registry credentials

Using GitHub Secrets prevented sensitive information from being stored in the repository.

---

# Image Versioning

Instead of using only the `latest` tag, the project also used Git commit SHAs for image versioning.

Example:

```text
tickethub-backend:ba40378b5398baaa3e432df584e24b61cb759b01

tickethub-frontend:ba40378b5398baaa3e432df584e24b61cb759b01
```

This provided:

* Better traceability
* Easy rollback
* Unique image versions
* Clear mapping between source code and deployed application

---

# How I Verified the Workflow

After every push, I verified:

* Workflow started automatically.
* Docker images were built successfully.
* Images were pushed to Azure Container Registry.
* Helm `values.yaml` was updated.
* A new commit was created automatically.
* Argo CD detected the change.

Only after these checks did I consider the CI pipeline successful.

---

# Challenges Faced

Implementing GitHub Actions helped me understand how CI pipelines work in practice.

Some areas that required attention included:

* Authenticating with Azure securely.
* Managing GitHub Secrets.
* Updating Helm values automatically.
* Understanding the relationship between CI and GitOps.

The biggest realization was that GitHub Actions was **not responsible for deploying to Kubernetes**. Its responsibility ended after publishing images and updating the Git repository.

---

# What I Learned

This implementation taught me several important DevOps concepts.

* CI should automate repetitive tasks.
* Build pipelines should remain deterministic and repeatable.
* Secrets should never be stored in source code.
* Image versioning is critical for traceability.
* CI and CD can be implemented as separate stages.

---

# Interview Questions

### Why did you use GitHub Actions?

I used GitHub Actions because my project was already hosted on GitHub. It integrates directly with the repository, provides hosted runners, and allowed me to automate Docker builds and image publishing without managing a separate CI server.

---

### What was GitHub Actions responsible for in your project?

GitHub Actions performed the Continuous Integration part of the pipeline. It built Docker images, pushed them to Azure Container Registry, updated the Helm image tags, and committed those changes back to GitHub.

---

### Did GitHub Actions deploy the application?

No.

GitHub Actions stopped after updating the Git repository. Argo CD detected the updated Helm configuration and deployed the application to Azure Kubernetes Service.

---

### Why did you separate CI and CD?

Separating CI and CD follows GitOps principles. GitHub Actions focuses on building and publishing artifacts, while Argo CD continuously synchronizes the Kubernetes cluster with the desired state stored in Git.

---

# Cross Questions

### Why didn't you deploy directly from GitHub Actions?

Direct deployment is possible, but I wanted to implement GitOps. By allowing Argo CD to perform deployments, Git became the single source of truth, making deployments easier to audit, reproduce, and roll back.

---

### What happens if the Docker image build fails?

The workflow stops immediately, and the remaining steps are not executed. Since the image is never pushed and the Helm chart is not updated, Argo CD has no new deployment to synchronize.

---

### Why use Git commit SHA instead of only the `latest` tag?

The `latest` tag always points to the most recent image, making it difficult to identify which version is deployed. Using the Git commit SHA creates a unique, immutable image tag that makes deployments traceable and simplifies rollbacks.

---

# Summary

GitHub Actions automated the Continuous Integration process by building Docker images, publishing them to Azure Container Registry, and updating the Helm configuration.

Instead of deploying directly to Kubernetes, the workflow handed control to Argo CD, allowing the project to follow a GitOps-based deployment strategy.

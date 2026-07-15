# 📦 Azure Container Registry (ACR)

## Introduction

After successfully containerizing the frontend and backend applications, the next challenge was deciding where to store the Docker images.

Building Docker images locally is useful during development, but Kubernetes cannot access images stored only on my laptop. The images needed to be stored in a container registry that could be accessed by Azure Kubernetes Service (AKS).

To solve this, I used **Azure Container Registry (ACR)**.

---

# Why Do We Need a Container Registry?

Once Docker images are built, they need to be stored in a central location so they can be downloaded whenever required.

Without a container registry:

* Docker images remain only on the local machine.
* Kubernetes cannot pull the images.
* CI/CD pipelines cannot publish application images.
* Sharing images between environments becomes difficult.

A container registry acts as a central repository for storing and managing Docker images.

---

# Why Did I Choose Azure Container Registry?

Since the project was deployed on Microsoft Azure, I selected **Azure Container Registry (ACR)**.

The main reasons were:

* Native integration with Azure Kubernetes Service.
* Secure image storage.
* Private container registry.
* Easy authentication using Azure CLI.
* Seamless integration with GitHub Actions.
* Better management within the Azure ecosystem.

Using ACR simplified image management throughout the project.

---

# Why Not Docker Hub?

Docker Hub is one of the most popular container registries and could also have been used.

However, I chose Azure Container Registry because:

| Docker Hub                         | Azure Container Registry        |
| ---------------------------------- | ------------------------------- |
| General-purpose container registry | Azure-native container registry |
| Public repositories by default     | Private repositories by default |
| Requires Docker Hub authentication | Integrates directly with Azure  |
| Rate limits may apply              | No Docker Hub pull rate limits  |
| External to Azure                  | Part of the Azure ecosystem     |

Since my Kubernetes cluster was running on Azure, using ACR made the deployment process simpler and more secure.

---

# My Implementation

The implementation followed these steps.

1. Created an Azure Container Registry.
2. Logged in to the registry.
3. Tagged the Docker images.
4. Pushed the frontend image.
5. Pushed the backend image.
6. Verified that the images were successfully uploaded.
7. Configured GitHub Actions to push images automatically.

Initially, image pushes were performed manually to understand the workflow. Later, this process was fully automated using GitHub Actions.

---

# Workflow

The image publishing process was:

```text
Docker Build

      │

      ▼

Docker Image

      │

      ▼

Azure Container Registry

      │

      ▼

Azure Kubernetes Service
```

The Kubernetes cluster later pulled these images directly from ACR.

---

# Commands Used

## Login to Azure

```bash
az login
```

Authenticates with the Azure subscription.

---

## Login to Azure Container Registry

```bash
az acr login --name <acr-name>
```

Allows Docker to push images to ACR.

---

## List Azure Container Registries

```bash
az acr list --output table
```

Displays all available Azure Container Registries.

---

## Tag Backend Image

```bash
docker tag tickethub-backend <acr-name>.azurecr.io/tickethub-backend:latest
```

Creates an ACR-compatible image tag.

---

## Tag Frontend Image

```bash
docker tag tickethub-frontend <acr-name>.azurecr.io/tickethub-frontend:latest
```

---

## Push Backend Image

```bash
docker push <acr-name>.azurecr.io/tickethub-backend:latest
```

Uploads the backend image to Azure Container Registry.

---

## Push Frontend Image

```bash
docker push <acr-name>.azurecr.io/tickethub-frontend:latest
```

Uploads the frontend image to Azure Container Registry.

---

# How I Verified the Images

After pushing the images, I verified:

* The images appeared inside Azure Container Registry.
* Image names were correct.
* Image tags were correct.
* Both frontend and backend repositories were available.

Only after verification did I proceed with Kubernetes deployment.

---

# Challenges Faced

While implementing ACR, I gained experience with:

* Docker image tagging.
* Understanding repository naming conventions.
* Authenticating Docker with Azure.
* Managing image versions.

Later, when GitHub Actions was introduced, image publishing became fully automated.

---

# What I Learned

This stage helped me understand:

* Docker images should be stored in a central registry.
* Kubernetes pulls images from a registry rather than a developer's local machine.
* Image tagging is important for version management.
* Azure Container Registry integrates smoothly with Azure Kubernetes Service.

---

# Interview Questions

### Why did you use Azure Container Registry?

I used Azure Container Registry because the application was deployed on Azure Kubernetes Service. ACR integrates directly with AKS, provides private image storage, and simplifies image management within the Azure ecosystem.

---

### Why is a container registry required?

A container registry stores Docker images in a central location so that Kubernetes clusters, CI/CD pipelines, and developers can access the same image consistently.

---

### Could Kubernetes pull images directly from your laptop?

No. Kubernetes requires container images to be available in an accessible registry. Images stored only on a local machine cannot be pulled by an AKS cluster.

---

# Cross Questions

### Could you have used Docker Hub?

Yes. Docker Hub is a valid option and is widely used. However, because my infrastructure was hosted on Azure, Azure Container Registry provided better integration, private repositories by default, and a smoother deployment workflow.

---

### Why did you initially push images manually instead of using GitHub Actions?

I wanted to understand the complete image publishing process before automating it. Once I was comfortable with manual builds and pushes, I automated the process using GitHub Actions.

---

### Why is image tagging important?

Image tags identify specific versions of an application. Proper tagging allows deployments to use the correct version and makes rollbacks easier if an issue occurs.

---

# Summary

Azure Container Registry became the central repository for storing the frontend and backend Docker images.

Instead of relying on locally built images, the Kubernetes cluster pulled images directly from ACR, making deployments consistent and enabling CI/CD automation in the later stages of the project.

# 🐳 Docker Implementation

## Introduction

After completing the frontend and backend development, the application was running successfully in my local environment. However, running the application locally was only the first step.

My next objective was to prepare the application for deployment to Azure Kubernetes Service (AKS). Since Kubernetes deploys containers rather than source code, the application first needed to be containerized.

This is where Docker became an essential part of the project.

---

# Why Did I Use Docker?

Initially, the application depended on my local development environment.

For example, it required:

* A specific Node.js version
* npm dependencies
* Environment variables
* Local configuration

If another developer tried to run the application, they would first need to configure their environment correctly. Even a small difference in Node.js versions or dependencies could cause unexpected issues.

Docker solved this problem by packaging the application together with everything required to run it.

Instead of deploying source code, I could now deploy a Docker image.

---

# Why Docker?

I selected Docker because it provides several advantages.

* Creates a consistent runtime environment.
* Eliminates "it works on my machine" problems.
* Makes the application portable.
* Simplifies deployments.
* Integrates seamlessly with Kubernetes.
* Standard tool used in modern DevOps environments.

Docker became the foundation for the remaining stages of the project.

---

# What Did I Containerize?

I created separate Docker images for both applications.

## Frontend

The frontend React application was containerized independently.

Responsibilities:

* Serve the React application.
* Handle user interactions.
* Communicate with the backend API.

---

## Backend

The backend Express.js application was also containerized separately.

Responsibilities:

* Authentication
* Business logic
* Database communication
* Booking APIs
* Movie APIs
* Theater APIs
* Prometheus metrics endpoint

Keeping the frontend and backend separate allows them to be deployed and updated independently.

---

# Project Structure

The project contains two Dockerfiles.

```text
TicketHub/

├── client/
│   └── Dockerfile
│
└── server/
    └── Dockerfile
```

Each application has its own Docker image.

---

# Docker Workflow

The workflow followed during this stage was:

```text
Application Source Code

        │

        ▼

Dockerfile

        │

        ▼

Docker Image

        │

        ▼

Local Testing

        │

        ▼

Azure Container Registry
```

---

# Docker Images Created

After building the application, two images were available.

* tickethub-frontend
* tickethub-backend

These images were later pushed to Azure Container Registry.

---

# Commands Used

## Build Backend Image

```bash
docker build -t tickethub-backend .
```

This command builds the backend Docker image.

---

## Build Frontend Image

```bash
docker build -t tickethub-frontend .
```

This command builds the frontend Docker image.

---

## Verify Images

```bash
docker images
```

Used to verify that the images were created successfully.

---

## Run Backend Container

```bash
docker run -p 5000:5000 tickethub-backend
```

This allowed me to verify that the backend application worked correctly inside a container.

---

## Run Frontend Container

```bash
docker run -p 3000:80 tickethub-frontend
```

This allowed me to verify that the frontend application loaded correctly from the container.

---

# How I Verified Docker

Before moving to Kubernetes, I verified the following.

### Backend

* Application started successfully.
* Database connection worked.
* APIs responded correctly.
* Health endpoint returned a successful response.
* No container startup errors.

### Frontend

* React application loaded correctly.
* API communication worked.
* Static files were served successfully.

Only after confirming both containers worked correctly did I move to the next stage.

---

# Challenges Faced

Docker was my first step into containerization, so I spent time understanding how images and containers work.

Some areas that required additional learning included:

* Writing Dockerfiles correctly.
* Managing application dependencies inside containers.
* Testing applications inside containers.
* Understanding the difference between Docker images and running containers.

Although these were learning challenges rather than production issues, they helped build the foundation for Kubernetes deployment.

More complex issues encountered later in the project are documented in the **Troubleshooting Guide**.

---

# What I Learned

This stage helped me understand several important concepts.

* Docker packages applications together with their dependencies.
* A Docker image is immutable once built.
* Containers provide a consistent runtime environment.
* Docker images can be reused across different environments.
* Kubernetes deploys Docker images rather than application source code.

Containerization was the first major step toward building a cloud-native deployment pipeline.

---

# Interview Questions

### Why did you use Docker in this project?

I used Docker to package both the frontend and backend applications into portable container images. This ensured that the application behaved consistently across my local environment and Azure Kubernetes Service.

---

### Why did you create separate Docker images?

The frontend and backend have different responsibilities and deployment lifecycles. Keeping them in separate images allows them to be updated, deployed, and scaled independently.

---

### Why is Docker required before Kubernetes?

Kubernetes manages containers, not source code. Docker provides the container images that Kubernetes deploys and orchestrates.

---

# Cross Questions

### Could this application run without Docker?

Yes. The application can run directly using Node.js and npm. However, deploying applications this way introduces dependency and environment management challenges. Docker provides a standardized deployment unit that works consistently across environments.

---

### Why didn't you combine the frontend and backend into a single container?

Keeping them separate improves maintainability and scalability. For example, if only the frontend changes, I can deploy a new frontend image without rebuilding or redeploying the backend.

---

# Summary

Docker was the first DevOps technology introduced into the project.

By containerizing both applications, I created a consistent deployment unit that could later be stored in Azure Container Registry and deployed to Azure Kubernetes Service.

This stage laid the foundation for the remaining DevOps implementation.

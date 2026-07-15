# ⛵ Helm

## Introduction

After successfully deploying the application to Azure Kubernetes Service (AKS), I was managing the deployment using individual Kubernetes YAML files.

Initially, this approach worked because the project was small. However, as the project grew, the number of Kubernetes resources also increased.

For example, I had separate YAML files for:

* Deployment
* Service
* Ingress
* ConfigMap
* Secret
* ServiceMonitor

Managing each file individually became repetitive and difficult.

To simplify deployment and make the project easier to maintain, I decided to use **Helm**.

---

# Why Did I Use Helm?

The primary reason for introducing Helm was to simplify Kubernetes deployments.

Instead of maintaining multiple YAML files with repeated values, Helm allowed me to create reusable templates and centralize configuration.

This made deployments:

* Easier to manage
* Easier to update
* Easier to maintain
* More suitable for different environments

---

# Why Not Continue with Plain Kubernetes YAML Files?

Using plain YAML files works well for small applications.

However, as the number of Kubernetes resources increases, maintaining them becomes challenging.

Some of the issues I wanted to avoid were:

* Duplicate configuration values
* Manual image tag updates
* Multiple files requiring the same changes
* Difficult deployments across different environments

Helm solved these problems by introducing templating.

---

# My Implementation

I created a Helm chart for the TicketHub application.

The chart included templates for all required Kubernetes resources.

The structure looked similar to this:

```text id="r2v8b6"
helm/

└── tickethub/

    ├── Chart.yaml

    ├── values.yaml

    └── templates/

        ├── backend-deployment.yaml

        ├── backend-service.yaml

        ├── frontend-deployment.yaml

        ├── frontend-service.yaml

        ├── ingress.yaml

        ├── configmap.yaml

        ├── secret.yaml

        └── servicemonitor.yaml
```

The `values.yaml` file became the central location for configuration values.

---

# Why values.yaml?

Instead of hardcoding values inside every Kubernetes manifest, I stored configurable values in `values.yaml`.

Examples include:

* Image name
* Image tag
* Replica count
* Service port
* Namespace

This allowed me to update configuration from a single file.

---

# How Helm Improved My Deployment

Before Helm:

* Multiple YAML files
* Repeated values
* Manual updates
* Higher chance of mistakes

After Helm:

* Reusable templates
* Centralized configuration
* Easier maintenance
* Cleaner project structure
* Better integration with GitHub Actions

---

# Commands Used

## Create a Helm Chart

```bash id="m7v3ah"
helm create tickethub
```

Creates a new Helm chart with the default structure.

---

## Validate the Chart

```bash id="6v7t5q"
helm lint ./helm/tickethub
```

Checks the chart for syntax and configuration errors.

---

## Render Kubernetes Manifests

```bash id="0m9sd7"
helm template tickethub ./helm/tickethub
```

Displays the generated Kubernetes manifests without deploying them.

This command was useful for verifying template changes.

---

## Install the Chart

```bash id="3v31bc"
helm install tickethub ./helm/tickethub
```

Deploys the application to the Kubernetes cluster.

---

## Upgrade the Deployment

```bash id="stjx4r"
helm upgrade tickethub ./helm/tickethub
```

Applies changes without reinstalling the application.

---

## List Releases

```bash id="2v98dw"
helm list
```

Displays installed Helm releases.

---

# How I Verified the Deployment

After deploying with Helm, I verified:

* Helm chart installed successfully.
* Pods started correctly.
* Services were created.
* Ingress worked correctly.
* Application was accessible.
* No template rendering errors.

---

# Challenges Faced

One challenge I encountered was converting existing Kubernetes YAML files into reusable Helm templates.

Initially, I needed to understand:

* Template variables
* Helm syntax
* The purpose of `values.yaml`
* How template rendering works

After implementing the chart, updating Kubernetes resources became much easier because most configuration changes required modifying only `values.yaml`.

---

# What I Learned

Helm helped me understand that Kubernetes deployments should be treated as reusable packages rather than a collection of individual YAML files.

Some key lessons were:

* Templates reduce duplication.
* Configuration should be centralized.
* Helm simplifies application upgrades.
* Managing multiple environments becomes easier.

It also prepared the project for GitHub Actions and GitOps automation.

---

# Interview Questions

### Why did you use Helm?

I used Helm because managing multiple Kubernetes YAML files became difficult as the project grew. Helm allowed me to create reusable templates and centralize configuration using `values.yaml`.

---

### What is the purpose of values.yaml?

The `values.yaml` file stores configurable values such as image names, tags, replica counts, namespaces, and ports. This avoids hardcoding configuration in multiple template files.

---

### Why use helm upgrade instead of deleting and redeploying?

`helm upgrade` updates only the changed resources while preserving the release history. It provides a safer and more efficient deployment process.

---

### How did Helm help your CI/CD pipeline?

GitHub Actions updated only the image tag inside `values.yaml`. Helm then used the updated value during deployment, eliminating the need to modify multiple Kubernetes manifests.

---

# Cross Questions

### Could you have completed the project without Helm?

Yes.

The application can be deployed using plain Kubernetes YAML files. In fact, I initially started that way. However, Helm significantly improved maintainability, reduced duplication, and made future deployments much easier.

---

### Why didn't you use Kustomize instead of Helm?

Kustomize is a good option for customizing Kubernetes manifests, but I selected Helm because it provides templating, package management, release management, and integrates well with GitOps workflows using Argo CD.

---

### What happens if values.yaml contains an incorrect image tag?

Helm will generate manifests using that value, but Kubernetes will fail to pull the image if it does not exist in Azure Container Registry. The Pods will remain in an `ImagePullBackOff` state until the issue is corrected.

---

# Summary

Helm simplified the deployment of the TicketHub application by converting multiple Kubernetes YAML files into reusable templates.

By centralizing configuration in `values.yaml`, deployments became easier to maintain, easier to automate, and better suited for CI/CD and GitOps workflows.

The next step was to automate the build process using **GitHub Actions**, eliminating manual Docker builds and image pushes.

# 🛠️ TicketHub DevOps Troubleshooting Guide

---

# Troubleshooting Philosophy

One of the biggest lessons I learned during this project is that troubleshooting should always be systematic.

Whenever I encountered an issue, I avoided changing multiple configurations at the same time. Instead, I isolated each layer of the application and verified it before moving to the next.

## Debugging Flow

```text
Browser
↓
Frontend
↓
Backend API
↓
Docker
↓
Azure Container Registry
↓
Azure Kubernetes Service
↓
Helm
↓
GitHub Actions
↓
Argo CD
↓
Prometheus
↓
Grafana
↓
Azure Monitor
↓
Log Analytics
```

For every issue I followed the same approach:

1. Understand the error.
2. Reproduce the issue.
3. Verify the current configuration.
4. Identify the root cause.
5. Apply the smallest possible fix.
6. Verify the solution.
7. Continue to the next layer.

---

# Docker & Local Environment

## Issue 1 – `/metrics` Endpoint Returned 404

### What was the issue?

After integrating Prometheus, accessing `http://localhost:5000/metrics` returned **Route not found** instead of Prometheus metrics.

### What was the root cause?

Another Node.js process was already running on port **5000**. My requests were reaching the old process instead of the updated backend.

### What was the solution?

I temporarily started the backend on port **5001**, verified the endpoint, stopped the old process, and restarted the updated backend on port **5000**.

### What did I do?

- Verified `prom-client` was installed.
- Checked that the `/metrics` route existed.
- Started the backend on port **5001**.
- Verified `/metrics` using `curl`.
- Stopped the old Node.js process.
- Restarted the backend.
- Confirmed Prometheus metrics were displayed.

### Commands Used

```bash
curl http://localhost:5001/metrics
```

### Lesson Learned

Always verify that requests are reaching the correct application process before modifying code.

---

## Issue 2 – Port 5000 Already in Use

### What was the issue?

While running:

```bash
kubectl port-forward svc/tickethub-backend-service 5000:5000
```

I received:

```text
Unable to listen on port 5000
address already in use
```

### What was the root cause?

The backend application was already running locally on port **5000**.

### What was the solution?

I stopped trying to use port forwarding and continued using the already running backend.

### What did I do?

- Read the error carefully.
- Verified the backend was already running.
- Confirmed the application was accessible.
- Cancelled the unnecessary port-forward command.

### Commands Used

```bash
kubectl port-forward svc/tickethub-backend-service 5000:5000
```

### Lesson Learned

Always verify whether a port is already occupied before using `kubectl port-forward`.

---

# Azure Container Registry (ACR)

## Verification 1 – Docker Images Built Successfully

### What was the issue?

Before deployment, I needed to verify that both frontend and backend Docker images had been built successfully.

### What was the root cause?

There was no issue. This was a validation step to prevent deployment failures later.

### What was the solution?

I verified that both Docker images existed locally before pushing them to Azure Container Registry.

### What did I do?

- Listed all Docker images.
- Verified frontend and backend images.
- Confirmed image tags.

### Commands Used

```bash
docker images
```

### Lesson Learned

Always verify Docker images before pushing them to a registry.

---

## Verification 2 – Images Successfully Pushed to Azure Container Registry

### What was the issue?

Before Kubernetes deployment, I needed to ensure that the latest images were available in Azure Container Registry.

### What was the root cause?

There was no issue. This was a validation step to ensure Kubernetes could pull the required images.

### What was the solution?

I verified the repositories and image tags inside Azure Container Registry.

### What did I do?

- Logged into Azure Container Registry.
- Verified repositories.
- Checked the latest image tags.
- Continued with Kubernetes deployment.

### Commands Used

```bash
az acr list
az acr repository list --name <acr-name>
az acr repository show-tags --name <acr-name> --repository tickethub-backend
```
---

# Azure Kubernetes Service (AKS)

## Issue 1 – Backend Pod Entered CrashLoopBackOff

### What was the issue?

After deploying the backend application to AKS, the backend Pod failed to start correctly and entered the **CrashLoopBackOff** state. Kubernetes repeatedly attempted to restart the container.

### What was the root cause?

The backend container was failing during startup because the application configuration was not correct during deployment. Since the application exited immediately, Kubernetes continuously restarted the Pod.

### What was the solution?

I inspected the Pod logs, identified the startup problem, corrected the configuration, and redeployed the application.

### What did I do?

- Checked the Pod status.
- Described the Pod to inspect events.
- Viewed the container logs.
- Fixed the application configuration.
- Redeployed the application.
- Verified the Pod reached the **Running** state.

### Commands Used

```bash
kubectl get pods -n tickethub
kubectl describe pod <pod-name> -n tickethub
kubectl logs <pod-name> -n tickethub
```

### Lesson Learned

Whenever a Pod enters **CrashLoopBackOff**, the first place to investigate is the container logs.

---

## Issue 2 – Verify Deployment Rollout

### What was the issue?

After applying Kubernetes manifests, I needed to ensure that the Deployment completed successfully instead of assuming it had worked.

### What was the root cause?

There was no deployment failure, but skipping rollout verification could hide failed updates.

### What was the solution?

I always verified the rollout status after every deployment.

### What did I do?

- Applied the updated manifests.
- Waited for the rollout to finish.
- Confirmed Kubernetes reported a successful rollout.

### Commands Used

```bash
kubectl rollout status deployment/tickethub-backend -n tickethub
kubectl rollout status deployment/tickethub-frontend -n tickethub
```

### Lesson Learned

A successful `kubectl apply` does not guarantee a successful deployment.

---

## Issue 3 – Backend Service Missing Labels

### What was the issue?

Prometheus could not discover the backend Service even though the backend Pod was running correctly.

### What was the root cause?

The Kubernetes Service did not contain the labels expected by the ServiceMonitor.

### What was the solution?

I updated the Service manifest with the required labels and redeployed it.

### What did I do?

- Displayed the Service labels.
- Compared them with the ServiceMonitor selector.
- Added the missing label.
- Applied the updated Service manifest.
- Verified the labels.

### Commands Used

```bash
kubectl get svc tickethub-backend-service --show-labels -n tickethub
kubectl apply -f backend-service.yaml
```

### Lesson Learned

Labels are essential for Kubernetes resource discovery.

---

## Verification 1 – Pod Verification

### What was the issue?

Before moving to the next deployment stage, I needed to verify that all Pods were healthy.

### What was the solution?

I checked the status of every Pod after each deployment.

### What did I do?

- Verified Pod status.
- Confirmed all Pods were in the **Running** state.
- Ensured there were no restart loops.

### Commands Used

```bash
kubectl get pods -n tickethub
```

### Lesson Learned

Always verify Pod health before troubleshooting higher-level components.

---

## Verification 2 – Deployment Verification

### What was the issue?

I needed to confirm that the expected number of replicas had been created.

### What was the solution?

I checked all Deployments after each rollout.

### What did I do?

- Listed all Deployments.
- Verified READY replicas.
- Confirmed AVAILABLE replicas matched the desired count.

### Commands Used

```bash
kubectl get deployments -n tickethub
```

### Lesson Learned

Pods may exist, but the Deployment is the source of truth for application state.

---

## Verification 3 – Service Verification

### What was the issue?

The frontend and backend communicate through Kubernetes Services. I needed to ensure they were created correctly.

### What was the solution?

I verified all Services after deployment.

### What did I do?

- Listed Services.
- Verified ClusterIP assignment.
- Confirmed expected ports.

### Commands Used

```bash
kubectl get svc -n tickethub
```

### Lesson Learned

Always verify Services before troubleshooting networking issues.

---

# Helm

## Verification 1 – Validate Helm Templates

### What was the issue?

Before deploying with Helm, I wanted to ensure that the generated Kubernetes manifests were valid.

### What was the solution?

I rendered the templates locally before deployment.

### What did I do?

- Rendered the chart.
- Reviewed the generated manifests.
- Fixed any template issues before deployment.

### Commands Used

```bash
helm template tickethub ./helm/tickethub
```

### Lesson Learned

Rendering templates locally helps catch errors before they reach the cluster.

---

## Verification 2 – Helm Chart Validation

### What was the issue?

I needed to validate the Helm chart structure and configuration.

### What was the solution?

I used Helm's built-in linting before deployment.

### What did I do?

- Ran Helm lint.
- Fixed any warnings.
- Continued with deployment only after validation succeeded.

### Commands Used

```bash
helm lint ./helm/tickethub
```

### Lesson Learned

Running `helm lint` before deployment helps detect common chart issues early.

---

# Part 2 Summary

This phase focused on validating Kubernetes resources and Helm deployments.

By verifying Pods, Deployments, Services, rollouts, and Helm templates at every stage, I reduced deployment failures and made troubleshooting much more systematic.
### Lesson Learned

Always confirm that images exist in Azure Container Registry before troubleshooting Kubernetes deployments.

---

# GitHub Actions

## Verification 1 – Workflow Execution

### What was the issue?

After pushing code, I needed to confirm that the GitHub Actions workflow executed successfully before checking Kubernetes.

### What was the root cause?

There was no failure, but if the workflow failed, no Docker image would be built or pushed.

### What was the solution?

I verified every stage of the workflow before moving to Argo CD.

### What did I do?

- Opened the GitHub Actions workflow.
- Verified each job completed successfully.
- Confirmed there were no failed steps.
- Reviewed workflow logs.

### Commands Used

No CLI command. Verification was performed from the GitHub Actions UI.

### Lesson Learned

Never troubleshoot Kubernetes until the CI pipeline completes successfully.

---

## Verification 2 – Docker Image Build

### What was the issue?

I needed to ensure new Docker images were created after every code change.

### What was the root cause?

If image creation failed, the deployment would continue using an older image.

### What was the solution?

Verified the build stage completed successfully.

### What did I do?

- Checked build logs.
- Confirmed frontend image built.
- Confirmed backend image built.
- Verified image tags.

### Lesson Learned

Every deployment should produce a new image version.

---

## Verification 3 – Docker Image Push to ACR

### What was the issue?

Images must exist in Azure Container Registry before Kubernetes can pull them.

### What was the root cause?

If image push fails, Argo CD deploys a non-existent image.

### What was the solution?

Verified the push stage completed successfully.

### What did I do?

- Reviewed push logs.
- Confirmed ACR authentication.
- Verified image push completed.

### Lesson Learned

Always confirm image push before troubleshooting Kubernetes.

---

## Verification 4 – Helm Values Updated

### What was the issue?

The CI pipeline updates the image tag inside Helm values.

### What was the root cause?

If values.yaml is not updated, Argo CD detects no change.

### What was the solution?

Verified the workflow committed the updated image tag.

### What did I do?

- Checked workflow logs.
- Opened the Git repository.
- Verified the updated image tag.
- Confirmed automatic commit.

### Lesson Learned

Git should always contain the latest deployment configuration.

---

# Argo CD

## Verification 1 – Application Health

### What was the issue?

After CI completed, I needed to verify whether Argo CD deployed the application successfully.

### What was the solution?

Verified the application health in the Argo CD dashboard.

### What did I do?

- Opened Argo CD.
- Selected the TicketHub application.
- Confirmed Health status was **Healthy**.

### Lesson Learned

A successful CI pipeline does not guarantee a successful deployment.

---

## Verification 2 – Synchronization Status

### What was the issue?

I needed to ensure the Kubernetes cluster matched the Git repository.

### What was the solution?

Verified the application status was **Synced**.

### What did I do?

- Opened the application.
- Verified Sync Status.
- Confirmed there were no OutOfSync resources.

### Lesson Learned

GitOps depends on synchronization between Git and the cluster.

---

## Verification 3 – GitOps Deployment

### What was the issue?

I needed to verify that deployments were triggered automatically without manually applying manifests.

### What was the solution?

Confirmed that Argo CD detected the repository change and synchronized the cluster automatically.

### What did I do?

- Pushed a code change.
- Waited for GitHub Actions to complete.
- Observed Argo CD detecting the change.
- Confirmed automatic deployment.

### Lesson Learned

GitHub Actions builds artifacts. Argo CD is responsible for deployment.

---

## Verification 4 – Deployment Validation

### What was the issue?

After synchronization, I needed to verify that the latest application version was actually running.

### What was the solution?

Validated the Kubernetes resources after Argo CD completed synchronization.

### What did I do?

- Verified Pods were running.
- Checked Deployments.
- Confirmed Services.
- Accessed the application.

### Commands Used

```bash
kubectl get pods -n tickethub
kubectl get deployments -n tickethub
kubectl get svc -n tickethub
```

### Lesson Learned

Always verify the deployed application instead of relying only on Argo CD status.

---

# Part 3 Summary

This phase focused on validating the CI/CD pipeline and GitOps deployment.

The key lesson was that GitHub Actions and Argo CD have different responsibilities. GitHub Actions builds and publishes artifacts, while Argo CD continuously synchronizes the Kubernetes cluster with the desired state stored in Git.


---

# Prometheus

## Issue 1 – `/metrics` Endpoint Verification

### What was the issue?

Before configuring Prometheus, I needed to verify that the backend application exposed the `/metrics` endpoint correctly.

### What was the root cause?

If the endpoint was unavailable, Prometheus would never collect metrics.

### What was the solution?

I verified the endpoint manually before debugging Prometheus.

### What did I do?

- Accessed the endpoint directly.
- Confirmed metrics were returned.
- Proceeded with Prometheus configuration.

### Commands Used

```bash
curl http://localhost:5001/metrics
```

### Lesson Learned

Always verify the application before troubleshooting the monitoring stack.

---

## Issue 2 – Prometheus Could Not Discover the Backend

### What was the issue?

The backend application was running, but it did not appear in the Prometheus **Targets** page.

### What was the root cause?

Prometheus discovers Kubernetes Services through ServiceMonitors and label selectors. The labels did not match.

### What was the solution?

I compared the Service labels and ServiceMonitor selectors and corrected the mismatch.

### What did I do?

- Checked the Prometheus Targets page.
- Verified the ServiceMonitor.
- Compared labels.
- Updated the Service manifest.
- Applied the changes.

### Commands Used

```bash
kubectl get svc --show-labels -n tickethub
kubectl get servicemonitor -n monitoring
```

### Lesson Learned

When Prometheus cannot discover a service, always verify Kubernetes labels first.

---

## Issue 3 – ServiceMonitor Selector Mismatch

### What was the issue?

The ServiceMonitor existed, but Prometheus ignored it.

### What was the root cause?

Prometheus expected ServiceMonitors with the label:

```yaml
release: monitoring
```

The ServiceMonitor did not include this label.

### What was the solution?

I added the required label and reapplied the manifest.

### What did I do?

- Reviewed the Prometheus configuration.
- Compared selector labels.
- Updated the ServiceMonitor.
- Applied the manifest.

### Commands Used

```bash
kubectl get servicemonitor -n monitoring -o yaml
kubectl apply -f servicemonitor.yaml
```

### Lesson Learned

Prometheus only watches ServiceMonitors that match its configured selector.

---

## Issue 4 – Target Status Remained DOWN

### What was the issue?

The backend target appeared in Prometheus but its status remained **DOWN**.

### What was the root cause?

Prometheus could reach the Service but could not successfully scrape metrics because the Service configuration was incomplete.

### What was the solution?

After correcting the Service labels and verifying the endpoint, Prometheus successfully scraped metrics.

### What did I do?

- Opened the Targets page.
- Checked the scrape error.
- Verified `/metrics`.
- Corrected the Service configuration.
- Waited for the next scrape cycle.

### Lesson Learned

A discovered target is not enough. The target status must become **UP**.

---

## Issue 5 – Backend Discovery Verification

### What was the issue?

I needed to confirm that Prometheus was monitoring the correct backend Service.

### What was the solution?

I verified that the discovered target matched the TicketHub backend Service.

### What did I do?

- Compared the Service name.
- Verified the namespace.
- Confirmed the endpoint.

### Commands Used

```bash
kubectl get svc -n tickethub
```

### Lesson Learned

Always verify that Prometheus is scraping the expected Service.

---

## Issue 6 – Metrics Validation Before Grafana

### What was the issue?

Grafana dashboards displayed no application metrics.

### What was the root cause?

The issue could have been in the backend, Prometheus, or Grafana.

### What was the solution?

I validated each layer independently instead of starting with Grafana.

### What did I do?

1. Verified `/metrics`.
2. Verified Prometheus Targets.
3. Queried Prometheus.
4. Opened Grafana.

### Lesson Learned

Troubleshoot from the data source upward, not from the dashboard downward.

---

## Issue 7 – Prometheus UI Verification

### What was the issue?

Before creating dashboards, I needed to verify that Prometheus was storing metrics.

### What was the solution?

I queried Prometheus directly.

### What did I do?

- Opened the Prometheus UI.
- Searched available metrics.
- Executed sample queries.
- Confirmed results were returned.

### Lesson Learned

Always validate Prometheus before assuming Grafana is the problem.

---

## Issue 8 – End-to-End Monitoring Validation

### What was the issue?

I needed to verify that the complete monitoring pipeline was working.

### What was the solution?

I validated every layer independently.

### What did I do?

- Verified backend application.
- Verified `/metrics`.
- Verified Service.
- Verified ServiceMonitor.
- Verified Prometheus Target = **UP**.
- Verified Prometheus queries.
- Verified Grafana dashboards.

### Lesson Learned

A healthy monitoring stack requires every component to function correctly. Verifying each layer independently makes troubleshooting much faster.

---

# Part 4 Summary

Prometheus was the most troubleshooting-intensive component of the project.

Most issues were caused by Kubernetes labels, ServiceMonitor configuration, or verification order rather than Prometheus itself.

The biggest lesson was to always verify the monitoring pipeline step by step:

**Application → `/metrics` → Service → ServiceMonitor → Prometheus → Grafana**

---

# Grafana

## Issue 1 – Grafana Dashboards Showed "No Data"

### What was the issue?

After importing the dashboards, Grafana loaded successfully but every panel displayed **No Data**.

### What was the root cause?

Grafana was working correctly. The real issue was that Prometheus was not scraping any metrics from the backend.

### What was the solution?

Instead of changing Grafana settings, I verified Prometheus first. Once Prometheus targets became **UP**, Grafana started displaying data automatically.

### What did I do?

- Verified the Prometheus data source.
- Checked Prometheus Targets.
- Confirmed `/metrics` endpoint.
- Refreshed the dashboard.
- Verified graphs started displaying metrics.

### Lesson Learned

Grafana only visualizes data. If dashboards are empty, always verify Prometheus before debugging Grafana.

---

## Issue 2 – Verify Grafana Data Source

### What was the issue?

Before creating dashboards, I needed to confirm that Grafana could communicate with Prometheus.

### What was the root cause?

No issue occurred, but an incorrect data source would prevent all dashboards from working.

### What was the solution?

Verified that Prometheus was configured as the active data source and the connection test succeeded.

### What did I do?

- Opened Grafana Settings.
- Checked the Prometheus data source.
- Confirmed the connection status.

### Lesson Learned

Always validate the data source before creating or importing dashboards.

---

# Azure Monitor

## Issue 3 – MissingSubscriptionRegistration

### What was the issue?

While enabling Azure Monitor for AKS, Azure CLI returned:

```text
MissingSubscriptionRegistration
The subscription is not registered to use namespace 'Microsoft.Insights'
```

### What was the root cause?

The Azure subscription had not registered the **Microsoft.Insights** resource provider.

### What was the solution?

Registered the required resource provider and reran the command.

### What did I do?

- Read the error carefully.
- Identified the missing provider.
- Registered `Microsoft.Insights`.
- Enabled the monitoring add-on again.

### Commands Used

```bash
az provider register --namespace Microsoft.Insights
```

### Lesson Learned

Many Azure services depend on Resource Providers. Verify provider registration when provisioning new Azure services.

---

## Issue 4 – Verify Azure Monitor Agent (AMA)

### What was the issue?

After enabling Azure Monitor, I needed to verify that the monitoring agents were deployed to the cluster.

### What was the solution?

Checked the Azure Monitor Agent Pods in the `kube-system` namespace.

### What did I do?

- Listed system Pods.
- Verified `ama-logs` Pods.
- Confirmed they were in the **Running** state.

### Commands Used

```bash
kubectl get pods -n kube-system
```

### Lesson Learned

Before checking Azure Portal, always verify that the monitoring agents are running inside the cluster.

---

# Log Analytics

## Issue 5 – No Data Ingested

### What was the issue?

Immediately after enabling Azure Monitor, the Log Analytics Workspace displayed:

- No data ingested
- Failed to load overview
- No monitoring information

### What was the root cause?

The Azure Monitor Agents had only recently started. Telemetry had not yet reached the workspace.

### What was the solution?

Verified that the agents were running and waited for telemetry to be uploaded.

### What did I do?

- Checked Azure Monitor Agent Pods.
- Verified workspace configuration.
- Waited a few minutes.
- Refreshed the Log Analytics Workspace.

### Lesson Learned

Azure Monitor data is not available immediately after enabling monitoring.

---

## Issue 6 – Heartbeat Verification

### What was the issue?

I needed to confirm that the AKS cluster was successfully sending monitoring data to Log Analytics.

### What was the solution?

Executed a Heartbeat query using Kusto Query Language (KQL).

### What did I do?

- Opened Log Analytics.
- Ran the Heartbeat query.
- Verified records were returned.

### Commands Used

```kusto
Heartbeat
| take 10
```

### Lesson Learned

Heartbeat is the fastest way to verify that Azure Monitor and Log Analytics are working correctly.

---

## Issue 7 – Telemetry Delay

### What was the issue?

Even after the monitoring agents were running, Azure Portal still showed no monitoring information.

### What was the root cause?

Telemetry processing takes time after initial configuration.

### What was the solution?

Allowed Azure Monitor enough time to collect and process data before assuming the configuration had failed.

### What did I do?

- Verified AMA Pods.
- Verified workspace.
- Waited.
- Re-ran the Heartbeat query.
- Confirmed monitoring data appeared.

### Lesson Learned

Not every missing metric indicates a configuration problem. Sometimes the service simply needs time to ingest data.

---

## Final Monitoring Verification

Before considering the monitoring setup complete, I verified:

- Backend `/metrics` endpoint working.
- Prometheus Target status = **UP**.
- Grafana dashboards displaying metrics.
- Azure Monitor enabled.
- AMA Pods running.
- Heartbeat records available.
- Log Analytics receiving telemetry.

---

# Part 5 Summary

This phase completed the monitoring implementation.

The biggest lesson was understanding that monitoring consists of multiple independent layers:

**Application → Prometheus → Grafana → Azure Monitor → Log Analytics**

Verifying each layer individually made troubleshooting faster and prevented unnecessary configuration changes.

---

# Frequently Used Commands

## Docker

```bash
docker images
docker ps
docker build -t <image-name> .
docker tag <image> <acr-name>.azurecr.io/<image>:<tag>
docker push <acr-name>.azurecr.io/<image>:<tag>
```

---

## Azure CLI

```bash
az login
az account show
az group list
az aks list
az acr list
az aks get-credentials --resource-group <rg> --name <aks-name>
az provider register --namespace Microsoft.Insights
```

---

## Kubernetes

```bash
kubectl get nodes
kubectl get pods -A
kubectl get deployments -A
kubectl get svc -A
kubectl get ingress -A
kubectl describe pod <pod-name>
kubectl logs <pod-name>
kubectl rollout status deployment/<deployment>
kubectl get servicemonitor -A
kubectl port-forward svc/<service> 5000:5000
```

---

## Helm

```bash
helm lint ./helm/tickethub
helm template tickethub ./helm/tickethub
helm install tickethub ./helm/tickethub
helm upgrade tickethub ./helm/tickethub
helm list
```

---

## Monitoring

### Verify Metrics

```bash
curl http://localhost:5001/metrics
```

### Verify AMA Pods

```bash
kubectl get pods -n kube-system
```

### Verify Heartbeat

```kusto
Heartbeat
| take 10
```

---

# Best Practices Followed

## 1. Verify Before Changing

I never modified multiple configurations at the same time. Every change was verified before moving to the next layer.

---

## 2. Validate Every Deployment

After each deployment I verified:

- Pods
- Deployments
- Services
- Rollout Status
- Application Availability

---

## 3. Test Every Layer Independently

Instead of assuming a problem belonged to one tool, I verified each layer separately:

- Backend
- Docker
- Kubernetes
- Prometheus
- Grafana
- Azure Monitor

---

## 4. Read Error Messages Carefully

The Azure Monitor issue (`MissingSubscriptionRegistration`) was resolved by carefully reading the error instead of repeatedly executing the same command.

---

## 5. Verify Monitoring Step by Step

Monitoring was always verified in this order:

```text
Application
↓
/metrics
↓
Prometheus
↓
Grafana
↓
Azure Monitor
↓
Log Analytics
```

---

## 6. Keep Git as the Source of Truth

No Kubernetes resources were modified manually after GitOps was implemented.

All deployment changes were committed to Git and synchronized by Argo CD.

---

# Lessons Learned

## Docker

- Verify images before pushing.
- Use meaningful image tags.

---

## Azure Container Registry

- Confirm images exist before deployment.
- Verify tags after every push.

---

## Kubernetes

- Labels are critical.
- Services depend on selectors.
- Rollout verification is important.
- Always inspect Pod logs before guessing.

---

## Helm

- Render templates before deployment.
- Run `helm lint` to detect chart issues early.

---

## GitHub Actions

- CI should build and publish artifacts.
- Validate every workflow execution.

---

## Argo CD

- GitHub Actions builds.
- Argo CD deploys.
- Always verify **Healthy** and **Synced** status.

---

## Prometheus

- Verify `/metrics` first.
- Check ServiceMonitor labels.
- Ensure Targets are **UP**.

---

## Grafana

- Grafana depends on Prometheus.
- Empty dashboards usually indicate an upstream issue.

---

## Azure Monitor

- Verify Resource Provider registration.
- Confirm AMA Pods are running.

---

## Log Analytics

- Heartbeat is the first validation query.
- Allow time for telemetry ingestion.

---

# Overall Engineering Takeaways

This project reinforced several practical DevOps principles:

- Troubleshoot methodically instead of guessing.
- Validate every layer independently.
- Read and understand error messages.
- Verify changes before moving forward.
- Automate deployments with CI/CD and GitOps.
- Monitor both the application and the infrastructure.

---

# Final Summary

Building TicketHub provided hands-on experience with Docker, Azure Container Registry, Azure Kubernetes Service, Helm, GitHub Actions, Argo CD, Prometheus, Grafana, Azure Monitor, and Log Analytics.

More importantly, it strengthened my troubleshooting approach.

Rather than relying on trial and error, I learned to:

1. Observe the symptoms.
2. Investigate the root cause.
3. Apply the smallest possible fix.
4. Verify the outcome.

This structured approach is applicable to real-world DevOps environments and has significantly improved my confidence in deploying, monitoring, and troubleshooting cloud-native applications.

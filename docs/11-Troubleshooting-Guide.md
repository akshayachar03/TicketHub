# 🛠️ Troubleshooting Guide

> This document records the real DevOps issues encountered while
> building the TicketHub project. It focuses on practical investigation,
> root cause analysis, and resolution rather than theory.

## Download Note

This is a rewritten version organized as an engineering runbook.

## 1. Troubleshooting Philosophy

Always troubleshoot layer by layer:

``` text
Application
↓
Docker
↓
Azure Container Registry
↓
Kubernetes
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

For every issue:

1.  Observe symptoms.
2.  Read the error carefully.
3.  Verify configuration.
4.  Test one layer at a time.
5.  Identify the root cause.
6.  Apply the smallest fix.
7.  Verify the result.

------------------------------------------------------------------------

## Included Real Issues

### Docker & Local

-   `/metrics` returned 404 because an older Node.js process was serving
    requests.
-   Port 5000 already in use during `kubectl port-forward`.

### Kubernetes

-   Backend Service missing labels.
-   Rollout verification using `kubectl rollout status`.

### Prometheus

-   ServiceMonitor not discovered because `release: monitoring` label
    was missing.
-   Backend Service not discovered because selectors did not match.
-   Verified metrics using `curl` before debugging Prometheus.
-   Target changed from DOWN to UP after correcting labels.

### Grafana

-   Dashboards showed **No Data** because Prometheus was not scraping
    metrics.

### Azure Monitor

-   `MissingSubscriptionRegistration (Microsoft.Insights)` while
    enabling monitoring.
-   Verified `ama-logs` Pods before assuming Azure Monitor failed.

### Log Analytics

-   No ingestion immediately after enabling monitoring.
-   Verified Heartbeat records using KQL before further troubleshooting.

------------------------------------------------------------------------

## Best Practices

-   Verify each layer independently.
-   Never change multiple configurations simultaneously.
-   Use `curl` before blaming Prometheus.
-   Verify Prometheus Targets before Grafana.
-   Verify Kubernetes labels whenever service discovery fails.
-   Always confirm deployment rollouts.
-   Use Heartbeat as the first Log Analytics validation.

------------------------------------------------------------------------

## Lessons Learned

-   Small Kubernetes label mismatches can break monitoring.
-   Prometheus depends on correct service discovery.
-   Grafana depends on Prometheus.
-   Azure services may require provider registration.
-   Monitoring data can take time to appear.
-   A structured troubleshooting methodology is faster than trial and
    error.

> **Note:** Expand each issue using the format:
>
> **Issue → Symptoms → Investigation → Commands Used → Root Cause →
> Solution → Verification → Lesson Learned**
>
> This format mirrors real production incident documentation and is
> ideal for interview preparation.

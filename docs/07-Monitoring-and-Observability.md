# 📊 Monitoring and Observability

## Introduction

After deploying the TicketHub application to Azure Kubernetes Service (AKS), the next objective was to monitor both the application and the infrastructure.

Deploying an application is only one part of running it successfully. It is equally important to understand how the application behaves after deployment.

For this project, I implemented a monitoring solution using multiple tools, each with a specific responsibility.

The monitoring stack consists of:

* Prometheus
* Grafana
* Azure Monitor
* Azure Log Analytics

Together, these tools provide complete visibility into the application and the Azure infrastructure.

---

# Why Monitoring is Important

Monitoring helps identify problems before they impact users.

It provides visibility into:

* Application health
* Infrastructure health
* Resource utilization
* Performance
* Availability

Without monitoring, troubleshooting would depend only on logs or user reports.

By implementing monitoring, I could proactively verify that the application and infrastructure were functioning correctly.

---

# Application Monitoring vs Infrastructure Monitoring

One of the key learnings from this project was understanding the difference between application monitoring and infrastructure monitoring.

## Application Monitoring

Application monitoring focuses on the behavior of the application itself.

Examples include:

* Number of HTTP requests
* Request duration
* API performance
* Application availability

For this purpose, I used:

* Prometheus
* Grafana

---

## Infrastructure Monitoring

Infrastructure monitoring focuses on the Azure resources hosting the application.

Examples include:

* AKS cluster health
* Node status
* Resource utilization
* Monitoring agents
* Infrastructure telemetry

For this purpose, I used:

* Azure Monitor
* Azure Log Analytics

---

# Monitoring Architecture

The complete monitoring architecture is shown below.

```text id="rjv0ei"
                    Application

                         │

                         ▼

                 /metrics Endpoint

                         │

                         ▼

                    Prometheus

                         │

                         ▼

                     Grafana


AKS Cluster

      │

      ▼

Azure Monitor Agent

      │

      ▼

Azure Monitor

      │

      ▼

Log Analytics
```

The monitoring solution is divided into two independent layers.

This separation makes it easier to analyze both application behavior and infrastructure health.

---

# Tools Used

## Prometheus

Prometheus collects application metrics from the backend.

Examples:

* HTTP request count
* Request duration
* Default Node.js metrics

---

## Grafana

Grafana connects to Prometheus and visualizes collected metrics.

It provides dashboards that display application and Kubernetes metrics in real time.

---

## Azure Monitor

Azure Monitor collects telemetry from Azure Kubernetes Service.

It focuses on infrastructure monitoring rather than application metrics.

---

## Azure Log Analytics

Log Analytics stores telemetry collected by Azure Monitor.

It allows monitoring data to be queried using Kusto Query Language (KQL).

---

# Monitoring Workflow

The monitoring process in the project follows these steps.

## Application Monitoring

```text id="qgukha"
Backend API

      │

      ▼

/metrics

      │

      ▼

Prometheus

      │

      ▼

Grafana Dashboard
```

---

## Infrastructure Monitoring

```text id="rrkmdd"
AKS Cluster

      │

      ▼

Azure Monitor Agent

      │

      ▼

Azure Monitor

      │

      ▼

Log Analytics

      │

      ▼

Azure Portal
```

---

# How I Verified Monitoring

After implementing the monitoring solution, I verified each component independently.

## Prometheus

* `/metrics` endpoint accessible.
* Backend discovered successfully.
* Prometheus target status showed **UP**.
* Metrics available.

---

## Grafana

* Prometheus connected successfully.
* Dashboards loaded correctly.
* Metrics displayed in real time.

---

## Azure Monitor

* Monitoring add-on enabled.
* Azure Monitor Agent running.
* AKS connected successfully.

---

## Log Analytics

* Heartbeat records available.
* KQL queries returned data.
* Monitoring data updated continuously.

Only after completing these verification steps did I consider the monitoring implementation complete.

---

# Challenges Faced

During the implementation, I encountered a few monitoring-related issues.

Some examples include:

* `/metrics` endpoint returning a 404 response.
* Prometheus not discovering the backend service because of label mismatches.
* Azure Monitor requiring the **Microsoft.Insights** resource provider to be registered.
* Waiting for monitoring data to appear in Log Analytics after enabling Azure Monitor.

Troubleshooting these issues helped me understand how each monitoring component works together.

Detailed explanations are available in the **Troubleshooting Guide**.

---

# What I Learned

Implementing monitoring helped me understand that observability is much more than installing monitoring tools.

Each component has a different responsibility.

* Prometheus collects application metrics.
* Grafana visualizes metrics.
* Azure Monitor collects infrastructure telemetry.
* Log Analytics stores monitoring data.
* KQL is used to analyze collected logs.

Using all four tools together provided complete visibility into the application and its hosting environment.

---

# Best Practices

During implementation, I followed these practices.

* Separate application monitoring from infrastructure monitoring.
* Verify every monitoring component independently.
* Confirm metrics before creating dashboards.
* Validate monitoring using KQL.
* Keep dashboards focused on useful operational metrics.
* Use Kubernetes-native monitoring with ServiceMonitor.

These practices made the monitoring solution easier to maintain and troubleshoot.

---

# Summary

Monitoring and observability were the final components added to the TicketHub project.

By combining Prometheus, Grafana, Azure Monitor, and Azure Log Analytics, I implemented a complete monitoring solution that provides visibility into both the application and the Azure infrastructure.

This monitoring stack helps verify application health, detect issues, and support troubleshooting in a production-style Kubernetes environment.

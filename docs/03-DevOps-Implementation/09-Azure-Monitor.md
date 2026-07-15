# ☁️ Azure Monitor

## Introduction

After implementing application monitoring using Prometheus and Grafana, I wanted visibility into the Azure infrastructure that hosts the application.

While Prometheus was collecting application metrics, it was not designed to monitor Azure resources such as:

* Azure Kubernetes Service (AKS)
* Cluster nodes
* Infrastructure health
* Azure resource utilization

To monitor these components, I integrated **Azure Monitor** with my AKS cluster.

---

# Why Did I Use Azure Monitor?

I wanted a complete monitoring solution.

Prometheus and Grafana gave me visibility into the application, but I also wanted to monitor the Azure infrastructure running the application.

Azure Monitor provides:

* AKS health monitoring
* Cluster performance metrics
* Node monitoring
* Infrastructure insights
* Integration with Log Analytics

This completed the observability stack for the project.

---

# Why Not Use Only Prometheus?

Initially, I thought Prometheus might be enough.

However, I learned that Prometheus and Azure Monitor solve different problems.

| Prometheus          | Azure Monitor                |
| ------------------- | ---------------------------- |
| Application Metrics | Azure Infrastructure Metrics |
| HTTP Requests       | Cluster Health               |
| Response Time       | Node Performance             |
| Custom Metrics      | Azure Resource Monitoring    |
| Application Focus   | Platform Focus               |

Instead of choosing one, I used both because they complement each other.

---

# My Implementation

The implementation followed these steps:

1. Created a Log Analytics Workspace.
2. Enabled the Azure Monitor add-on for AKS.
3. Connected the AKS cluster to the Log Analytics Workspace.
4. Verified that monitoring agents were deployed.
5. Confirmed heartbeat data in Log Analytics.
6. Executed KQL queries to verify data collection.

---

# Azure Monitoring Workflow

```text
AKS Cluster

      │

      ▼

Azure Monitor Agent (AMA)

      │

      ▼

Azure Monitor

      │

      ▼

Log Analytics Workspace

      │

      ▼

Azure Portal
```

The Azure Monitor Agent collects telemetry from the AKS cluster and sends it to the Log Analytics Workspace.

---

# How I Verified the Setup

After enabling Azure Monitor, I verified:

* Azure Monitor add-on was enabled.
* Azure Monitor Agent Pods were running.
* Log Analytics Workspace was connected.
* Heartbeat records appeared.
* KQL queries returned data.
* Cluster health information became available in Azure Portal.

---

# Challenges Faced

## Problem 1 – Microsoft.Insights Provider Not Registered

While enabling Azure Monitor, I encountered the following error:

```text
MissingSubscriptionRegistration

The subscription is not registered to use namespace 'Microsoft.Insights'
```

Initially, I assumed the Azure CLI command was incorrect.

After investigating the error, I realized that my Azure subscription had not registered the required resource provider.

### Solution

I registered the **Microsoft.Insights** resource provider for the subscription.

After the registration completed, I ran the command again and Azure Monitor was enabled successfully.

This helped me understand that some Azure services require resource providers to be registered before they can be used.

---

## Problem 2 – No Data in Log Analytics

After enabling Azure Monitor, the Log Analytics Workspace displayed:

* No ingestion data
* No monitoring information

At first, I suspected the monitoring configuration had failed.

After checking the cluster, I confirmed that the Azure Monitor Agent Pods were still initializing.

A few minutes later, heartbeat records began appearing in Log Analytics and monitoring data started flowing into the workspace.

This taught me that Azure monitoring services may require some time before data becomes available.

---

# Verification Using KQL

To confirm that Azure Monitor was working correctly, I executed a simple Kusto Query Language (KQL) query.

The query returned heartbeat records from the connected AKS cluster.

This confirmed:

* Azure Monitor Agent was working.
* The Log Analytics Workspace was receiving data.
* The monitoring pipeline was functioning correctly.

---

# What I Learned

Implementing Azure Monitor helped me understand that infrastructure monitoring and application monitoring are different responsibilities.

Some key lessons were:

* Azure Monitor focuses on cloud resources.
* Prometheus focuses on application metrics.
* Log Analytics stores monitoring data for querying.
* KQL is used to analyze collected telemetry.
* Monitoring data may take a few minutes before appearing after initial configuration.

---

# Interview Questions

### Why did you use Azure Monitor?

I used Azure Monitor to monitor the Azure infrastructure hosting the application. While Prometheus monitored the application itself, Azure Monitor provided visibility into the AKS cluster, nodes, and overall infrastructure health.

---

### Why did you use both Prometheus and Azure Monitor?

Prometheus collects application metrics such as request count and response time.

Azure Monitor focuses on Azure infrastructure, including cluster health, node metrics, and platform monitoring.

Together, they provide complete observability.

---

### What is Log Analytics?

Log Analytics is a centralized workspace where Azure Monitor stores logs and monitoring data. It allows administrators to query collected telemetry using Kusto Query Language (KQL).

---

### What is KQL?

Kusto Query Language (KQL) is Microsoft's query language used to search and analyze data stored in Log Analytics Workspaces.

I used KQL to verify that heartbeat data from my AKS cluster was being collected successfully.

---

# Cross Questions

### Why wasn't data immediately available after enabling Azure Monitor?

The Azure Monitor Agent requires some time to start collecting telemetry and send it to the Log Analytics Workspace.

Because of this, monitoring data does not appear instantly after enabling the service.

---

### What caused the `MissingSubscriptionRegistration` error?

The Azure subscription had not registered the **Microsoft.Insights** resource provider.

Registering the provider resolved the issue and allowed Azure Monitor to be enabled.

---

### Can Azure Monitor replace Prometheus?

Not completely.

Azure Monitor provides excellent infrastructure monitoring for Azure resources.

However, Prometheus provides richer application-level metrics and integrates naturally with Kubernetes workloads.

Using both services provides a more complete monitoring solution.

---

# Summary

Azure Monitor completed the infrastructure monitoring implementation for the TicketHub project.

By integrating the AKS cluster with Azure Monitor and Log Analytics, I gained visibility into the health and performance of the Azure environment.

Combined with Prometheus and Grafana, the project now provides end-to-end monitoring for both the application and the underlying infrastructure.

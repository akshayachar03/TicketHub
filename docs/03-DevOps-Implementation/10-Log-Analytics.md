# 📑 Log Analytics

## Introduction

After enabling Azure Monitor for the AKS cluster, I needed a way to view, search, and analyze the monitoring data collected from the cluster.

Azure Monitor collects telemetry from Azure resources, but that data needs a centralized location where it can be stored and queried.

For this purpose, I used **Azure Log Analytics**.

Log Analytics stores monitoring data from Azure Monitor and allows administrators to analyze it using **Kusto Query Language (KQL)**.

---

# Why Did I Use Log Analytics?

The primary objective was to verify that my AKS cluster was sending monitoring data correctly.

I also wanted the ability to:

* Query monitoring data
* Verify agent connectivity
* Check cluster health
* Troubleshoot monitoring issues
* Analyze infrastructure logs

Without Log Analytics, Azure Monitor would collect data, but I would have very limited visibility into what was actually being received.

---

# How It Fits into My Architecture

The monitoring flow in my project is shown below.

```text
AKS Cluster

      │

      ▼

Azure Monitor Agent

      │

      ▼

Azure Monitor

      │

      ▼

Log Analytics Workspace

      │

      ▼

KQL Queries
```

The Azure Monitor Agent collects telemetry from the AKS cluster and sends it to the Log Analytics Workspace, where it can be queried using KQL.

---

# My Implementation

The implementation consisted of the following steps.

1. Created a Log Analytics Workspace.
2. Connected the workspace to Azure Monitor.
3. Enabled Azure Monitor for the AKS cluster.
4. Waited for the Azure Monitor Agent to start collecting data.
5. Verified heartbeat data.
6. Executed KQL queries.
7. Confirmed that monitoring data was being collected successfully.

---

# How I Verified the Setup

After configuring Azure Monitor and Log Analytics, I verified:

* The Log Analytics Workspace was created successfully.
* The AKS cluster was connected.
* Azure Monitor Agent Pods were running.
* Heartbeat records appeared.
* KQL queries returned data.
* Monitoring data continued to update automatically.

---

# KQL Queries Used

One of the first queries I executed was to verify heartbeat records.

This confirmed that the monitoring agents running inside the AKS cluster were successfully sending telemetry.

After confirming heartbeat data, I knew the monitoring pipeline was working correctly.

As I continue improving the project, additional KQL queries can be added for deeper analysis and troubleshooting.

---

# Challenges Faced

## No Monitoring Data After Initial Setup

Immediately after enabling Azure Monitor, the Log Analytics Workspace showed:

* No ingestion data
* No logs
* No monitoring information

Initially, I thought the configuration had failed.

After checking the Kubernetes cluster, I confirmed that the Azure Monitor Agent Pods had started successfully.

A few minutes later, heartbeat records began appearing automatically.

This taught me that Azure Monitor requires some time before telemetry becomes available after initial configuration.

---

# What I Learned

Working with Log Analytics helped me understand several important concepts.

* Azure Monitor collects telemetry.
* Log Analytics stores the collected telemetry.
* KQL is used to query monitoring data.
* Heartbeat records are a simple way to verify agent connectivity.
* Monitoring should always be verified after configuration rather than assuming it is working.

---

# Best Practices

During this implementation, I followed a few good practices.

* Verified monitoring agents before troubleshooting.
* Confirmed heartbeat records before running advanced queries.
* Used KQL to validate data collection.
* Verified every stage before moving to the next implementation.

These checks helped me identify configuration issues quickly.

---

# Summary

Azure Log Analytics completed the Azure monitoring implementation.

By connecting Azure Monitor with a Log Analytics Workspace, I was able to verify that the AKS cluster was successfully sending monitoring data and that the monitoring pipeline was functioning correctly.

This completed the monitoring implementation for the TicketHub project.

The project now includes:

* Prometheus for application metrics
* Grafana for visualization
* Azure Monitor for infrastructure monitoring
* Azure Log Analytics for centralized log analysis

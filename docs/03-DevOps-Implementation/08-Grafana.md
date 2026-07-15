# 📊 Grafana

## Introduction

After successfully collecting application metrics using Prometheus, the next step was to visualize those metrics.

Although Prometheus provides its own web interface, it is primarily designed for querying metrics rather than creating dashboards.

To make monitoring easier, I integrated **Grafana** with Prometheus.

Grafana allowed me to build dashboards that display application and Kubernetes metrics in a visual and easy-to-understand format.

---

# Why Did I Use Grafana?

While Prometheus stores metrics efficiently, interpreting raw metric values is difficult during day-to-day operations.

I wanted a dashboard where I could quickly answer questions such as:

* Is the application receiving requests?
* How many requests are being processed?
* Are all Pods running?
* What is the CPU usage?
* What is the memory usage?
* Is the application healthy?

Grafana provides these insights through customizable dashboards.

---

# Why Not Use the Prometheus UI?

The Prometheus web interface is excellent for querying metrics and troubleshooting.

However, it is not designed for long-term monitoring or dashboards.

Grafana provides:

* Interactive dashboards
* Multiple visualizations
* Better user experience
* Alerting support
* Multiple data source integration

For these reasons, I used:

* **Prometheus** → Metric collection
* **Grafana** → Metric visualization

---

# My Implementation

The implementation involved the following steps:

1. Installed Grafana using the Kubernetes monitoring stack.
2. Accessed the Grafana web interface.
3. Connected Prometheus as a data source.
4. Verified the Prometheus connection.
5. Created dashboards for application monitoring.
6. Created dashboards for Kubernetes resource monitoring.
7. Verified that dashboard values updated in real time.

---

# Monitoring Workflow

```text
Backend API

      │

      ▼

/metrics Endpoint

      │

      ▼

Prometheus

      │

      ▼

Grafana Data Source

      │

      ▼

Dashboards
```

---

# Dashboards Created

For this project, I created dashboards to monitor both the application and the Kubernetes cluster.

### Application Dashboard

The application dashboard displays:

* HTTP Request Count
* Request Duration
* Application Availability

These metrics help monitor the behavior of the backend application.

---

### Kubernetes Dashboard

The Kubernetes dashboard displays:

* Running Pods
* CPU Usage
* Memory Usage
* Node Status
* Namespace Information

These dashboards provide visibility into the health of the AKS cluster.

---

# Why Visualization Matters

Without dashboards, monitoring would require manually querying Prometheus each time.

Grafana makes it possible to identify problems much more quickly.

For example:

* A sudden increase in request count is immediately visible.
* High CPU usage can be detected before performance issues occur.
* Pod failures can be identified without checking Kubernetes manually.

Visualization improves operational awareness.

---

# How I Verified Grafana

After configuring Grafana, I verified:

* Grafana was accessible.
* Prometheus was connected successfully.
* Dashboards loaded correctly.
* Metrics updated automatically.
* Application metrics appeared correctly.
* Kubernetes metrics appeared correctly.

Once these checks were completed, the monitoring setup was considered successful.

---

# Challenges Faced

Most of the Grafana implementation was straightforward because Prometheus had already been configured correctly.

The primary dependency was ensuring that Prometheus successfully collected metrics.

Once Prometheus targets were healthy, Grafana dashboards displayed data without additional troubleshooting.

This reinforced an important lesson:

Grafana does not collect metrics directly.

It only visualizes data provided by Prometheus.

---

# What I Learned

This implementation helped me understand:

* Grafana is a visualization platform.
* Prometheus is the metrics database.
* Dashboards simplify monitoring.
* Visual metrics help identify issues quickly.
* Monitoring becomes significantly easier when important metrics are displayed on a single dashboard.

---

# Interview Questions

### Why did you use Grafana?

I used Grafana to visualize the metrics collected by Prometheus. Instead of viewing raw metric values, Grafana presents the information through dashboards that make application and infrastructure monitoring much easier.

---

### What was Grafana's role in your project?

Grafana was responsible for displaying application and Kubernetes metrics collected by Prometheus. It provided dashboards for monitoring request counts, resource utilization, and overall application health.

---

### Does Grafana collect metrics?

No.

Grafana does not collect metrics.

It queries data from external data sources such as Prometheus and displays the results in dashboards.

---

### Why did you connect Grafana to Prometheus?

Prometheus stores time-series metrics, while Grafana provides rich visualization capabilities. Together, they form a complete monitoring solution.

---

# Cross Questions

### What happens if Prometheus stops working?

Grafana will continue to load, but the dashboards will not display updated metrics because Grafana depends on Prometheus as its data source.

---

### Can Grafana use data sources other than Prometheus?

Yes.

Grafana supports many data sources, including:

* Prometheus
* Azure Monitor
* Elasticsearch
* MySQL
* PostgreSQL
* Loki
* InfluxDB

This flexibility allows Grafana to act as a centralized visualization platform.

---

### Why not use Azure Monitor dashboards instead?

Azure Monitor dashboards are well suited for Azure infrastructure.

However, Prometheus and Grafana provide deeper application-level visibility and are widely adopted in Kubernetes environments.

Using both solutions gave me comprehensive monitoring across the application and the underlying infrastructure.

---

# Summary

Grafana completed the application monitoring setup by providing visual dashboards for the metrics collected by Prometheus.

With Prometheus handling metric collection and Grafana handling visualization, I gained real-time visibility into both the TicketHub application and the Kubernetes cluster, making monitoring and troubleshooting significantly easier.

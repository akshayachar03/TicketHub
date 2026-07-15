# 📈 Prometheus

## Introduction

After successfully deploying the application to Azure Kubernetes Service (AKS), the next objective was to monitor the application.

Until this stage, I could verify that the application was running by accessing it through the browser. However, I had no visibility into how the backend was performing internally.

For example, I couldn't answer questions like:

* How many requests is the application receiving?
* How long does each request take?
* Is the application healthy?
* Is the request count increasing?
* Are there any performance bottlenecks?

To answer these questions, I implemented **Prometheus**.

---

# Why Did I Use Prometheus?

I wanted to monitor the backend application using real-time metrics.

Prometheus is one of the most widely used monitoring solutions in Kubernetes environments and integrates well with Grafana.

By adding Prometheus, I could collect application metrics instead of relying only on application logs.

---

# Why Not Use Only Azure Monitor?

Azure Monitor is excellent for monitoring Azure resources such as:

* AKS
* Virtual Machines
* Networking
* Infrastructure

However, I also wanted detailed application-level metrics, such as:

* Total HTTP requests
* Request duration
* API performance

These metrics are not automatically available through Azure Monitor.

Prometheus is specifically designed to collect custom application metrics.

For this reason, I used both:

* Prometheus → Application Metrics
* Azure Monitor → Infrastructure Metrics

---

# My Implementation

The implementation involved the following steps:

1. Added the **prom-client** package to the backend.
2. Created a Prometheus configuration file.
3. Registered default Node.js metrics.
4. Implemented a custom metrics middleware.
5. Exposed a `/metrics` endpoint.
6. Created a Kubernetes ServiceMonitor.
7. Verified that Prometheus successfully scraped the endpoint.

---

# Monitoring Workflow

```text
User Request

      │

      ▼

Backend API

      │

      ▼

Metrics Middleware

      │

      ▼

/metrics Endpoint

      │

      ▼

Prometheus

      │

      ▼

Grafana Dashboard
```

---

# Metrics Endpoint

One important implementation was exposing the `/metrics` endpoint.

This endpoint returns metrics in the format expected by Prometheus.

Instead of returning JSON, it returns plain text containing metrics collected by the application.

Prometheus periodically calls this endpoint and stores the returned metrics in its time-series database.

---

# Metrics Collected

The backend currently exposes:

* Default Node.js metrics
* HTTP request count
* HTTP request duration

These metrics provide visibility into application performance.

---

# ServiceMonitor

Since Prometheus was running inside Kubernetes, it needed a way to discover the backend service automatically.

To achieve this, I created a **ServiceMonitor**.

The ServiceMonitor instructs Prometheus:

* Which namespace to monitor.
* Which Kubernetes Service to monitor.
* Which endpoint to scrape.
* How frequently to collect metrics.

Without the ServiceMonitor, Prometheus would not know where to collect metrics.

---

# How I Verified the Setup

After implementation, I verified:

* `/metrics` endpoint was accessible.
* Prometheus successfully discovered the ServiceMonitor.
* Backend service appeared as a scrape target.
* Target status showed **UP**.
* Metrics were visible inside Prometheus.
* Grafana successfully displayed the metrics.

Only after completing these checks did I consider the monitoring setup successful.

---

# Challenges Faced

This was one of the most interesting debugging sessions in the project.

## Problem 1 — `/metrics` Returned 404

Initially, whenever I accessed:

```text
/metrics
```

I received:

```text
Route not found
```

At first, I thought the route was missing.

After investigating, I discovered that the application code was correct.

The real issue was that another Node.js process was still running on port **5000**.

Even after modifying the application, my requests were reaching the old process instead of the updated one.

### Solution

I stopped the existing Node.js process and restarted the application.

To verify the route independently, I temporarily changed the application to run on **port 5001**.

After confirming that `/metrics` worked correctly, I restarted the application on the correct port.

This helped me understand the importance of verifying which process is actually serving requests.

---

## Problem 2 — Prometheus Could Not Discover My Application

After the `/metrics` endpoint was working, Prometheus still wasn't collecting any metrics.

The ServiceMonitor appeared to be correct, but no targets were discovered.

After investigation, I found that the Kubernetes Service was missing the label expected by the ServiceMonitor.

Because the labels didn't match, Prometheus ignored the service.

### Solution

I added the required label to the backend Service.

Once the labels matched, Prometheus immediately detected the application and began scraping metrics.

---

# What I Learned

This implementation helped me understand several important monitoring concepts.

* Applications must expose metrics explicitly.
* Prometheus pulls metrics rather than receiving them.
* ServiceMonitor is responsible for service discovery.
* Labels play an important role in Kubernetes monitoring.
* Verifying each stage individually makes troubleshooting much easier.

Most importantly, I learned that monitoring involves much more than simply installing Prometheus.

Correct configuration is equally important.

---

# Interview Questions

### Why did you use Prometheus?

I used Prometheus to collect application-level metrics such as HTTP request count and request duration. These metrics helped me understand the behavior and performance of the backend application.

---

### Why expose a `/metrics` endpoint?

Prometheus collects metrics by periodically sending HTTP requests to a metrics endpoint. The `/metrics` endpoint exposes application metrics in a format that Prometheus understands.

---

### What is a ServiceMonitor?

A ServiceMonitor is a Kubernetes custom resource used by the Prometheus Operator. It tells Prometheus which Kubernetes Services should be monitored and which endpoints should be scraped.

---

### Why did you use both Prometheus and Azure Monitor?

Prometheus focuses on application metrics.

Azure Monitor focuses on infrastructure metrics.

Using both provides complete observability of the application and the underlying Kubernetes cluster.

---

# Cross Questions

### Why doesn't Prometheus push metrics?

Prometheus follows a pull model because it simplifies service discovery and allows Prometheus to control scraping intervals.

---

### What happens if the `/metrics` endpoint becomes unavailable?

Prometheus marks the target as **DOWN** and stops collecting metrics until the endpoint becomes available again.

---

### What would happen if the ServiceMonitor labels didn't match the Service labels?

Prometheus would not discover the application, and no metrics would be collected. This was an issue I actually encountered during the implementation.

---

### How did you confirm that Prometheus was working?

I verified:

* `/metrics` endpoint was accessible.
* Prometheus target status showed **UP**.
* Metrics appeared in the Prometheus UI.
* Grafana dashboards displayed live data.

---

# Summary

Prometheus provided application-level observability for the TicketHub backend.

By exposing a custom `/metrics` endpoint, configuring a ServiceMonitor, and resolving service discovery issues, I successfully integrated Prometheus into the Kubernetes environment.

This implementation gave me practical experience with application monitoring and real-world troubleshooting in Kubernetes.

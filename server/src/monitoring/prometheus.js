import client from "prom-client";

// Create a Registry
const register = new client.Registry();

// Collect default Node.js metrics
client.collectDefaultMetrics({
  register,
  prefix: "tickethub_",
});

// HTTP Request Counter
export const httpRequestCounter = new client.Counter({
  name: "tickethub_http_requests_total",
  help: "Total HTTP Requests",
  labelNames: ["method", "route", "status"],
});

register.registerMetric(httpRequestCounter);

// Request Duration Histogram
export const requestDuration = new client.Histogram({
  name: "tickethub_http_request_duration_seconds",
  help: "HTTP Request Duration",
  labelNames: ["method", "route", "status"],
  buckets: [0.05, 0.1, 0.3, 0.5, 1, 2, 5],
});

register.registerMetric(requestDuration);

export default register;
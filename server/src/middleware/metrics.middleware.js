import { httpRequestCounter, requestDuration } from "../monitoring/prometheus.js";

export default function metricsMiddleware(req, res, next) {

  const end = requestDuration.startTimer();

  res.on("finish", () => {

    httpRequestCounter.inc({
      method: req.method,
      route: req.route?.path || req.path,
      status: res.statusCode,
    });

    end({
      method: req.method,
      route: req.route?.path || req.path,
      status: res.statusCode,
    });

  });

  next();
}
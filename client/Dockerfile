# ==========================================================
# Stage 1 - Build React Application
# ==========================================================

FROM node:22-alpine AS builder

WORKDIR /app

# Build Arguments
ARG VITE_API_URL=/api/v1

# Expose to Vite during build
ENV VITE_API_URL=$VITE_API_URL

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# ==========================================================
# Stage 2 - Nginx
# ==========================================================

FROM nginx:1.31-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
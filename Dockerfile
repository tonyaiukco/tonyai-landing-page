# Builds the static export, then serves it with nginx as a non-root user on port 8080.
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# Inlined into the bundle by `next build`; empty keeps the forms' mailto fallback.
ARG NEXT_PUBLIC_FORM_ENDPOINT=""
ARG NEXT_PUBLIC_REGISTER_ENDPOINT=""
ENV NEXT_PUBLIC_FORM_ENDPOINT=$NEXT_PUBLIC_FORM_ENDPOINT \
    NEXT_PUBLIC_REGISTER_ENDPOINT=$NEXT_PUBLIC_REGISTER_ENDPOINT \
    NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM nginxinc/nginx-unprivileged:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/out /usr/share/nginx/html
EXPOSE 8080

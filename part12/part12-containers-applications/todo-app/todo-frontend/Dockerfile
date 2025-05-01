FROM node:20-slim AS base-stage
WORKDIR /usr/src/app

FROM base-stage AS dependencies-stage
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

FROM dependencies-stage AS test-stage
ENV VITE_BACKEND_URL=http://localhost:80/api/
COPY . .
RUN npm run test

FROM test-stage AS build-stage
ENV VITE_BACKEND_URL=http://localhost:80/api/
COPY . .
RUN npm run build

FROM nginx:1.25-alpine AS prod
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
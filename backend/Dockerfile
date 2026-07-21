# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /usr/src/app/dist ./dist

# Create a non-root user for security
RUN addgroup -S mwu && adduser -S mwu -G mwu
USER mwu

EXPOSE 5000

CMD ["node", "dist/server.js"]

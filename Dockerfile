# Multi-stage build for production deployment
# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./
COPY vite.config.ts ./
COPY client ./client
COPY shared ./shared
COPY server ./server
COPY script ./script

# Install dependencies
RUN npm ci

# Build the application (frontend + backend)
RUN npm run build

# Stage 2: Runtime
FROM node:20-alpine

WORKDIR /app

# Install production dependencies only
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start the application
ENV NODE_ENV=production
ENV PORT=5000

CMD ["node", "dist/index.cjs"]

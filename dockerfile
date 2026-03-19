# Dockerfile
FROM node:22-alpine AS base

# Build-time env (used by Next.js during `npm run build`)
# Override with: --build-arg NEXT_PUBLIC_API_BASE_URL=... --build-arg NEXT_PUBLIC_BASE_URL=...
ARG NEXT_PUBLIC_API_BASE_URL=https://obeyable-isothermally-kelly.ngrok-free.dev/api/v1
ARG NEXT_PUBLIC_BASE_URL=https://obeyable-isothermally-kelly.ngrok-free.dev

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_BASE_URL
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects anonymous telemetry data about general usage
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line to disable telemetry at build time
# ENV NEXT_TELEMETRY_DISABLED 1

# Ensure Next.js bundles the correct backend URL.
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL

# Build the application
RUN npm run build

# Production image, copy all files and run next
FROM base AS runner
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_BASE_URL
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line to disable telemetry at runtime
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

# Keep runtime env consistent with what we bundled at build time.
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL

# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
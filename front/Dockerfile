# base on buster-slim
FROM node:14-buster-slim AS base
WORKDIR /base
RUN apt-get update && apt-get upgrade -y

# dependencies
COPY package*.json ./
RUN npm install
COPY . .

# build
FROM base AS build
ENV STRAPI_API_URL=https://api.sevenhills-restaurant.de
ENV NODE_ENV=production
WORKDIR /build
COPY --from=base /base ./
RUN npm run build

# production
FROM build AS production
WORKDIR /home/node/app
ENV NODE_ENV=production
ENV STRAPI_API_URL=https://api.sevenhills-restaurant.de
COPY --from=build --chown=node:node /build/next.config.js ./
COPY --from=build --chown=node:node /build/next-i18next.config.js ./
COPY --from=build --chown=node:node /build/public ./public
COPY --from=build --chown=node:node /build/.next ./.next
COPY --from=build --chown=node:node /build/node_modules ./node_modules
USER node
RUN npx next telemetry disable
EXPOSE 3001
CMD ["node_modules/.bin/next", "start", "-p", "3001"]


# # Install dependencies only when needed
# FROM node:alpine AS deps
# # Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat make gcc g++ py-pip
# WORKDIR /app
# COPY package.json ./
# RUN yarn install
# RUN apk del make gcc g++ py-pip

# # Rebuild the source code only when needed
# FROM node:alpine AS builder
# WORKDIR /app
# COPY . .
# COPY --from=deps /app/node_modules ./node_modules
# ENV STRAPI_API_URL=https://api.sevenhills-restaurant.de
# ENV NODE_ENV production
# RUN yarn build && yarn install --production --ignore-scripts --prefer-offline

# # Production image, copy all the files and run next
# FROM node:alpine AS runner
# WORKDIR /app

# ENV NODE_ENV production

# RUN addgroup -g 1001 -S nodejs
# RUN adduser -S nextjs -u 1001

# # You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /app/next.config.js ./
# COPY --from=builder /app/next-i18next.config.js ./
# COPY --from=builder /app/public ./public
# COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json

# USER nextjs

# EXPOSE 3000

# # Next.js collects completely anonymous telemetry data about general usage.
# # Learn more here: https://nextjs.org/telemetry
# # Uncomment the following line in case you want to disable telemetry.
# ENV NEXT_TELEMETRY_DISABLED 1

# ENV STRAPI_API_URL=https://api.sevenhills-restaurant.de
# CMD ["node_modules/.bin/next", "start", "-p", "3001"]

FROM node:14-buster-slim AS base
WORKDIR /base
COPY package*.json ./
RUN npm install
COPY . .

FROM base AS build
ENV NODE_ENV=production
WORKDIR /build
COPY --from=base /base ./
RUN npm run build

# Production image, copy all the files and run next
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

EXPOSE 3000
# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
RUN npx next telemetry disable

CMD ["node_modules/.bin/next", "start"]

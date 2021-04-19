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
ENV NODE_ENV=production
WORKDIR /build
COPY --from=base /base ./
RUN npm run build

# production
FROM build AS production
WORKDIR /home/node/app
ENV NODE_ENV=production
ENV STRAPI_API_URL=https://api.linus.cx
COPY --from=build --chown=node:node /build/next.config.js ./
COPY --from=build --chown=node:node /build/next-i18next.config.js ./
COPY --from=build --chown=node:node /build/public ./public
COPY --from=build --chown=node:node /build/.next ./.next
COPY --from=build --chown=node:node /build/node_modules ./node_modules
USER node
RUN npx next telemetry disable
EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]

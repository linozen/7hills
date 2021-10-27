# base on buster-slim
FROM node:14-buster-slim AS base
WORKDIR /srv/app
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get upgrade -qq

# dependencies
FROM base AS dependencies
COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn install

# build
FROM dependencies AS build
COPY . .
ENV NODE_ENV production
ENV WEBSITE https://api.sevenhills-restaurant.de
ENV DATABASE_FILENAME /home/node/app/data/data.db
RUN yarn build --clean

# production
FROM build as release
ENV WEBSITE https://api.sevenhills-restaurant.de
COPY --chown=1000:1000 --from=build /srv/app /home/node/app
USER node
WORKDIR /home/node/app
EXPOSE 1337
CMD ["yarn", "start"]

# base on buster-slim
FROM node:14-buster-slim AS base
WORKDIR /srv/app

# dependencies
FROM base AS dependencies
COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn install

# build
FROM dependencies AS build
COPY . .
ENV NODE_ENV production
ENV DATABASE_FILENAME /home/node/app/data/data.db
RUN yarn build --clean

# release
FROM build as release
COPY --chown=1000:1000 --from=build /srv/app /home/node/app
USER node
WORKDIR /home/node/app
EXPOSE 1337
CMD ["yarn", "start"]

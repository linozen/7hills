FROM bitnami/node:14 as base
WORKDIR /app
COPY . .
RUN yarn install

# Development
FROM base as dev
WORKDIR /app
EXPOSE 3001
CMD ["yarn", "develop"]

# Building
FROM base as build
WORKDIR /app
COPY --from=base /app .
RUN yarn build --clean

# Production
FROM bitnami/node:14-prod as prod
WORKDIR /app
RUN groupadd -g 999 appuser && \
    useradd -r -u 999 -g appuser appuser
USER appuser
COPY --chown=appuser package.json .
COPY --from=build --chown=appuser /app .
ENV NODE_ENV=production
EXPOSE 1337
CMD ["yarn", "start"]

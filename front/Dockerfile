FROM bitnami/node:16 as base
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install

# Development
FROM base as dev
WORKDIR /app
EXPOSE 3001
CMD ["npm", "run", "dev"]

# Building
FROM base as build
WORKDIR /app
COPY . .
COPY --from=base /app .
ENV CMS_URL=https://api.sevenhills-restaurant.de
RUN npm run build
RUN npm prune --production

# Production
FROM bitnami/node:16-prod as prod
WORKDIR /app
RUN groupadd -g 999 appuser && \
    useradd -r -u 999 -g appuser appuser
USER appuser
COPY --chown=appuser package.json .
COPY --from=build --chown=appuser /app/public ./public
COPY --from=build --chown=appuser /app/.next ./.next
COPY --from=build --chown=appuser /app/node_modules ./node_modules
COPY --from=build --chown=appuser /app/next-i18next.config.js ./next-i18next.config.js
COPY --from=build --chown=appuser /app/next-seo.config.js ./next-seo.config.js
COPY --from=build --chown=appuser /app/next-sitemap.js ./next-sitemap.js
ENV NODE_ENV=production
EXPOSE 3001
CMD ["npm", "run", "start"]

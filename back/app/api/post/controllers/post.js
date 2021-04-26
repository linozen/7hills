'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { sanitizeEntity } = require('strapi-utils')
module.exports = {
    async find(ctx) {
        let entities;
        if (ctx.query._q) {
            entities = await strapi.services.post.search(ctx.query);
        } else {
            entities = await strapi.services.post.find(ctx.query);
        }
        const url = strapi.config.get('server.url')
        let newEntities = entities.map(e => {
            let newEnt = {}
            newEnt["content_en"] = e.content_en.replace(/\/uploads/, `${url}/uploads`)
            newEnt["content_de"] = e.content_de.replace(/\/uploads/, `${url}/uploads`)
            newEnt["title_en"] = e.title_en
            newEnt["title_de"] = e.title_de
            newEnt["excerpt_en"] = e.excerpt_en
            newEnt["excerpt_de"] = e.excerpt_de
            newEnt["slug"] = e.slug
            newEnt["date"] = e.date
            newEnt["coverImage"] = e.coverImage
            newEnt["video"] = e.video === null ? { url: "no_video" } : e.video
            return newEnt
        })
        return newEntities.map(entity => sanitizeEntity(entity, { model: strapi.models.post }));
    },
};

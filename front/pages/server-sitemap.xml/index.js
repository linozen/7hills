// pages/server-sitemap.xml/index.tsx

import { getServerSideSitemap } from 'next-sitemap'
import { getAllPostsForSoul } from '../../lib/api'

export async function getServerSideProps(ctx) {
    // Method to source urls from cms
    const data = await getAllPostsForSoul();

    const fields_en = data.map(p => {
        let properties = {
            "loc": "https://www.sevenhills-restaurant.de/soul/" + p.slug,
            "lastmod": new Date(p.date).toDateString(),
        }
        return properties
    });
    const fields_de = data.map(p => {
        let properties = {
            "loc": "https://www.sevenhills-restaurant.de/de/soul/" + p.slug,
            "lastmod": new Date(p.date).toISOString(),
        }
        return properties
    });

    const fields = fields_en.concat(fields_de)
    return getServerSideSitemap(ctx, fields)
}

// Default export to prevent next.js errors
export default () => { }

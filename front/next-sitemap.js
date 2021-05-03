// next-sitemap.js
module.exports = {
  siteUrl: 'https://www.sevenhills-restaurant.de',
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'], // <= exclude here
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://www.sevenhills-restaurant.de/server-sitemap.xml', // <==== Add here
    ],
  },
}

// module.exports = {
//     siteUrl: 'https://sevenhills-restaurant.de',
//     generateRobotsTxt: true,
//     sitemapSize: 7000,
// }

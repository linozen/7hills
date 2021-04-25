const { i18n } = require("./next-i18next.config");
const withPWA = require("next-pwa");
const prod = process.env.NODE_ENV === "production";

module.exports = withPWA({
  async headers() {
    return [
      {
        // This works, and returns appropriate Response headers:
        source: '/(.*).(jpg|png)',
        headers: [
          {
            key: 'Cache-Control',
            value:
              'public, max-age=180, s-maxage=180, stale-while-revalidate=180',
          },
        ],
      },
      {
        // This doesn't work for 'Cache-Control' key (works for others though):
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            // Instead of this value:
            value: 'public, max-age=180, s-maxage=180, stale-while-revalidate=180',
            // Cache-Control response header is `public, max-age=60` in production
            // and `public, max-age=0, must-revalidate` in development
          },
        ],
      },
    ]
  },
  future: { webpack5: true },
  i18n,
  images: {
    domains: ["localhost", "api.sevenhills-restaurant.de", "sevenhills-restaurant.de"]
  },
  pwa: {
    disable: prod ? false : true,
    dest: "public",
    fallbacks: {
      image: '/trees.png',
      document: '/fallback'
    }
  },
});

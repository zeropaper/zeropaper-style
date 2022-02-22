/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['res.cloudinary.com']
  },
  async redirects() {
    return [
      // {
      //   source: '/',
      //   destination: '/docs/getting-started',
      //   permanent: false
      // },
      // {
      //   source: '/docs/',
      //   destination: '/docs/getting-started',
      //   permanent: false
      // }
    ]
  },
  trailingSlash: true,
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx']
}

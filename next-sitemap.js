/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.ory.sh',
  generateRobotsTxt: true // (optional)
  // ...other options
}
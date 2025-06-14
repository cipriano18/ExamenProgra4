// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development', // para que no active el PWA en modo dev
});

module.exports = withPWA({
  reactStrictMode: true,
});

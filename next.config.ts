/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compress: true,
    images: {
        domains: ['localhost'],
    },
};

// Importa y configura bundle analyzer
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

// Importa y configura next-pwa
const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
});

// Aplica ambos plugins sobre nextConfig (encadenados)
module.exports = withBundleAnalyzer(withPWA(nextConfig));

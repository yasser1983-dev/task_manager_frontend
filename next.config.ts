/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compress: true,
    images: {
        domains: ['localhost'],
    },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
});

const isTurbopack = process.env.NEXT_RUNTIME === 'edge'; // o alguna variable para detectar turbopack

if (isTurbopack) {
    module.exports = nextConfig;
} else {
    module.exports = withBundleAnalyzer(withPWA(nextConfig));
}

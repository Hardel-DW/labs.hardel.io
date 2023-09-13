/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        serverActions: true
    },
    images: {
        domains: ['hardel.io', 'avatars.githubusercontent.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.hardel.io'
            }
        ]
    }
};

module.exports = nextConfig;

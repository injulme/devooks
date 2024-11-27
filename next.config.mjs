/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '43.200.166.129',
        port: '',
        pathname: '/static/**',
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  rewrites: async () => {
    return [
      {
        source: '/static/:path*',
        destination: process.env.NEXT_PUBLIC_BASE_URL + '/static/:path*',
      },
      {
        source: '/api/:path*',
        destination: process.env.NEXT_PUBLIC_BASE_URL + '/api/:path*',
      },
    ];
  },
};

export default nextConfig;

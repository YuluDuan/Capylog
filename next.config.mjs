/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
          allowedOrigins: ['my-proxy.com', '*.my-proxy.com'],
        },
      },
    reactStrictMode: true,
      env: {
        COHERE_API_KEY: process.env.COHERE_API_KEY,
        PASSAGE_APP_ID: process.env.PASSAGE_APP_ID
    }
};

export default nextConfig;

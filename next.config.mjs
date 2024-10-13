// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack(config) {
      return config;
    },
    images: {
      domains: ['utfs.io'], // Agrega el dominio aquí
    },
  }
  
  export default nextConfig;
  
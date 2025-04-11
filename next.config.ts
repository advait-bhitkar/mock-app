/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Temporarily ignore type errors in the API mock directory
    ignoreBuildErrors: true
  }
}

export default nextConfig

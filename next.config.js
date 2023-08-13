/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: "export",
    // reactStrictMode: false,
    // distDir: 'build',
    images: {
        unoptimized: true,
        domains: ['smartavijogbox.com', 'media.smartavijogbox.com']
    }
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
    //add other configs here too
    env: {
        NEXT_API_URL:process.env.NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_IMG_PATH:process.env.NEXT_PUBLIC_IMG_PATH
    },
    images: {
        domains: ['assets.deshkalnews.com'],
      },
}

export default nextConfig;

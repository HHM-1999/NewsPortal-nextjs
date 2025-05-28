/** @type {import('next').NextConfig} */
const nextConfig = {
    //add other configs here too
    env: {
        NEXT_API_URL:process.env.NEXT_PUBLIC_API_URL,
    },
}

export default nextConfig;

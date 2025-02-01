import nextPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'www.gravatar.com',
      'images.unsplash.com',
      'blog.pelavor.com',
      'api.pelavor.com',
      'cdn.pelavor.com',
      'assets.pelavor.com',
      'files.pelavor.com',
      'pelavor.com',
    ],
  },
};

const withPWA = nextPWA({
  dest: 'public',
});

export default withPWA(nextConfig);

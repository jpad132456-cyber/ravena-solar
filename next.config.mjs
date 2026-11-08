// A página continua sendo o mesmo HTML, CSS e JavaScript de antes, servidos de public/.
// O endereço "/" mostra public/index.html, como no site estático.
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [{ source: '/', destination: '/index.html' }]
    };
  }
};

export default nextConfig;

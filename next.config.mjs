/** @type {import('next').NextConfig} */
const normalizeBaseUrl = (value) => {
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value.replace(/\/$/, "");
  }

  return `http://${value.replace(/\/$/, "")}`;
};

const backendApiBaseUrl = normalizeBaseUrl(
  process.env.NEXT_PUBLIC_API_BASE_URL || "localhost:5001",
);

const nextConfig = {
  // --- Existing Configuration ---
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },

  // --- Security Enhancements ---
  reactStrictMode: true,
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // {
          //   key: 'Content-Security-Policy',
          //   value: generateCsp(),
          // },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  rewrites: async () => [
    {
      source: "/api/:path*",
      destination: `${backendApiBaseUrl}/:path*`,
    },
  ],
};

export default nextConfig;

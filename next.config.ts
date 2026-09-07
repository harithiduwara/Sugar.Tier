import type { NextConfig } from "next";

/**
 * The site is deployed as a fully static bundle to GitHub Pages.
 *
 * A GitHub *project* page is served from `https://<user>.github.io/<repo>/`, so
 * every asset and route has to be prefixed with the repository name. The
 * deployment workflow sets `NEXT_PUBLIC_BASE_PATH` accordingly; local builds and
 * custom-domain deployments leave it empty.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  basePath,
  // GitHub Pages has no rewrite engine, so emit `/cakes/index.html` rather than
  // `/cakes.html` — that is the only shape Pages can resolve without a server.
  trailingSlash: true,
  // The on-demand image optimizer needs a Node runtime, which static hosting
  // does not provide. Assets are pre-sized at build time instead.
  images: { unoptimized: true },
  typedRoutes: true,
};

export default nextConfig;

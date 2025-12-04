import path from 'path';
import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const internalHost = process.env.INTERNAL_HOST ?? 'localhost';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  
  turbopack: {
    root: path.resolve(__dirname), // 使用绝对路径以确保 Next 使用正确的根目录
  },

  assetPrefix: isProd ? undefined : `http://${internalHost}:3000`,

  images: {
    unoptimized: true,
  },
};

export default nextConfig;

import type { NextConfig } from "next";
import path from 'path';
import dotenv from 'dotenv'
import { initStore } from './src/lib/sessionStore';

const projectDir =  path.resolve(process.cwd(), '../')
dotenv.config({ path: `${projectDir}/.env` })

initStore();
//clearStore();

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

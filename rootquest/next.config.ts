import type { NextConfig } from "next";
import path from 'path';
 import dotenv from 'dotenv'
 
 
 const projectDir =  path.resolve(process.cwd(), '../')
 dotenv.config({ path: `${projectDir}/.env` })

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
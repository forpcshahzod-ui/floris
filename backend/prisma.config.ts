import { defineConfig } from '@prisma/config';

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
    directUrl: process.env.DATABASE_URL, // Ikkalasi ham bir xil DATABASE_URL ga qarasa bo'laveradi
  },
});

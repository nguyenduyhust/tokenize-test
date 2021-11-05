import { exec } from 'child_process';
import * as dotenv from 'dotenv';

// dotenv.config({
//   path: `.env.${process.env.NODE_ENV || 'development'}`,
// });

// const apiDocsUrl = process.env.NEXT_PUBLIC_API_DOCS_URL || 'http://localhost:4000/api/doc-json';
const apiDocsUrl = 'http://localhost:4000/api/doc-json';

exec(
  `node_modules/.bin/openapi-typescript ${apiDocsUrl} --output src/types/api.type.ts`,
  (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`Generate api type success: ${stdout}`);
  },
);

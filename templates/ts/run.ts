#!/usr/bin/env ts-node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

/**
 * Recursively search for a file with the exact name in the given directory.
 * @param dir The directory to start searching from.
 * @param target The file name to search for.
 * @returns The full path to the file if found, otherwise null.
 */
function findFileRecursively(dir: string, target: string): string | null {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isFile() && entry.name === target) {
      return fullPath;
    } else if (entry.isDirectory()) {
      const found = findFileRecursively(fullPath, target);
      if (found) return found;
    }
  }
  return null;
}

// Get the target file name from command line arguments; default to "index.ts"
const args = process.argv.slice(2);
const targetFile = args[0] || 'index.ts';

// Start searching from the current working directory
const foundFile = findFileRecursively(process.cwd(), targetFile);
if (!foundFile) {
  console.error(`❌ File "${targetFile}" not found recursively.`);
  process.exit(1);
}

console.log(`▶ Found file: ${foundFile}`);
console.log(`▶ Running: npx ts-node ${foundFile}`);

try {
  execSync(`npx ts-node ${foundFile}`, { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Error executing file:', error);
  process.exit(1);
}

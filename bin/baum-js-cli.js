#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const args = process.argv.slice(2);
const command = args[0];
const projectName = args[1];
const options = args.slice(2);

// If no options are specified, default to JavaScript practice.
const includeJS = options.includes('--js') || (!options.includes('--ts') && !options.includes('--playwright'));
const includeTS = options.includes('--ts');
const includePlaywright = options.includes('--playwright');

if (command === 'init' && projectName) {
  const targetDir = path.resolve(process.cwd(), projectName);
  if (fs.existsSync(targetDir)) {
    console.error(`❌ Directory "${projectName}" already exists.`);
    process.exit(1);
  }
  fs.mkdirSync(targetDir, { recursive: true });
  
  // Helper function to copy a folder recursively.
  function copyTemplate(srcDir, destDir) {
    const entries = fs.readdirSync(srcDir, { withFileTypes: true });
    entries.forEach((entry) => {
      const srcPath = path.join(srcDir, entry.name);
      const destPath = path.join(destDir, entry.name);
      if (entry.isDirectory()) {
        fs.mkdirSync(destPath, { recursive: true });
        copyTemplate(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    });
  }

  if (includeJS) {
    const jsTarget = path.join(targetDir, 'js-practice');
    fs.mkdirSync(jsTarget, { recursive: true });
    const jsTemplatePath = path.resolve(__dirname, '../templates/js');
    copyTemplate(jsTemplatePath, jsTarget);
    console.log(`✅ JavaScript practice module created at ${jsTarget}`);
  }

  if (includeTS) {
    const tsTarget = path.join(targetDir, 'ts-practice');
    fs.mkdirSync(tsTarget, { recursive: true });
    const tsTemplatePath = path.resolve(__dirname, '../templates/ts');
    copyTemplate(tsTemplatePath, tsTarget);
    console.log(`✅ TypeScript practice module created at ${tsTarget}`);
    // Run npm i in ts-practice to install dependencies
    console.log(`📦 Installing dependencies in ts-practice...`);
    execSync('npm i', { cwd: tsTarget, stdio: 'inherit' });
  }

  if (includePlaywright) {
    const pwTarget = path.join(targetDir, 'playwright-practice');
    fs.mkdirSync(pwTarget, { recursive: true });
    const pwTemplatePath = path.resolve(__dirname, '../templates/playwright');
    copyTemplate(pwTemplatePath, pwTarget);
    console.log(`✅ Playwright practice module created at ${pwTarget}`);
    // Run npm i in playwright-practice to install dependencies
    console.log(`📦 Installing dependencies in playwright-practice...`);
    execSync('npm i', { cwd: pwTarget, stdio: 'inherit' });
  }

  console.log(`✅ Project "${projectName}" created with selected modules.`);
  console.log(`👉 cd ${projectName} and explore your modules.`);
} else {
  console.log('Usage: baum-js-cli init <project-name> [--js] [--ts] [--playwright]');
}

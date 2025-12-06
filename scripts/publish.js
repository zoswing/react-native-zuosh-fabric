#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Publishing react-native-zuosh-fabric...');

try {
  // Check if we're on the main branch and have no uncommitted changes
  const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
  const status = execSync('git status --porcelain', { encoding: 'utf8' }).trim();

  if (branch !== 'main' && branch !== 'master') {
    throw new Error('Must be on main or master branch to publish');
  }

  if (status) {
    throw new Error('Working directory is not clean. Commit or stash changes first.');
  }

  // Build the package
  console.log('📦 Building package...');
  execSync('npm run build', { stdio: 'inherit' });

  // Check package version
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  console.log(`📋 Publishing version ${packageJson.version}...`);

  // Publish to npm
  console.log('📤 Publishing to npm...');
  execSync('npm publish --access public', { stdio: 'inherit' });

  // Create git tag
  console.log('🏷️ Creating git tag...');
  execSync(`git tag v${packageJson.version}`, { stdio: 'inherit' });
  execSync(`git push origin v${packageJson.version}`, { stdio: 'inherit' });

  console.log('✅ Package published successfully!');
} catch (error) {
  console.error('❌ Publish failed:', error.message);
  process.exit(1);
}

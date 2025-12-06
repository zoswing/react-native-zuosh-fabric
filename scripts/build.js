#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building react-native-zuosh-fabric...');

try {
  // Clean lib directory
  if (fs.existsSync('lib')) {
    fs.rmSync('lib', { recursive: true, force: true });
  }
  fs.mkdirSync('lib');

  // Build TypeScript
  console.log('📦 Building TypeScript...');
  execSync('npx tsc', { stdio: 'inherit' });

  // Copy source files
  console.log('📋 Copying source files...');
  fs.cpSync('src', 'lib', { recursive: true });

  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

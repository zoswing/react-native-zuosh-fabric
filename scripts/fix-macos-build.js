#!/usr/bin/env node

/**
 * React Native ZuoSh Fabric - macOS 构建修复脚本
 * 
 * 此脚本自动检测运行环境并修复 macOS 上的 Android NDK 链接器问题
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

function detectPlatform() {
  return os.platform(); // 'darwin', 'win32', 'linux'
}

function isMacOS() {
  return detectPlatform() === 'darwin';
}

function backupFile(filePath) {
  if (fs.existsSync(filePath)) {
    const backupPath = `${filePath}.backup.${Date.now()}`;
    fs.copyFileSync(filePath, backupPath);
    console.log(`✅ 备份文件: ${backupPath}`);
    return backupPath;
  }
  return null;
}

function fixGradleProperties() {
  const gradlePropsPath = path.join(__dirname, '../android/gradle.properties');
  
  if (!fs.existsSync(gradlePropsPath)) {
    console.log('❌ 找不到 gradle.properties 文件');
    return false;
  }

  backupFile(gradlePropsPath);
  
  let content = fs.readFileSync(gradlePropsPath, 'utf8');
  
  // 添加 macOS 特定的修复
  const macosFixes = `
# macOS 构建修复 - 自动生成
android.enableCmakeCompilerSettings=false
android.enableLto=false
android.enableParallelJsonGen=false

# 禁用 gold 链接器 (macOS 不支持)
android.cmake.enableHardening=false
`;

  // 如果已经有这些设置，先移除再添加
  const lines = content.split('\n');
  const filteredLines = lines.filter(line => 
    !line.includes('android.enableCmakeCompilerSettings') &&
    !line.includes('android.enableLto') &&
    !line.includes('android.enableParallelJsonGen') &&
    !line.includes('android.cmake.enableHardening') &&
    !line.includes('macOS 构建修复')
  );
  
  content = filteredLines.join('\n') + macosFixes;
  
  fs.writeFileSync(gradlePropsPath, content);
  console.log('✅ 修复 gradle.properties');
  return true;
}

function fixBuildGradle() {
  const buildGradlePath = path.join(__dirname, '../android/build.gradle');
  
  if (!fs.existsSync(buildGradlePath)) {
    console.log('❌ 找不到 build.gradle 文件');
    return false;
  }

  backupFile(buildGradlePath);
  
  let content = fs.readFileSync(buildGradlePath, 'utf8');
  
  // 在 defaultConfig 中添加 externalNativeBuild
  const defaultConfigRegex = /(defaultConfig\s*\{[^}]*versionName "1\.0\.0"[^}]*)(\})/;
  const replacement = `$1\n        \n        // macOS 构建修复\n        externalNativeBuild {\n            cmake {\n                arguments \"-DANDROID_STL=c++_shared\", \"-DCMAKE_VERBOSE_MAKEFILE=ON\", \"-DANDROID_TOOLCHAIN=clang\"\n                cppFlags \"-frtti -fexceptions\"\n            }\n        }$2`;
  
  if (defaultConfigRegex.test(content)) {
    content = content.replace(defaultConfigRegex, replacement);
    fs.writeFileSync(buildGradlePath, content);
    console.log('✅ 修复 build.gradle');
    return true;
  } else {
    console.log('⚠️  无法找到 defaultConfig 块进行修改');
    return false;
  }
}

function fixPackageJson() {
  const packageJsonPath = path.join(__dirname, '../package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    console.log('❌ 找不到 package.json 文件');
    return false;
  }

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // 添加构建脚本
  if (!packageJson.scripts) {
    packageJson.scripts = {};
  }
  
  packageJson.scripts['fix-macos-build'] = 'node scripts/fix-macos-build.js';
  packageJson.scripts['build:android:macos'] = 'npm run fix-macos-build && cd android && ./gradlew assembleRelease';
  
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('✅ 更新 package.json 脚本');
  return true;
}

function createCMakeListsTxt() {
  // 创建一个基本的 CMakeLists.txt 来覆盖默认配置
  const cmakeListsPath = path.join(__dirname, '../android/CMakeLists.txt');
  
  const cmakeContent = `# React Native ZuoSh Fabric - CMake 配置
# 修复 macOS 上的链接器问题

cmake_minimum_required(VERSION 3.22.1)
project("reactnativezuoshfabric")

# 设置 C++ 标准
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# 禁用 LTO (Link Time Optimization) - 避免 gold 链接器问题
set(CMAKE_INTERPROCEDURAL_OPTIMIZATION FALSE)

# 使用兼容的链接器选项
if(ANDROID)
  set(CMAKE_EXE_LINKER_FLAGS "${CMAKE_EXE_LINKER_FLAGS} -fno-objc-arc")
  set(CMAKE_SHARED_LINKER_FLAGS "${CMAKE_SHARED_LINKER_FLAGS} -fno-objc-arc")
endif()

# 如果有源文件，添加这里
# add_library(reactnativezuoshfabric SHARED
#   src/main/cpp/your-source-files.cpp
# )

target_compile_definitions(reactnativezuoshfabric PRIVATE RN_EXPORT=1)
`;

  backupFile(cmakeListsPath);
  fs.writeFileSync(cmakeListsPath, cmakeContent);
  console.log('✅ 创建 CMakeLists.txt');
  return true;
}

function main() {
  console.log('🔧 React Native ZuoSh Fabric - macOS 构建修复工具');
  console.log(`📱 检测平台: ${detectPlatform()}`);
  
  if (!isMacOS()) {
    console.log('ℹ️  非 macOS 平台，无需修复');
    return;
  }
  
  console.log('🛠️  开始修复 macOS 构建问题...');
  
  const fixes = [
    fixGradleProperties,
    fixBuildGradle,
    fixPackageJson,
    createCMakeListsTxt
  ];
  
  let successCount = 0;
  fixes.forEach(fix => {
    if (fix()) {
      successCount++;
    }
  });
  
  console.log(`\\n📊 修复完成: ${successCount}/${fixes.length} 项成功`);
  
  if (successCount > 0) {
    console.log('\\n✅ 修复完成！现在可以尝试运行:');
    console.log('   npm run build:android:macos');
    console.log('\\n🧹 建议清理缓存后重新构建:');
    console.log('   cd android && ./gradlew clean');
  } else {
    console.log('\\n❌ 没有应用任何修复');
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  fixGradleProperties,
  fixBuildGradle,
  fixPackageJson,
  createCMakeListsTxt,
  isMacOS,
  detectPlatform
};

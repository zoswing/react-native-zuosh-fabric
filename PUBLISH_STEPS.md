# npm包发布完整指南

## 🎯 发布目标
将 `react-native-zuosh-fabric` 发布到npm，让其他开发者可以安装使用

## 📋 发布前检查清单

### ✅ 已完成的项目
- [x] React Native Fabric组件完整实现
- [x] Android原生代码（Java）
- [x] iOS原生代码（Objective-C/Swift）
- [x] TypeScript类型定义完整
- [x] 示例应用可运行
- [x] 构建脚本正常工作
- [x] GitHub Actions自动化配置
- [x] package.json配置正确
- [x] 代码gen配置正确

### 🔧 需要准备的资源
- [x] npm账号
- [x] GitHub仓库权限
- [x] 包名称可用性检查
- [x] 版本号确认

## 📦 npm包发布步骤

### 第1步：设置npm认证
```bash
# 检查当前登录状态
npm whoami

# 如果未登录，执行登录
npm login
# 输入你的npm用户名和密码
```

### 第2步：检查包名可用性
```bash
# 检查包名是否已被使用
npm view react-native-zuosh-fabric

# 如果返回404，说明包名可用
# 如果返回包信息，说明包名已被占用
```

### 第3步：更新版本号（如果需要）
```bash
# 当前版本
npm view react-native-zuosh-fabric version

# 更新版本（如需要）
npm version patch  # 1.0.1
npm version minor   # 1.1.0  
npm version major   # 2.0.0
```

### 第4步：构建包
```bash
# 确保代码是最新的
git status

# 构建项目
npm run build
```

### 第5步：创建Git标签
```bash
# 添加所有更改
git add .

# 提交更改
git commit -m "Prepare for release v1.0.0"

# 创建标签
git tag v1.0.0

# 推送到远程仓库
git push origin main
git push origin v1.0.0
```

### 第6步：发布到npm
```bash
# 方法1：使用npm script（推荐）
npm run publish

# 方法2：手动发布
npm publish --access public
```

### 第7步：验证发布
```bash
# 检查包是否发布成功
npm view react-native-zuosh-fabric

# 在浏览器中访问
# https://www.npmjs.com/package/react-native-zuosh-fabric
```

## 🚀 自动化发布流程

### 使用GitHub Actions（推荐）

你的项目已经配置了自动化发布流程：

1. **推送标签自动发布**
```bash
git tag v1.0.1
git push origin v1.0.1  # 自动触发GitHub Actions
```

2. **GitHub Actions会自动执行**：
   - 版本检查
   - 包构建
   - npm发布
   - GitHub Release创建

### 手动发布流程

如果GitHub Actions不可用，可以手动发布：

```bash
# 1. 设置npm token
export NPM_TOKEN=your_npm_token

# 2. 发布
npm run publish
```

## 📱 发布后验证

### 安装测试
```bash
# 创建新的测试项目
npx react-native init TestApp --version 0.82.0
cd TestApp

# 安装你的包
npm install react-native-zuosh-fabric

# 在App.js中使用
import { CustomButton } from 'react-native-zuosh-fabric';
```

### 社区分享
```bash
# 分享到社区
echo "🎉 我的React Native Fabric组件已发布！"
echo "📦 npm包: react-native-zuosh-fabric"
echo "🔗 安装命令: npm install react-native-zuosh-fabric"
```

## ⚠️ 发布注意事项

### 1. 版本管理
- 遵循语义化版本控制（semver）
- 每次发布前更新CHANGELOG.md
- 避免破坏性更改

### 2. 包信息完整性
```json
{
  "name": "react-native-zuosh-fabric",
  "version": "1.0.0",
  "description": "A React Native Fabric custom button component",
  "keywords": ["react-native", "fabric", "button", "component"],
  "author": "zuosh",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/zuosh/react-native-zuosh-fabric.git"
  }
}
```

### 3. 发布验证
- 确保所有文件都在.gitignore中
- 检查构建产物是否正确
- 验证package.json字段完整

## 🎯 快速发布命令总结

### 一键发布（推荐）
```bash
npm run publish
```

### 完整手动发布
```bash
npm run build
git add .
git commit -m "Release v1.0.0"
git tag v1.0.0
git push origin main v1.0.0
npm publish
```

## 🎉 发布成功标志

✅ **npm包发布**：`react-native-zuosh-fabric@1.0.0`  
✅ **GitHub Release**：自动创建发布说明  
✅ **CI/CD流程**：自动化验证和构建  
✅ **文档完整**：README和API文档齐全  
✅ **示例应用**：提供完整的使用示例  

## 📞 常见发布问题

### 问题1：权限错误
```bash
Error: 403 Forbidden - You don't have permission to publish this package
解决: 检查npm账号权限和包名所有权
```

### 问题2：版本冲突
```bash
Error: 409 Conflict - Package version already exists
解决: 更新版本号并重新发布
```

### 问题3：配置错误
```bash
Error: Invalid package.json
解决: 检查package.json格式和必需字段
```

## 💡 发布最佳实践

1. **测试充分**：发布前在多个项目中测试
2. **文档完整**：README、CHANGELOG、API文档齐全
3. **版本清晰**：使用语义化版本控制
4. **自动化**：配置CI/CD自动发布流程
5. **社区响应**：及时处理issue和PR

现在你可以按照这些步骤成功发布你的React Native Fabric组件到npm！

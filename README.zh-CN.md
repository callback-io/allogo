# Allogo - 开发者的 Logo 库

[English](README.md) | [中文](README.zh-CN.md)

**Allogo** 是一个开源的高质量品牌 Logo 库（SVG、PNG、JPG），专为开发者设计。即时搜索、浏览和下载 Logo。每个品牌都有独立的详情页面，并包含指向品牌官网的 **dofollow 外链** —— 让你的项目免费获得高质量反向链接。

对于 SVG 格式的 Logo，支持一键复制 React、Vue、Angular、Svelte 和 HTML 组件代码。

![Allogo 截图](public/screenshot.png)

## 特性

- **🔍 搜索和筛选**：通过名称或分类即时找到 Logo。
- **⚛️ 组件就绪**：一键复制 **React**、**Vue**、**Angular**、**Svelte** 组件代码。
- **🎨 暗色模式**：针对亮色和暗色主题做了优化。
- **⚡️ 高性能**：基于 Next.js 和 Tailwind CSS 构建。
- **📦 开放数据**：数据来源于 VectorLogoZone 和社区贡献。

## 🔗 免费外链

Allogo 上的每个品牌都有独立的、SEO 优化的详情页面（例如 `allogo.org/logo/your-brand`），页面中包含指向品牌官网的 **dofollow 链接**。

**如何为你的项目获取免费外链：**

1. Fork 本仓库。
2. 将你的品牌 Logo（SVG/PNG/JPG）添加到 `public/logos/your-brand/` 目录。
3. 运行 `node scripts/update-logos.js`，并填写你的网站 URL。
4. 提交 Pull Request。

就是这么简单 —— 一旦合并，你的品牌页面就会上线，获得一个永久的、被搜索引擎索引的反向链接。

## 快速上手

### 环境要求

- Node.js 18+
- pnpm

### 安装步骤

1. 克隆仓库：

   ```bash
   git clone https://github.com/callback-io/allogo.git
   cd allogo
   ```

2. 安装依赖：

   ```bash
   pnpm install
   ```

3. 启动开发服务器：

   ```bash
   pnpm run dev
   ```

4. 在浏览器中打开 [http://localhost:3000](http://localhost:3000)。

## 贡献指南

欢迎贡献！无论是添加缺失的 Logo 还是改进代码：

- **添加 Logo**：请参阅 [CONTRIBUTING.md](CONTRIBUTING.md) 了解如何添加新的 Logo。
- **反馈问题**：发现 Bug 或缺少某个 Logo？请提交 Issue。

## 许可证

代码遵循 [MIT 许可证](LICENSE)。

**声明**：所有 Logo 和商标均为其各自所有者的财产，仅供参考使用。

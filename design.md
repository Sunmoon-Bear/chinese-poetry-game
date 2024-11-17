# 项目结构与技术要点

## 项目概述
这是一个使用 Vite + React + TypeScript 搭建的现代前端项目模板。

## 目录结构
chinese-poetry-game/
├── src/
│ ├── assets/
│ ├── App.tsx # 主应用组件
│ ├── App.css # 应用样式
│ ├── main.tsx # 应用入口
│ ├── index.css # 全局样式
│ ├── vite-env.d.ts # Vite 类型声明
│ └── pages/
│    ├── poem-select/
│    │   ├── components/     # 诗词选择页专用组件
│    │   ├── styles/        # 样式文件
│    │   ├── assets/        # 专用资源
│    │   └── README.md      # 设计文档
│    └── game/
│    │   ├── components/     # 游戏页专用组件
│    │   ├── styles/        # 样式文件
│    │   ├── assets/        # 专用资源
│    │   └── README.md      # 设计文档
│    └── home/
│        ├── README.md
│        ├── components/        # 首页专用组件
│        ├── styles/           # 首页样式文件
│        └── assets/           # 首页专用资源
├── public/
├── index.html # HTML 模板
├── package.json # 项目配置和依赖
├── tsconfig.json # TypeScript 配置
├── tsconfig.app.json # 应用 TS 配置
├── tsconfig.node.json # Node 环境 TS 配置
├── vite.config.ts # Vite 配置
└── eslint.config.js # ESLint 配置

## 技术栈
- **构建工具**: Vite v5.4.10
- **前端框架**: React v18.3.1
- **开发语言**: TypeScript v5.6.2
- **代码规范**: ESLint v9.13.0

## 主要特性
1. **TypeScript 配置**
   - 使用严格模式 (strict: true)
   - 支持现代 ES 特性 (target: ES2020)
   - 使用 react-jsx 转换

2. **样式方案**
   - 支持 CSS 模块化
   - 内置响应式设计支持
   - 支持深色/浅色主题切换

3. **开发体验**
   - 热模块替换 (HMR)
   - TypeScript 类型检查
   - ESLint 代码规范检查

4. **构建优化**
   - 模块化打包
   - 代码分割
   - 资源优化

## 关键配置参考

### TypeScript 配置
参考 tsconfig.app.json:
json:tsconfig.app.json
startLine: 2
endLine: 24

### ESLint 配置
参考 eslint.config.js:
```javascript:eslint.config.js
startLine: 7
endLine: 28
```

### Vite 配置
参考 vite.config.ts:
```typescript:vite.config.ts
startLine: 1
endLine: 7
```

## 开发命令
- `npm run dev`: 启动开发服务器
- `npm run build`: 构建生产版本
- `npm run lint`: 运行代码检查
- `npm run preview`: 预览生产构建
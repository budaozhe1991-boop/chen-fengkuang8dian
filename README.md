# Tina 疯狂 8 点 (Crazy Eights)

一款经典的疯狂 8 点纸牌游戏，使用 React、Tailwind CSS 和 Framer Motion 构建。

## 🚀 部署到 Vercel

您可以按照以下步骤将此项目部署到 Vercel：

1. **同步到 GitHub**:
   - 在 Google AI Studio UI 中，点击右上角的 **Settings** (齿轮图标)。
   - 选择 **Export to GitHub**。
   - 按照提示将代码推送到您的 GitHub 仓库。

2. **在 Vercel 中导入**:
   - 登录 [Vercel 控制台](https://vercel.com)。
   - 点击 **Add New...** -> **Project**。
   - 导入您刚刚创建的 GitHub 仓库。

3. **配置环境变量**:
   - 在部署设置中，找到 **Environment Variables** 部分。
   - 添加 `GEMINI_API_KEY` (如果您在代码中使用了 Gemini API)。
   - 点击 **Deploy**。

## 🛠️ 本地开发

1. 安装依赖:
   ```bash
   npm install
   ```

2. 启动开发服务器:
   ```bash
   npm run dev
   ```

3. 构建项目:
   ```bash
   npm run build
   ```

## 🎮 游戏规则

- 匹配相同花色或点数出牌。
- **8 点** 是万能牌，可随时打出。
- 打出 8 点后可指定新的花色。
- 先清空手牌的一方获胜。

## 📦 技术栈

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Animation**: Framer Motion
- **Icons**: Lucide React

# Foundry Market

一个用 **Next.js 15（App Router）**、**TypeScript** 和 **Framer Motion** 搭建的产品展示与购物交互原型。

> 当前状态：单页交互原型。无后端、无持久化、无登录。

---

## 快速开始

```bash
npm install
npm run dev      # http://localhost:3000
```

其他命令：

```bash
npm run build       # 生产构建
npm start           # 启动生产服务
npm run lint        # ESLint（max-warnings=0）
npm run format      # Prettier 自动格式化
npm run check       # format:check + lint + build  （CI 用）
```

需要 Node 18.18+（Next 15 的最低要求）。

---

## 已完成的内容

### 已实现的功能

- **单页店铺**：深色编辑式 Hero、3 列商品网格、价值主张条、深色页脚。
- **客户端搜索 + 分类筛选**：实时结果数 + 空状态展示。
- **快速加入购物车**：按钮飞出"Added"反馈动画，约 900ms 后自动消失。
- **购物车抽屉**：数量增减、单行小计、合计、$150 免运费进度条。
- **收藏（爱心）**：每个商品可独立切换，仅存内存。
- **移动端菜单**：左侧滑入 + 遮罩。
- **鼠标光晕**：跟随光标的柔光效果（仅桌面端，≤ 900px 自动关闭，且尊重 `prefers-reduced-motion`）。
- **公告条 ticker**：横向滚动动画。
- **响应式断点**：900px（平板）、620px（手机）。
- **减弱动效支持**：通过 `globals.css` 末尾的全局媒体查询。

### 已手动验证的场景

- 搜索框边输边过滤；无结果时显示"No pieces found"空状态。
- 分类 tab 按 `Home` / `Carry` / `Kitchen` / `Objects` 过滤；点击当前激活的 tab 是无操作。
- 同一商品加入两次，数量递增；减到 0 则移除该行。
- 免运费进度按比例填充；$150 达到 100%，文案切换为"Unlocked!"。
- 购物车角标在数量变化时通过 `AnimatePresence` 做小幅度旋入动画。
- 购物车、移动菜单、搜索条 四个交互面 入场/退场动画干净，不会留下残留遮罩或焦点卡死。
- 在 320px、768px、1280px、1920px 四个宽度下布局都不破。

---

## 架构说明

### 状态管理

所有客户端状态都在一个自定义 Hook 里：

```ts
// hooks/use-storefront.ts
const { cart, liked, search, category, ...actions } = useStorefront();
```

**没有** Redux、Zustand、Context 或 URL 状态。筛选/搜索输入是局部 React state——刷新页面就清空。

### 为什么 `Storefront` 是个 Client Component

`components/storefront.tsx` 开头是 `"use client"`，因为这个页面需要：

- React Hooks（`useState`、`useMemo`、`useMotionValue`、`useSpring`）
- `window.setTimeout`（用于"Added"自动消失）
- `onPointerMove`（用于光晕）
- Framer Motion 的动画引擎

整页是"打开即可交互"，目前**没有任何**部分能从 SSR 中获益。

### 样式

所有样式都在**一个 CSS 文件**里（`app/globals.css`）。没有 Tailwind、CSS Modules 或 `styled-components`。

- 统一一套主题——**编辑式柔光未来感**（暖沙米纸、深墨文字、单一克制的电光紫 `#6c5fce`）。
- 颜色、字体、线条样式通过 `:root` 上的 CSS 变量管理。
- 响应式规则放在文件末尾（不在组件里嵌套 `clamp()`）。

### 数据

商品数据是 `data/products.ts` 里手写的 6 个对象，图片用 Unsplash 链接。没有 API 路由、没有 CMS、没有额外的图片优化（只用 Next 默认的 `Image` 组件自动 resize）。

### 组件构成

| 文件 | 作用 |
|---|---|
| `app/page.tsx` | 渲染 `<Storefront />` |
| `app/layout.tsx` | 加载 DM Sans + Playfair Display，应用全局样式 |
| `components/storefront.tsx` | 客户端根组件，把 state 串起来 |
| `components/header.tsx` | 公告 ticker、Logo、导航、搜索、购物车 |
| `components/hero-section.tsx` | 深色编辑式 Hero，含徽章和浮动卡片 |
| `components/product-section.tsx` | 区块标题、筛选 tab、商品网格、空状态 |
| `components/product-card.tsx` | 单个商品卡，含 hover 快速加入 |
| `components/cart-drawer.tsx` | 右侧购物车抽屉 |
| `components/mobile-menu.tsx` | 左侧移动端菜单 |
| `components/footer.tsx` | 价值条 + 深色页脚 |
| `hooks/use-storefront.ts` | 所有客户端 state 和派生值 |

---

## 已知问题

以下是原型的"已知债"，不是 bug，但接手前你应该知道：

- **没有持久化。** 关掉页面，购物车、收藏、筛选全丢。`localStorage` 是显而易见的下一步（见下文"取舍"）。
- **没有真正的结账。** Checkout 按钮是纯展示，不会调任何支付服务。
- **没有登录/账户。** 单个匿名用户。
- **没有商品详情页。** 点击商品没反应，所有交互都发生在首页。
- **没有图片错误处理。** 如果 Unsplash 链接 404，卡片就显示 alt 文字 + 一个破图标。
- **鼠标光晕** 在触屏设备上可能很突兀——虽然 ≤ 900px 已隐藏，但带精细指针的二合一设备可能仍会看到。`prefers-reduced-motion` 下会完全隐藏。
- **公告 ticker** 是装饰性的，文案写死。
- **搜索没有 `<form>` 包装。** 按 Enter 没反应，靠每次按键触发。
- **没有购物车抽屉的键盘快捷键**（比如 Esc 关闭）。
- **`next/image` 没配 `remotePatterns`**——图片仍能显示是因为 Next 兜底了，但要正经部署前应该补上 `next.config.js` 的配置。
- **无障碍是半成品。** 按钮有 `aria-label`，但购物车数量变化没通知屏幕阅读器；搜索输入框没有可见 label；焦点不会被锁在抽屉或菜单里。
- **零测试。** 没有任何单元、集成或 e2e。`npm run check` 是唯一的自动化质量门。

---

## 主要取舍

下面这些决策都值得拷问——但每个都有当时选它的理由：

### 1. 整页用一个大 Client Component

`Storefront` 是 `"use client"` 并且包揽一切。好处是心智模型简单，state 不用层层透传；代价是**完全没享受到 SSR**——首屏直接是交互态。

如果你需要快速首屏或 SEO，应该拆：

- 把 `HeroSection`、`ProductSection`、`Footer` 拆成 Server Component。
- 用 URL 搜索参数驱动筛选（`?category=Home&q=lamp`），让首屏就是过滤后的结果。
- 只把 `Header`、`CartDrawer`、`MobileMenu` 保留为 Client Component（因为要交互 state）。

### 2. 没接 `localStorage`

为了简单选了内存 state。补一个 20 行的 `useEffect` 把 `cart` 和 `liked` 同步到 `localStorage`，会让"真实感"强很多且成本极低。之所以没做，是因为"刷新即清"是大家认得出来的原型约定。

### 3. 全部用 Framer Motion

Framer Motion 让 bundle 多了约 50 kB gzipped。对于一个以 CSS 过渡为主、偶尔点缀的站点，**纯 CSS 就够了**。但商品网格在筛选变化时用 `layout` + `AnimatePresence`，购物车角标的旋入用纯 CSS 复现会非常痛苦，所以保留了。

### 4. 一份纯 CSS + 设计系统

单文件 CSS + 变量读起来快，但不可扩展。如果项目长到 20+ 组件，我会切到 CSS Modules + 把设计 token 抽到共享的 `tokens.ts`，或者直接用 Tailwind。

### 5. 没配 `next/image`

为了把原型保持成"单文件"代价是 Unsplash 图片以原始分辨率返回。生产前必须修。

### 6. 移除了 Hero 旋转徽章

原本 Hero 那个圆形徽章是个 `motion.div`，每 18s 转 360°。在 UI 美化那轮我把它去掉了，因为旋转跟整页的"静"打架。如果想加回来，`components/hero-section.tsx` 里改一行就行。

---

## 明确不在范围内

- 真实支付（Stripe 等）
- 登录（NextAuth、Clerk 等）
- 数据库 / CMS
- 邮件通知
- 订单历史
- 多页路由
- 国际化
- 服务端埋点
- Dockerfile、CI 配置、部署配置
- LICENSE 文件

---

## 许可

这是个人原型。**未授予任何形式的复用许可**。

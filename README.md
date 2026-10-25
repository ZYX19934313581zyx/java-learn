# java-learn · 上岸宝典

驾考宝典式的 Java 求职修炼应用:计划 → 知识点 → 刷题 → 错题本 → 标星 → 复盘。
写给:成都东软学院计科 2028 届,目标 2027 暑期实习(Java后端为身份 + Agent为差异化)。

## 快速开始

```bash
cd study-app
npm install            # 首次;若npm缓存报错,加 --cache .npm-cache
npm run dev            # 开发模式,浏览器开 http://localhost:5173
npm run build          # 产出 dist/(PWA可安装版本)
```

手机端:仓库推到 GitHub 并开启 Pages 后(Actions 已配置自动部署),
手机浏览器打开 Pages 地址 → 添加到主屏幕 → 像App一样全屏离线用。

## 功能

- **学习**:7个阶段、45个知识点,每个都有"这是什么"的人话介绍 + 可复制去 IDEA 跑的示例代码 + 过关标准
- **刷题**:顺序/随机/背题三种模式,239 题全部带解析,答对即时盖章反馈
- **错题本**:答错自动进本,连续答对 2 次自动移出(驾考宝典规则)
- **标星**:好题随时收藏重做
- **今日**:阶段进度、考核关卡、关键节点倒计时、学习打卡与热力图
- **数据**:全部存本浏览器 localStorage,设置页可导出/导入 JSON 备份

## 题库分布

| 阶段 | 题 |
|------|-----|
| 1 JavaSE | 74 |
| 2 MySQL | 32 |
| 3 Web基础 | 24 |
| 4 Spring Boot | 37 |
| 5 项目实战(smart-diagnose-web) | 21 |
| 6 Python+RAG+Agent | 25 |
| 7 面试八股深化 | 26 |

题库内容参考公开知识文档(JavaGuide / 小林coding / CS-Notes 等)自编,仅供个人学习。

## 目录

```
study-app/            # Vue3 + Vite PWA 应用
  src/data/plan.js    # 学习计划唯一事实源(改计划只改这里)
  src/data/banks/     # 题库 p1.js ~ p7.js(加题就加文件/条目)
  src/views/          # 9个视图(今日/学习/刷题/错题/标星/日志/设置/更多)
javase/ mysql/ ...    # 你的练习代码,按阶段建目录,每天 commit
.github/workflows/    # 推送 main 自动构建部署 Pages
```

## 里程碑

2027-01-31 寒假检查点(手写Spring Boot CRUD)→ 03-15 简历v1+项目一 → 04-15 RAG上GitHub → 04-20 海投开始 → 06-15 暑期实习上岗。

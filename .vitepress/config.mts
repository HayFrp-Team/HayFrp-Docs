import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "HayFrp Docs",
  description: "HayFrp Web 前端路由及 API 文档",
  lang: 'zh-CN',
  outDir: './docs/.vitepress/dist',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '路由文档', link: '/guide/routes' },
      { text: 'API文档', link: '/api/user' },
      { text: '使用指南', link: '/use' }
    ],

    sidebar: [
      {
        text: '路由文档',
        items: [
          { text: '路由概览', link: '/guide/routes' },
          { text: '公开路由', link: '/guide/public' },
          { text: '需要登录的路由', link: '/guide/auth' },
          { text: '路由守卫', link: '/guide/guard' }
        ]
      },
      {
        text: 'API 文档',
        items: [
          { text: '用户账号 API', link: '/api/user' },
          { text: '隧道管理 API', link: '/api/proxy' },
          { text: '公共 API', link: '/api/public' }
        ]
      },
      {
        text: '使用指南',
        items: [
          { text: '基本教程', link: '/use' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/HayFrp-Team/HayFrp-Docs' }
    ],

    footer: {
      message: '基于 MIT 许可证发布',
      copyright: '版权所有 © 2026 HayFrp'
    }
  }
})

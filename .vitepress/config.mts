import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "HayFrp Docs",
  description: "官方文档",
  lang: 'zh-CN',
  outDir: './docs/.vitepress/dist',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '使用指南', link: '/use' },
      { text: '示例', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: '使用指南',
        items: [
          { text: '基本教程', link: '/use' }
        ]
      },
      {
        text: '示例',
        items: [
          { text: 'Markdown 示例', link: '/markdown-examples' },
          { text: '运行时 API 示例', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    footer: {
      message: '基于 MIT 许可证发布',
      copyright: '版权所有 © 2026 HayFrp'
    }
  }
})

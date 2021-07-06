const { getSidebar } = require('../../js/utils');

module.exports = {
    title: 'CottonPaper',
    description: '一些可以用来垫桌角的纸',
    head: [
        ['link', {
            rel: 'icon',
            href: '/logo.png'
        }]
    ],
    themeConfig: {
        sidebarDepth: 2,
        // 添加导航栏
        nav: [{
            text: 'GitHub',
            // 这里是下拉列表展现形式。
            link: 'https://github.com/Therainisme/CottonPaper'
        }],
        // 为以下路由添加侧边栏
        sidebar: {
            '/': [{
                    title: '介绍',
                    collapsable: false,
                    path: '/hello'
                }, {
                    title: 'HTML',
                    collapsable: false,
                    children: getSidebar('html')
                },
                {
                    title: 'CSS',
                    collapsable: false,
                    children: getSidebar('css')
                },
                {
                    title: 'JavaScript',
                    collapsable: false,
                    children: getSidebar('javascript')
                }
            ]
        }
    }
}
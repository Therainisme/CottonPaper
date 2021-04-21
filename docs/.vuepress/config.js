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
                    children: [{
                        title: 'HTML的语义化',
                        path: '/chapter-1/semantization'
                    }]
                },
                {
                    title: 'CSS',
                    collapsable: false,
                    children: [{
                        title: 'Flex布局',
                        path: '/chapter-2/flex'
                    }]
                },
                {
                    title: 'JavaScript',
                    collapsable: false,
                    children: [{
                            title: '闭包',
                            path: '/chapter-3/closure'
                        },
                        {
                            title: '奇怪的面向对象',
                            path: '/chapter-3/oop'
                        },
                        {
                            title: 'AJAX',
                            path: '/chapter-3/ajax'
                        },
                        {
                            title: 'Promise',
                            path: '/chapter-3/promise'
                        },
                        {
                            title: 'async与awai',
                            path: '/chapter-3/asyncandawait'
                        }
                    ]
                }
            ]
        }
    }
}
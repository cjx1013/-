// 监控区域模块制作
(function () {//立即执行函数，防止变量名冲突（变量污染）
    $(".monitor .tabs").on("click", "a", function () {
        $(this).addClass("active").siblings("a").removeClass("active");
        $(".monitor .content").eq($(this).index()).show().siblings(".content").hide();
    })

    //无缝滚动，先clone
    $(".marquee-view .marquee").each(function (index, domEle) {
        var row = $(this).children().clone();
        $(this).append(row);
    })
})();//立即执行函数之间要用分号隔开！！！！！！！！！

// 点位分布统计模块
(function () {
    //1、实例化对象
    var myChart = echarts.init(document.querySelector(".pie"));
    //2、指定配置项和数据
    option = {
        // title: {
        //   text: 'Nightingale Chart',
        //   subtext: 'Fake Data',
        //   left: 'center'
        // },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            left: 'center',
            top: 'bottom',
            data: [
                'rose1',
                'rose2',
                'rose3',
                'rose4',
                'rose5',
                'rose6',
                'rose7',
                'rose8'
            ]
        },
        toolbox: {
            show: true,
            //   feature: {
            //     mark: { show: true },
            //     dataView: { show: true, readOnly: false },
            //     restore: { show: true },
            //     saveAsImage: { show: true }
            //   }
        },
        //注意color的位置
        color: [
            "#006cff",
            "#60cda0",
            "#ed8884",
            "#ff9f7f",
            "#0096ff",
            "#9fe6b8",
            "#32c5e9",
            "#1d9dff"
        ],
        series: [
            {
                name: '点位分布统计',
                type: 'pie',
                //如果radius的参数是百分数，一定要加引号
                radius: ["10%", "50%"],
                center: ['50%', '50%'],
                roseType: 'radius',
                itemStyle: {
                    borderRadius: 5
                },
                data: [
                    { value: 20, name: "云南" },
                    { value: 26, name: "北京" },
                    { value: 24, name: "山东" },
                    { value: 25, name: "河北" },
                    { value: 20, name: "江苏" },
                    { value: 25, name: "浙江" },
                    { value: 30, name: "四川" },
                    { value: 42, name: "湖北" }
                ],
                //修饰饼形图文字相关的样式 label对象
                label: {
                    fontSize: 10
                },
                // 修饰引导线样式
                labelLine: {
                    // 连接到图形的线长度
                    length: 6,
                    // 连接到文字的线长度
                    length2: 8
                }
            }
        ]

    };
    myChart.setOption(option);
})();
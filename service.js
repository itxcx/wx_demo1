var tip = {
    show: function (page, msg, callback) {
        page.setData({
            tipShow: true,
            tip: msg
        });
        callback && callback();
    },
    hide: function (page, msg, time) {
        // 隐藏前显示的提示信息
        if (msg) {
            page.setData({
                tip: msg
            });
            // 异步隐藏
            if (time) {
                setTimeout(function () {
                    page.setData({
                        tipShow: false
                    });
                }, time)
            } else {
                page.setData({
                    tipShow: false
                });
            }

        } else {
            page.setData({
                tipShow: false
            });
        }
    }
};

module.exports.tip = tip;

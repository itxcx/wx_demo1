var tip = {
    show: function (page, msg,time) {
        var that=this;
        if (time){
            setTimeout(function () {
                that.hide(page)
            },time)
        }
        page.setData({
            tipShow: true,
            tip: msg
        });
        // typeof callback =='function' && callback();
    },
    hide: function (page) {
        // 隐藏前显示的提示信息
        page.setData({
            tipShow: false
        });
    }
};

module.exports.tip = tip;

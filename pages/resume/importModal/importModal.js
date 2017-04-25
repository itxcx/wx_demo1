var source=require("../../../value.js").source;
var tip=require('../../../service').tip;
var app = getApp();
Page({
    data: {},
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        console.log(options.site);
        console.log(source);
        this.setData({
            userInfo: getApp().globalData.userInfo,
            wx_openId: getApp().globalData.wxInfo.openid,
            site: options.site,
            label:source[options.site].label
        })
    },
    submit: function (e) {
        var that = this;
        var data = e.detail.value;
        data.site = that.data.site;
        data.weixin_nickname = that.data.userInfo.nickName;
        data.weixin_unionid = that.data.wx_openId;
        if(wx.showLoading){
            wx.showLoading({
                title:'正在导入',
                mask:true
            });
        }else{
            tip.show(that, '正在导入')
        };


        app.request('resume').import(data, function (res) {

            if (wx.hideLoading) {
                wx.hideLoading();
            }else{
              tip.hide(that)
            }

            if (res.status == 500) {
                wx.showModal({
                    title: '提示',
                    content: res.message,

                });
                return;
            }
            wx.redirectTo({
                url: '../index/index',
                success: function (res) {
                    // success
                }
            })
        }, function (res) {
            if( wx.hideLoading){
                wx.hideLoading();
            };
            wx.showToast({
                title: "导入失败",
                icon: 'success',
                mask: true
            });
        })


    }

});
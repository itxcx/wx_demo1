var app = getApp();

Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
    },
    //事件处理函数
    onLoad: function (options) {
        var that = this;
        app.getUserInfo(function () {
            that.setData({
                userInfo: app.globalData.userInfo
            })
        })
    },
    start: function () {
        wx.switchTab({
            url: '../posList/social',
        })
    },
    onShareAppMessage: function () {
        var that = this;
        return {
            title: "微信招聘",
            path: '/pages/index/index',
            success: function (res) {

            },
            fail: function (res) {

            }
        }
    }
})

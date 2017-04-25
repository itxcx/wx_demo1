var app = getApp();
Page({
    data: {},
    onLoad: function () {
        var that = this;
        // 获取校招职位列表
        var data = {
            property: 'CAMPUS',
            page: 1,
            status: 'open',
        };
        app.request('position').query(data, function (res) {
            that.setData({
                positions: res.items
            });
        });
    },
    searchList: function (e) {
        var that = this;
        var keyword = e.detail.value;
        var data = {
            property: 'CAMPUS',
            page: 1,
            status: 'open',
            keyword: keyword
        }
        conf.request('position').query(data, function (res) {
            that.setData({
                positions: res.items
            })
        });
    },
    onShareAppMessage: function () {
        var that = this;
        return {
            title: "校园招聘",
            path: '/pages/posList/campus',
            success: function (res) {

            },
            fail: function (res) {

            }
        }
    }
})

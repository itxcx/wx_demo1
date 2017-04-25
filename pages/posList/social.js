var app = getApp();
Page({
    data: {},
    onLoad: function () {
        var that = this;
        // 获取社招职位列表
        var data = {
            property: 'SOCIAL',
            page: 1,
            status: 'open',
        };

        app.request('position').query(data, function (res) {
            console.log(res);
            that.setData({
                positions: res.items
            });
        },function(res){
            console.log(res);
        });
    },
    searchList: function (e) {
        var that = this;
        var keyword = e.detail.value;
        var data = {
            property: 'SOCIAL',
            page: 1,
            status: 'open',
            keyword: keyword
        }
        app.request('position').query(data, function (res) {
            that.setData({
                positions: res.items
            })
        });
    },
    onShareAppMessage: function () {
        var that = this;
        return {
            title: "社会招聘",
            path: '/pages/posList/social',
            success: function (res) {

            },
            fail: function (res) {

            }
        }
    }

})

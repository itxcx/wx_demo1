//app.js

var isDev = false;       //环境控制
var APIHOST;
if (isDev) {
    APIHOST = "https://dev.hrtell.com"
} else {
    APIHOST = "https://www.hrtell.com"
};

var appId = "wxe5fc97195e80ae0b";
var appSecret = "59527af57fd8d4ec297c97a55c41ce2f";

App({
    onLaunch: function (options) {
        var that = this;
        var openLogs=false;
        if(openLogs){
            var logs = wx.getStorageSync('logs') || [] ;         //调用API从本地缓存中获取数据
            logs.unshift(Date.now());
            wx.setStorageSync('logs', logs);
        };
        wx.request({
            url: 'https://dev.hrtell.com/demo/app/company/js',
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                that.globalData.global_company = JSON.parse(res.data.split('=')[1]);
            }
        });

    },


    getUserInfo: function (cb) {
        var that = this;
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            wx.login({
                success: function (res) {
                    wx.getUserInfo({
                        success: function (res) {
                            that.globalData.userInfo = res.userInfo;
                            that.globalData.user = res;
                            typeof cb == "function" && cb(that.globalData.userInfo)
                        }
                    })
                }
            })
        }
    },


    getWxInfo: function (cb) {
        var that = this;
        if (this.globalData.wxInfo) {
            typeof cb == "function" && cb(this.globalData.wxInfo)
        } else {
            wx.login({
                success: function (res) {
                    var js_code = res.code;
                    wx.request({
                        url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + appSecret + '&js_code=' + js_code + '&grant_type=authorization_code',
                        data: {},
                        method: 'GET',
                        success: function (res) {
                            that.globalData.wxInfo = res.data;
                            typeof cb == "function" && cb(that.globalData)
                        }
                    });
                }
            });
        };
    },
    request:function(type){
        var that=this;
        function requestServer(url, data, method, success, fail, complete) {
            var apihost=APIHOST;

            if(/resumes\/import/.test(url)){
                apihost="https://www.hrtell.com";           //导入第三方简历，需调用线上接口
            };

            that.getWxInfo(function(res){
                wx.request({
                    url: apihost + '/' + that.globalData.corp + '/app/' + url,
                    data: data,
                    method: method,
                    header: {
                        "wxId": res.openid
                    },
                    success: function (res) {
                        typeof success == "function" && success(res.data);
                    },
                    fail: function (res) {
                        typeof fail == "function" && fail(res);
                    },
                    complete: function (res) {
                        typeof complete == "function" && complete(res);
                    }
                })
            });
        };
        var resume = {
            "query": function (success, fail, complete) {
                that.getUserInfo(function(userInfo){
                   that.getWxInfo(function(wxInfo){
                       requestServer('resumes', {
                           weixin_nickname: userInfo.nickName,
                           weixin_unionid: wxInfo.openid
                       }, 'GET', success, fail, complete);
                   })
                });
            },
            "get": function (id, success, fail, complete) {
                requestServer('resumes/' + id, {}, 'GET', success, fail, complete)
            },
            "create": function (data, success, fail, complete) {
                requestServer('resumes', data, 'POST', success, fail, complete)
            },
            "delete": function (id, success, fail, complete) {
                requestServer('resumes/' + id, {}, 'DELETE', success, fail, complete)
            },
            "update": function (id, data, success, fail, complete) {
                requestServer('resumes/' + id, data, 'PUT', success, fail, complete)
            },
            "import": function (data,success,fail,complete) {
                requestServer('resumes/import' , data, 'POST', success, fail, complete)
            }
        };
        var position = {
            "query": function (data, success, fail, complete) {
                requestServer('positions', data, 'GET', success, fail, complete)
            },
            "get": function (id, success, fail, complete) {
                requestServer('positions/' + id, {status: 'open'}, 'GET', success, fail, complete)
            },
            "apply": function (data, success, fail, complete) {
                requestServer('positions/apply?status=open', data, 'POST', success, fail, complete)
            }
        };

        if(type=='resume'){
            return resume;
        }else if(type=='position'){
            return position;
        }
    },

    globalData: {
        userInfo: null,
        currentPosApplyId: undefined,
        corp: 'demo'
    },


});
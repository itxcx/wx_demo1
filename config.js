var app = getApp();

var isDev = true;         //环境控制

// 线上环境or开发环境
var APIHOST;
if (isDev) {
    APIHOST = "https://dev.hrtell.com"
} else {
    APIHOST = "https://www.hrtell.com"
}

function requestServer(url, data, method, success, fail, complete) {
    var apihost=APIHOST;
    if(/resumes\/import/.test(url)){
        apihost="https://www.hrtell.com";           //导入第三方简历，需调用线上接口
        console.log("这是导入简历接口")
    };
    wx.request({
        url: apihost + '/' + app.globalData.corp + '/app/' + url,
        data: data,
        method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
            "wxId": app.globalData.wxInfo.openid
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
};

app.getUserInfo(function (res) {
    var weixin_nickname = res.userInfo.nickName;
    var weixin_unionid = res.wxInfo.openid;
});


// 公司名，开始网申首页，主要目的是为了从二维码链接中获取公司参数
var setCorp = function (options) {
    app.globalData.corp = options.corp;
};

  var resume = {
        "query": function (success, fail, complete) {
            requestServer('resumes', {
                weixin_nickname: weixin_nickname,
                weixin_unionid: weixin_unionid
            }, 'GET', success, fail, complete)
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
module.exports.setCorp = setCorp;
  module.exports.position = position;
    module.exports.resume = resume;

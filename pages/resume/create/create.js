var tip = require('../../../service').tip;
var app = getApp();
Page({
    data: {
        genders: [
            {
                label: "男",
                value: 'MALE'
            }, {
                label: '女',
                value: 'FEMALE'
            }]
    },
    onLoad: function (options) {
        var that = this;
        if (options.id) {
            that.setData({
                resume_type: 'edit',
                resume_id: options.id
            });
            app.request('resume').get(options.id, function (res) {
                that.setData({
                    initData: res.info
                });
                for (var k in that.data.genders) {
                    if (that.data.genders[k].value == res.info.gender) {
                        that.data.genders[k].checked = 'true';
                        that.setData({
                            genders: that.data.genders
                        })
                    }
                }
            });

        }
        ;
        this.setData({
            userInfo: getApp().globalData.userInfo,
            wx_openId: getApp().globalData.wxInfo.openid
        })
    },

    formSubmit: function (e) {
        var that = this;
        var data = e.detail.value;
        data.weixin_nickname = this.data.userInfo.nickName;
        data.weixin_unionid = this.data.wx_openId;
        data.file = [];
        data.gender = that.data.gender;
        if (wx.showLoading) {
            wx.showLoading({
                title: '正在提交',
                mask: true
            });
        } else {
            tip.show(that, '正在提交')
        }
        if (that.data.resume_type == 'edit') {
            app.request('resume').update(that.data.resume_id, {info: data}, function (res) {
                wx.redirectTo({
                    url: '../edit/edit?id='+that.data.resume_id,
                })
            })
        } else {
            app.request('resume').create({info: data}, function (resume) {
                if (wx.hideLoading){
                    wx.hideLoading()
                }else{
                    tip.hide(that);
                }
                wx.showModal({
                    title: '提示',
                    content: '创建成功!',
                    confirmText:'去完善',
                    cancelText:'以后完善',
                    success: function(res) {
                        console.log(res);
                        if (res.confirm) {

                            wx.redirectTo({
                                url: '../edit/edit?id='+resume.id,
                            });
                        } else if (res.cancel) {
                            wx.redirectTo({
                                url: '../index/index',
                            });
                        }
                    }
                });

            });
        }

    },
    radioChange: function (e) {
        this.setData({
            gender: e.detail.value
        })
    },
    uploadFile: function () {
        var that = this;
        wx.chooseImage({
            success: function (res) {
                var tempFilePaths = res.tempFilePaths
                wx.saveFile({
                    tempFilePath: tempFilePaths[0],
                    success: function (res) {
                        var savedFilePath = res.savedFilePath;
                        console.log(savedFilePath)
                    }
                })
            }
        })
    }

});
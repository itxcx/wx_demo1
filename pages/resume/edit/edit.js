// pages/resume/sup/sup.js
var app = getApp();
Page({
    data: {},
    onLoad: function (options) {
        var that = this;
        console.log(options.id);
        app.request('resume').get(options.id, function (res) {
            function mapgender(words) {
                if (words=='MALE'||words=='mail'){
                    return '男'
                }else if (words=='FEMALE'||words=='femail'){
                    return '女'
                }else{
                    return;
                }
            }
            if (res.info.gender){
                that.setData({
                    infoGender:mapgender(res.info.gender)
                })
            };
            that.setData({
                resume: res
            });

        })
    },
    editInfo: function () {
        var that = this;
        wx.redirectTo({
            url: '../create/create?id=' + that.data.resume.id
        })
    },
    addEdu: function () {
        var that = this;
        wx.redirectTo({
            url: '../edu/edu?id=' + that.data.resume.id + '&index=' + that.data.resume.edu.length
        })
    },
    addWork: function () {
        var that = this;
        wx.redirectTo({
            url: '../work/work?id=' + that.data.resume.id + '&index=' + that.data.resume.exp.length
        })
    },
    eduDelete: function (e) {
        var that = this;
        var edu = {
            edu: {
                data: null,
                index: e.target.dataset.index
            }
        };
        wx.showModal({
            title:'提示',
            content:'确定删除吗？',
            success:function (res) {
                if (res.confirm){
                    app.request('resume').update(that.data.resume.id, edu, function (res) {
                        app.request('resume').get(that.data.resume.id, function (res) {
                            that.setData({
                                resume: res
                            })
                        })
                    });
                }
            }
        });


    },
    eduEdit: function (e) {
        var that=this;
        wx.redirectTo({
            url:'../edu/edu?id='+that.data.resume.id+'&index='+e.target.dataset.index+'&type=edit'
        })
    },
    expDelete: function (e) {
        var that = this;
        var exp = {
            exp: {
                data: null,
                index: e.target.dataset.index
            }
        };
        wx.showModal({
            title:'提示',
            content:'确定删除吗？',
            success:function (res) {
                if (res.confirm){
                    app.request('resume').update(that.data.resume.id, exp, function (res) {
                        app.request('resume').get(that.data.resume.id, function (res) {
                            that.setData({
                                resume: res
                            })
                        })
                    });
                }
            }
        });
    },
    expEdit: function (e) {
        var that=this;
        wx.redirectTo({
            url:'../work/work?id='+that.data.resume.id+'&index='+e.target.dataset.index+'&type=edit'
        })
    },
    confirm:function () {
        wx.redirectTo({
            url:'../index/index'
        })

    }
})
// pages/resume/sup/sup.js
var app=getApp();

Page({
    data:{
    },
    onLoad:function(options){
        var that=this;
        that.setData({
            resume_id:options.id,
            index:options.index
        })
    },
    workStartTimeChange:function (e) {
        var that=this;
        that.setData({
            startTime:e.detail.value
        })
    },
    workEndTimeChange:function (e) {
        var that=this;
        that.setData({
            endTime:e.detail.value
        })
    },

    formSubmit:function (e) {
        var that=this;
        var exp={};
        exp.data = {
            startTime:that.data.startTime,
            endTime:that.data.endTime,
            company:e.detail.value.company,
            detail:e.detail.value.detail,
            position:e.detail.value.position
        };
        console.log(e);
        console.log(exp);
        exp.index = that.data.index;
        app.request('resume').update(that.data.resume_id,{exp:exp}, function (res) {
            wx.redirectTo({
                url: '../edit/edit?id='+res.id
            })
        })

    }



})
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
        });
        if (options.type=='edit'){
            that.setData({
                type:'edit'
            });
            app.request('resume').get(options.id,function (res) {
                that.setData({
                    startTime:res.exp[options.index].startTime,
                    endTime:res.exp[options.index].endTime,
                    company:res.exp[options.index].company,
                    position:res.exp[options.index].position,
                    detail:res.exp[options.index].detail
                });
                console.log(that.data)
            })
        }
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
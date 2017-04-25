// pages/resume/sup/sup.js
var app=getApp();

Page({
    data:{
        degrees:['大专','本科','硕士','博士','博士后'],
        edu :{}
    },
    onLoad:function(options){
        var that=this;
        that.setData({
            resume_id:options.id,
            index:options.index
        })
    },
    eduStartTimeChange:function (e) {
        var that=this;
        that.setData({
            startTime:e.detail.value
        })
    },
    eduEndTimeChange:function (e) {
        var that=this;
        that.setData({
            endTime:e.detail.value
        })
    },
    degreeChange:function (e) {
        var that=this;
        that.setData({
            degree:e.detail.value
        })
    },
    formSubmit:function (e) {
        var that=this;
        var edu={};
        edu.data = {
            startTime:that.data.startTime,
            endTime:that.data.endTime,
            degree:that.data.degrees[that.data.degree],
            eduStartTime:that.data.eduStartTime,
            school:e.detail.value.school,
            major:e.detail.value.major
        };
        console.log(e);
        console.log(edu);
        edu.index = that.data.index;
        app.request('resume').update(that.data.resume_id,{edu:edu}, function (res) {
            wx.redirectTo({
                url: '../edit/edit?id='+res.id
            })
        })
        
    }



})
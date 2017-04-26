
var tip = require('../../../service').tip;
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
        });
        if (options.type=='edit'){
            that.setData({
                type:'edit'
            });
            app.request('resume').get(options.id,function (res) {
                function degreeMap() {
                    for (var i in that.data.degrees){
                        if (that.data.degrees[i]==res.edu[options.index].degree){
                            return i;
                        }
                    }
                }
                that.setData({
                    startTime:res.edu[options.index].startTime,
                    endTime:res.edu[options.index].endTime,
                    degree:degreeMap(),
                    school:res.edu[options.index].school,
                    major:res.edu[options.index].major
                });
                console.log(that.data)
            })
        }

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
            school:e.detail.value.school,
            major:e.detail.value.major
        };
        var requireReg=/\S+/;
        // 校验数据
        if (!edu.data.startTime){
            tip.show(that,'开始时间必填',1000);
            return;
        }else if (!edu.data.endTime){
            tip.show(that,'结束时间必填',1000);
            return;
        }else if (!requireReg.test(edu.data.school)){
            tip.show(that,'学校必填',1000);
            return;
        }else if (!edu.data.degree){
            tip.show(that,'学历必填',1000);
            return;
        }else if (!requireReg.test(edu.data.major)){
            tip.show(that,'专业必填',1000);
            return;
        }
        // 数据校验完成，提交数据
        edu.index = that.data.index;
        app.request('resume').update(that.data.resume_id,{edu:edu}, function (res) {
            wx.redirectTo({
                url: '../edit/edit?id='+res.id
            })
        })
        
    }



})
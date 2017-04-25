// pages/resume/sup/sup.js
var app=getApp();
Page({
  data:{
  },
  onLoad:function(options){
      var that=this;
      console.log(options.id)
      app.request('resume').get(options.id,function (res) {
         that.setData({
             resume:res
         })

      })
  },
    editInfo:function () {
      var that=this;
        wx.redirectTo({
            url: '../create/create?id='+that.data.resume.id
        })
    },
    addEdu:function () {
      var that=this;
        wx.redirectTo({
            url: '../edu/edu?id='+that.data.resume.id+'&index='+that.data.resume.edu.length
        })
    },
    addWork:function () {
      var that=this;
        wx.redirectTo({
            url: '../work/work?id='+that.data.resume.id+'&index='+that.data.resume.exp.length
        })
    }





})
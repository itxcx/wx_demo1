var source=require("../../../value.js").source;
var app=getApp();
Page({
  data:{
  
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
var imports =app.globalData.global_company.imports;
var webs=[];
for(var i in imports){
  webs.push({
    info:source[imports[i]],
    site:imports[i]
  })
};

  this.setData({
    webs:webs
  });
  },
  create:function(){
    wx.redirectTo({
      url: '../create/create',
   
    })
  },
  import:function(e){
      wx.redirectTo({
        url: '../importModal/importModal?site='+e.target.dataset.web.site,
    })
  }
})

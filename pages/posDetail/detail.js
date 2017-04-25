
var WxParse = require('../../wxParse/wxParse.js');
var app=getApp();
Page({
  data:{},
  onLoad:function(options){
    var that=this;
    app.request('position').get(options.id,function(res){
        var pos=res;
          var jdstr=pos.jd;
          that.setData({
           jdstr:jdstr,
              posId:options.id
          });
          var article=`${pos.jd}`;
          WxParse.wxParse('article', 'html', article, that, 5);
          that.setData({
            pos:pos
          })
    });

  },
  apply:function(){
    app.globalData.currentPosApply=this.data.pos;
    wx.navigateTo({
      url: '../resume/index/index',
    })
  },
    onShareAppMessage:function () {
    var that=this;
        return {
            title: this.data.pos.name,
            path: '/pages/posDetail/detail?id='+that.data.posId,
            success: function(res) {

            },
            fail: function(res) {

            }
        }
    }


});

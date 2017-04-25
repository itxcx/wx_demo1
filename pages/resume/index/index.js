var tip=require('../../../service').tip;
var app=getApp();

Page({
  data:{

  },
  onLoad:function(options){
    var that=this;
    that.setData({
      pos:app.globalData.currentPosApply
    })
    // 获取简历列表
    app.request('resume').query(function(res){
      console.log(res.items)
      var resumes=res.items;
      that.setData({
          resumes:resumes
      })
    });

  },
  deleteResume:function(){
    var that=this;
    if(!that.data.resume_id){
      wx.showToast({
        title: '请先选择简历',
        icon: 'success',
          mask:true,
        duration: 2000
      });
      return;
    }
    wx.showModal({
      title: '提示',
      content: '确认删除选中的简历吗？',
      success: function(res) {
        if (res.confirm) {
            app.request('resume').delete(that.data.resume_id,function(res){
                app.request('resume').query(function(res){
                  var resumes=res.items;
                  that.setData({
                    resumes:resumes
                  })
              })
          });
        }
      }
    })
  },
  updateResume:function(){
    var that=this;
    if(!that.data.resume_id){
      wx.showToast({
        title: '请先选择简历',
        icon: 'success',
          mask:true,
        duration: 2000
      });
      return;
    }
    wx.redirectTo({
      url: '../edit/edit?id='+that.data.resume_id,
    })
  },
  createResume:function(){
    wx.redirectTo({
      url: '../add/add',
    })
  },
  apply:function(){
    var that=this;
    var data={};
        data.position_id=that.data.pos.id;
        data.position_name=that.data.pos.name;
        data.resume_id=parseInt(that.data.resume_id);
        if(!data.resume_id){
         wx.showToast({
          title: '请先选择简历',
          // icon: 'success',
          image:'',
          duration: 2000,
          mask:true,
          complete:function(){}
        });
          return;
        }
        if(wx.showLoading){
            wx.showLoading({
              title:'正在申请',
                mask:true,
            });
        }else{
            tip.show(that, '正在申请')
        }
      app.request('position').apply(data,function(res){
        if (wx.hideLoading){
            wx.hideLoading()
        }else{
            tip.hide(that)
        }
        wx.showToast({
          title: '申请成功！',
          icon: 'success',
          mask:true,
            duration:1000,
          success:function(){
            setTimeout(function(){
                wx.switchTab({
                  url: '../../posList/social'
                })
            },1000)
          }
        })
     });
  },

  radioChange:function(e){
    // console.log(e)
    this.setData({
      resume_id:e.detail.value
    })
  }

})
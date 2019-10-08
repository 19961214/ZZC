// pages/video/video.js
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    btnText:'开始录制'
  },
  // 选择视频
  chooseVideo: function() {
    var that = this
    wx.chooseVideo({
      maxDuration: 5,
      sourceType: ['camera'],
      camera: 'front',
      success: function(res) {
        //console.log(res)
        that.setData({
          src: res.tempFilePath,
          btnText:'重新拍摄'
        })
      },
      fail: function() {
        console.error("获取本地视频时出错");
      }
    })
    

  },
  //上传视频 目前后台限制最大100M，以后如果视频太大可以在选择视频的时候进行压缩
  uploadVideo: function() {
    let that = this; 
    util.requestFile(api.VideoSubmit,
      that.data.src, "videoFile",
      {

      }, 'POST', 'application/x-www-form-urlencoded').then(res => {
        if (res.code == 1) {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 1000
          })
          //请求实名认证状态
          setTimeout(()=>{
            util.request(api.GetUserMessage,
              {

              }, 'POST', 'application/x-www-form-urlencoded').then(res => {
                if (res.code == 1) {
                  wx.reLaunch({
                    url: '/pages/result/result'
                  })
                }else{
                  wx.reLaunch({
                    url: '/pages/falseResult/falseResult'
                  })
                }
              });
          },1000)
          
          
        }else{
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 1000
          })
          setTimeout(() => {
            wx.reLaunch({
              url: '/pages/falseResult/falseResult'
            })
          }, 1000)
        }
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
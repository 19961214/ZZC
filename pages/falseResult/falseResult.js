// pages/falseResult/falseResult.js
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result:""
  },
  goHome: function () {
    wx.switchTab({
      url: '/pages/home/home'
    })
  },
  goRealName: function () {
    wx.redirectTo({
      url: '/pages/realName/realName'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let result = wx.getStorageSync("result")
    console.log(result)
    this.setData({
      result: result
    })
    util.request(api.GetUserMessage,
      {

      }, 'POST', 'application/x-www-form-urlencoded').then(res => {
        console.log(res)
        if (res.code == 1) {
          // wx.reLaunch({
          //   url: '/pages/result/result'
          // })
        } else {
          // wx.setStorageSync('result', '身份信息填写错误或人脸认证失败');
          // wx.reLaunch({
          //   url: '/pages/falseResult/falseResult'
          // })
        }
      });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
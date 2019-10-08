// pages/problem/problem.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow1:false,
    isShow2: false,
    isShow3: false,
    isShow4: false,
    isShow5: false,
    isShow6: false,
    isShow7: false,
  },

  open1:function(){
    this.setData({
      isShow1: !this.data.isShow1,
      isShow2: false,
      isShow3: false,
      isShow4: false,
      isShow5: false,
      isShow6: false,
      isShow7: false,
    })
  },
  open2: function () {
    this.setData({
      isShow2: !this.data.isShow2,
      isShow1: false,
      isShow3: false,
      isShow4: false,
      isShow5: false,
      isShow6: false,
      isShow7: false,
    })
  },
  open3: function () {
    this.setData({
      isShow3: !this.data.isShow3,
      isShow1: false,
      isShow2: false,
      isShow4: false,
      isShow5: false,
      isShow6: false,
      isShow7: false,
    })
  },
  open4: function () {
    this.setData({
      isShow4: !this.data.isShow4,
      isShow1: false,
      isShow2: false,
      isShow3: false,
      isShow5: false,
      isShow6: false,
      isShow7: false,
    })
  },
  open5: function () {
    this.setData({
      isShow5: !this.data.isShow5,
      isShow1: false,
      isShow2: false,
      isShow3: false,
      isShow4: false,
      isShow6: false,
      isShow7: false,
    })
  },
  open6: function () {
    this.setData({
      isShow6: !this.data.isShow6,
      isShow1: false,
      isShow2: false,
      isShow3: false,
      isShow4: false,
      isShow5: false,
      isShow7: false,
    })
  },
  open7: function () {
    this.setData({
      isShow7: !this.data.isShow7,
      isShow1: false,
      isShow2: false,
      isShow3: false,
      isShow4: false,
      isShow5: false,
      isShow6: false,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
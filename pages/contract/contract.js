const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    navH: app.globalData.navHeight,
    contractUrl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let url = decodeURIComponent(options.contractUrl) +"#wechat_redirect";
    this.setData({
      contractUrl: url
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.info("onReady");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.info("onShow");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.info("onHide");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.info("onUnload");
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
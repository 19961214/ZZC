// pages/receiptMessage/receiptMessage.js
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: "1",
    receiptMessage:[],
    today:"",
    cHeight:"",
    loader:true
  },

  lower:function(){
    if(this.data.loader){
      this.setData({
        num: ++this.data.num,
      })
      util.request(api.GetReceiptMessage, {
        pageNum: this.data.num
      }, 'POST', 'application/x-www-form-urlencoded').then(res => {

        if (res.code == 1) {
          let receiptMessage = this.data.receiptMessage;
          let dataList = res.rows;
          if (dataList.length==0) {
            this.setData({
              loader: false,
            })
          }
          if (receiptMessage.length > 0 && dataList.length > 0 ){
            let lastItem = receiptMessage[receiptMessage.length - 1];
            let fristItem = dataList[0];
            if (fristItem && lastItem.dayTime == fristItem.dayTime){
              Array.prototype.push.apply(lastItem.detailList, fristItem.detailList);
              dataList.splice(0,1);
            }
            Array.prototype.push.apply(receiptMessage, dataList);
            this.setData({
              receiptMessage: receiptMessage,
            })
          }
        }
      });
    }else{

    }
    
  },

  showToday:function(){
    // 获取当天时间
    let date = new Date();
    //年
    let year = date.getFullYear();
    //月
    let month = date.getMonth() + 1;
    if (month < 10) {
      month = "0" + month
    }
    //日
    let day = date.getDate();
    if (day < 10) {
      day = "0" + day
    }
    let today = year + "-" + month + "-" + day
    this.setData({
      today: today,
    })
    // console.log(this.data.today)
    // console.log(this.data.receiptMessage[0].dayTime)
    // console.log(this.data.today == this.data.receiptMessage[0].dayTime)
    // console.log(this.data.today == '2019-8-29')
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
    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        let cHeight = res.windowHeight;
        //console.log(cHeight)
        that.setData({
          cHeight: res.windowHeight,
        })
        //console.log(that.data.cHeight)
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      num: "1",
    })
    util.request(api.GetReceiptMessage, {
      pageNum: this.data.num
    }, 'POST', 'application/x-www-form-urlencoded').then(res => {
      
      if (res.code == 1) {
        this.setData({
          receiptMessage: res.rows,
        })
      }
      console.log(this.data.receiptMessage)
      this.showToday()
    });

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
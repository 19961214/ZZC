// pages/receiptNumber/receiptNumber.js
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: [],
    bankNumber:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.request(api.GetUserAccountList,
      {

      }, 'POST', 'application/x-www-form-urlencoded').then(res => {
        if (res.code == 1) {
          //console.log(res.data)

          let newArr = res.data;
          console.log(newArr)
          for (var i = 0; i < newArr.length; i++) {
            newArr[i].bankNumber = newArr[i].accountNo.slice(-4)
            if (newArr[i].bankName.indexOf('银行') >= 0) {
              newArr[i].bankIndex = '99'
            }
            if (newArr[i].bankName.indexOf('中国银行') >= 0) {
              newArr[i].bankIndex = '4'
            }
            if (newArr[i].bankName.indexOf('建设银行') >= 0) {
              newArr[i].bankIndex = '3'
            }
            if (newArr[i].bankName.indexOf('招商银行') >= 0) {
              newArr[i].bankIndex = '2'
            }
            if (newArr[i].bankName.indexOf('农业银行') >= 0) {
              newArr[i].bankIndex = '1'
            }
            if (newArr[i].bankName.indexOf('交通银行') >= 0) {
              newArr[i].bankIndex = '5'
            }
            if (newArr[i].bankName.indexOf('平安银行') >= 0) {
              newArr[i].bankIndex = '6'
            }
            if (newArr[i].bankName.indexOf('工商银行') >= 0) {
              newArr[i].bankIndex = '7'
            }
            if (newArr[i].bankName.indexOf('兴业银行') >= 0) {
              newArr[i].bankIndex = '8'
            }
            if (newArr[i].bankName.indexOf('邮政银行') >= 0) {
              newArr[i].bankIndex = '9'
            }
            if (newArr[i].bankName.indexOf('东亚银行') >= 0) {
              newArr[i].bankIndex = '10'
            }
            if (newArr[i].bankName.indexOf('渤海银行') >= 0) {
              newArr[i].bankIndex = '11'
            }
            if (newArr[i].bankName.indexOf('光大银行') >= 0) {
              newArr[i].bankIndex = '12'
            }
            if (newArr[i].bankName.indexOf('兴业银行') >= 0) {
              newArr[i].bankIndex = '13'
            }
            if (newArr[i].bankName.indexOf('花旗银行') >= 0) {
              newArr[i].bankIndex = '14'
            }
            if (newArr[i].bankName.indexOf('民生银行') >= 0) {
              newArr[i].bankIndex = '15'
            }
            if (newArr[i].bankName.indexOf('浙商银行') >= 0) {
              newArr[i].bankIndex = '16'
            }
            if (newArr[i].bankName.indexOf('中信银行') >= 0) {
              newArr[i].bankIndex = '17'
            }
            if (newArr[i].bankName.indexOf('广发银行') >= 0) {
              newArr[i].bankIndex = '18'
            }
            if (newArr[i].bankName.indexOf('汇丰银行') >= 0) {
              newArr[i].bankIndex = '19'
            }
            if (newArr[i].bankName.indexOf('恒生银行') >= 0) {
              newArr[i].bankIndex = '20'
            }
            if (newArr[i].bankName.indexOf('华夏银行') >= 0) {
              newArr[i].bankIndex = '21'
            }
            if (newArr[i].bankName.indexOf('邮政银行') >= 0) {
              newArr[i].bankIndex = '22'
            }
            if (newArr[i].bankName.indexOf('浦发银行') >= 0) {
              newArr[i].bankIndex = '23'
            }
          }
          this.setData({
            account: newArr,
            // bankNumber: newArr.accountNo
          })
          console.log(this.data.account)
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
const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');

//获取应用实例
const app = getApp()
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    navUrl: '',
    code: '',
  },

  
  onLoad: function(options) {
    let that = this;
    if (wx.getStorageSync("navUrl")) {
      that.setData({
        navUrl: wx.getStorageSync("navUrl")
      })
    } else {
      that.setData({
        navUrl: '/pages/home/home'
      })
    }

    wx.login({
      success: function(res) {
        //console.log(res)
        if (res.code) {
          that.setData({
            code: res.code
          })
        }
      }
    });
  },

  bindGetUserInfo: function(e) {
    let that = this;
    //登录远程服务器
    if (that.data.code) {
      util.request(api.AuthLoginByWeixin, {
        code: that.data.code,
        userData: e.detail
      }, 'POST', 'application/json').then(res => {
        //console.log(res)
        if (res.code === 1) {
          //存储用户信息
          wx.setStorageSync('userInfo', res.data.userInfo);
          wx.setStorageSync('token', res.data.token);
          wx.setStorageSync('openId', res.data.openId);
          wx.setStorageSync('userRealStatus', res.data.userRealStatus);
          wx.setStorageSync('mobile', res.data.mobile);
          if (that.data.navUrl && that.data.navUrl == '/pages/home/home') {
            wx.reLaunch({
              url: that.data.navUrl,
            })

          } else if (that.data.navUrl) {
            wx.reLaunch({
              url: that.data.navUrl,
            })
          }
          //console.log()
        } else {
          // util.showErrorToast(res.errmsg)
          wx.showModal({
            title: '提示',
            content: res.msg,
            showCancel: false
          });
        }
      });
    }
    
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  }
})
// pages/me/me.js
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    amount: {},
    status:0,
    mobile:"",
    homeMessage:{}
  },

  goSignMessage: function() {
    if (this.data.userInfo && this.data.mobile && this.data.status == 2) {
      wx.navigateTo({
        url: '/pages/signMessage/signMessage'
      })
    } else if (this.data.userInfo && !this.data.mobile && this.data.status != 2) {
      wx.showModal({
        title: '提示',
        content: '请先实名认证',
        confirmText: '去认证',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/nameScreen/nameScreen'
            })
          }
        }
      });
      
    } else if (this.data.userInfo && this.data.mobile && this.data.status != 2) {
      wx.showModal({
        title: '提示',
        content: '请先实名认证',
        confirmText: '去认证',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/realName/realName'
            })
          }
        }
      });
      
    }  else {
      wx.redirectTo({
        url: '/pages/auth/btnAuth/btnAuth'
      })
    }
  },
  goReceiptNumber: function() {
    if (this.data.userInfo && this.data.mobile && this.data.status == 2) {
      wx.navigateTo({
        url: '/pages/receiptNumber/receiptNumber'
      })
    } else if (this.data.userInfo && !this.data.mobile && this.data.status != 2) {
      wx.showModal({
        title: '提示',
        content: '请先实名认证',
        confirmText: '去认证',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/nameScreen/nameScreen'
            })
          }
        }
      });
      
    } else if (this.data.userInfo && this.data.mobile && this.data.status != 2) {
      wx.showModal({
        title: '提示',
        content: '请先实名认证',
        confirmText: '去认证',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/realName/realName'
            })
          }
        }
      });
      
    } else {
      wx.redirectTo({
        url: '/pages/auth/btnAuth/btnAuth'
      })
    }
  },
  goReceiptMessage: function() {
    if (this.data.userInfo && this.data.mobile && this.data.status == 2) {
      wx.navigateTo({
        url: '/pages/receiptMessage/receiptMessage'
      })
    } else if (this.data.userInfo && !this.data.mobile && this.data.status != 2) {
      wx.showModal({
        title: '提示',
        content: '请先实名认证',
        confirmText: '去认证',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/nameScreen/nameScreen'
            })
          }
        }
      });
      
    } else if (this.data.userInfo && this.data.mobile && this.data.status != 2) {
      wx.showModal({
        title: '提示',
        content: '请先实名认证',
        confirmText: '去认证',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/realName/realName'
            })
          }
        }
      });
      
    } else {
      wx.redirectTo({
        url: '/pages/auth/btnAuth/btnAuth'
      })
    }
  },
  goProblem: function () {
    if (this.data.userInfo) {
      wx.navigateTo({
        url: '/pages/problem/problem'
      })
    } else {
      wx.redirectTo({
        url: '/pages/auth/btnAuth/btnAuth'
      })
    }
  },
  goComplain: function () {
    if (this.data.userInfo) {
      wx.navigateTo({
        url: '/pages/complain/complain'
      })
    } else {
      wx.redirectTo({
        url: '/pages/auth/btnAuth/btnAuth'
      })
    }
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
    let that = this;
    this.setData({
      userInfo: wx.getStorageSync('userInfo'),
      mobile: wx.getStorageSync('mobile'),
    })
    if (this.data.userInfo) {
      util.requests(api.GrossMoneyMessage, {

      }, 'POST', 'application/x-www-form-urlencoded').then(res => {
        if (res.code == 1) {
          //console.log('我的佣金数据获取')
          that.setData({
            amount: res.data,
          })
          //console.log(that.data.amount)
        }
      });
      util.requests(api.HomeMessage, {

      }, 'POST', 'application/x-www-form-urlencoded').then(res => {
        if (res.code == 1) {
          //console.log('首页数据获取')
          this.setData({
            homeMessage: res.data,
          })
          console.log(this.data.homeMessage.totalCountContract)
        }
      });
      //请求实名认证状态
      util.requests(api.GetUserMessage, {

      }, 'POST', 'application/x-www-form-urlencoded').then(res => {
        //console.log(res)
        if (res.code == 1) {
          //console.log(res.data.status)
          this.setData({
            status: res.data.status,
          })
          //console.log(this.data.status)
        } else if (res.code == -5) {
          wx.redirectTo({
            url: '/pages/auth/btnAuth/btnAuth'
          })
        }
      });
    }
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
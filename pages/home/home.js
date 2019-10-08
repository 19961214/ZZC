// pages/home/home.js
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    homeMessage: {},
    mobile: "",
    status: "0",
    today:"",
    hour:0,
    onerhesis:'若要功夫深，铁杵磨成针',
    rhesis: ['若要功夫深，铁杵磨成针',
      　　'会当凌绝顶，一览众山小',
      　　'你不勇敢，没人替你坚强',
      　　'鹰击天风壮，鹏飞海浪春',
      　　'不同的信念，决定不同的命运',
      　　'人生最困难的事情是认识自己',
      　　'成功是用努力，而非用希望造成',
      　　'等待机会，是一种十分笨拙的行为',
      　　'命运总是光临在那些有准备的人身上',
      　　'努力把平凡的日子堆砌成伟大的人生',
      　　'耕耘者的汗水是哺育种子成长的乳汁',
      　　'只有登上山顶，才能看到远处的风光',
      　　'通过云端的道路，只亲吻攀登者的足迹',
      　　'战胜困难，走出困境，成功就会属于你',
      　　'就算全世界都否定我，还有我自己相信我',
      　　'最热烈的火焰，冰封在最沉默的火山深处',
      　　'积极向上的心态，是成功者的最基本要素',
      　　'要铭记在心：每天都是一年中最美好的日子',
      　　'有志者自有千计万计，无志者只感千难万难',
      　　'不举步，越不过栅栏；不迈腿，登不上高山',
      　　'光说不干，事事落空；又说又干，马到成功']
  },


  toSignMessage: function() {
    wx.navigateTo({
      url: '/pages/signMessage/signMessage'
    })
  },
  goToService: function() {
    wx.navigateTo({ 
      url: '/pages/service/service'
    })
  },

  // goAuth: function() {

  // },
  goToNext: function() {
    if (this.data.userInfo && this.data.mobile) {
      wx.navigateTo({
        url: '/pages/realName/realName'
      })
    } else if (this.data.userInfo && !this.data.mobile) {
      wx.navigateTo({
        url: '/pages/nameScreen/nameScreen'
      })
    } else {
      wx.redirectTo({
        url: '/pages/auth/btnAuth/btnAuth'
      })
    }
  },

  goToNext2: function() {
    if (this.data.userInfo && this.data.mobile && this.data.status==2) {
      wx.navigateTo({
        url: '/pages/signMessage/signMessage'
      })
    } else if (this.data.userInfo && !this.data.mobile && this.data.status != 2) {
      wx.showModal({
        title: '提示',
        content: '请先实名认证',
        confirmText:'去认证',
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

  toReceiptMessage: function() {
    wx.navigateTo({
      url: '/pages/receiptMessage/receiptMessage'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
    let hour = date.getHours();//得到小时
    let today = year + "-" + month + "-" + day
    //console.log(hour,today)
    this.setData({
      today: today,
      hour:hour,
    })
    console.log(this.data.hour,this.data.today)
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    let index = Math.floor((Math.random() * this.data.rhesis.length));
    console.log(this.data.rhesis[index]);
    this.setData({
      onerhesis: this.data.rhesis[index],
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let userInfo = wx.getStorageSync('userInfo');
    this.setData({
      userInfo: userInfo,
      mobile: wx.getStorageSync('mobile'),
    })
    if (this.data.userInfo) {
      util.requests(api.HomeMessage, {

      }, 'POST', 'application/x-www-form-urlencoded').then(res => {
        if (res.code == 1) {
          //console.log('首页数据获取')
          this.setData({
            homeMessage: res.data,
          })
          console.log(this.data.homeMessage)
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
        } else if (res.code == -5){
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
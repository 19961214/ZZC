// pages/signMessage/signMessage.js
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _num: "1", //切换待签约和已签约状态码
    pageNum: "1", //请求页码
    pageNum1: "1",
    status: "0", //请求待签约0或者已签约1
    awaitSign: [],
    finishSign: [],
    res: {},
    res1: {},
    clientHeight: 0
  },
 
  signContract: function (e) {
    let contractId = e.currentTarget.dataset.contractId;
    util.request(api.SignContract, {
      "contractId": contractId
    }, 'POST', 'application/x-www-form-urlencoded').then(res => {
      if (res.code == 1) {
        var contractUrl = res.data;
        wx.navigateTo({
          url: '/pages/contract/contract?contractUrl=' + encodeURIComponent(contractUrl)
        })
      }
      if (res.code == -9) {
        wx.showModal({
          title: '提示',
          content: '请先绑定手机号',
          success(res) {
            if (res.confirm) {
              wx.redirectTo({
                url: '/pages/auth/mobile/mobile'
              })
            } else if (res.cancel) {

            }
          }
        })
      }
    });
  },
  viewContract:function(e){
    let contractUrl = e.currentTarget.dataset.contractViewpdfurl;
    contractUrl = contractUrl.replace("https://testapi.fadada.com:8443","https://testapi04.fadada.com");
    console.log(contractUrl)
    wx.navigateTo({
      url: '/pages/contract/contract?contractUrl=' + encodeURIComponent(contractUrl)
    })
  },
  
  menuClick: function(e) {
    console.log(e.target.dataset.num)
    this.setData({
      _num: e.target.dataset.num
    })
  },
  lower1: function () {
    this.setData({
      pageNum1: ++this.data.pageNum1
    })
    if (this.data.res.total > this.data.awaitSign.length) {
      this.requestSignData1()
    }

  },
  
  lower2: function() {
    this.setData({
      pageNum: ++this.data.pageNum
    })
    if (this.data.res1.total > this.data.finishSign.length){
      this.requestSignData2()
    }
    
  },
  //请求待签约数据方法
  requestSignData1: function() {
    this.setData({
      status: "0",
    })
    let pageNum1 = this.data.pageNum1;
    let status = this.data.status;
    //console.log(pageNum, status)
    util.request(api.PactMessage, {
      pageNum1,
      status
    }, 'POST', 'application/x-www-form-urlencoded').then(res => {
      if (res.code == 1) {
        //console.log('我的待签约数据获取')
        let arr1 = this.data.awaitSign;
        let arr2 = res.rows
        Array.prototype.push.apply(arr1, arr2);
        this.setData({
          res:res,
          awaitSign: arr1,
        })
        //console.log(this.data.awaitSign)
      }
    });
  },
  //请求已签约数据方法
  requestSignData2: function() {
    this.setData({
      status: "1",
    })
    let pageNum = this.data.pageNum;
    let status = this.data.status;
    //console.log(pageNum, status)
    util.request(api.PactMessage, {
      pageNum,
      status
    }, 'POST', 'application/x-www-form-urlencoded').then(res => {
      if (res.code == 1) {
        //console.log('我的已签约数据获取')
        let arr1 = this.data.finishSign;
        let arr2 = res.rows
        Array.prototype.push.apply(arr1, arr2);
        this.setData({
          res1: res,
          finishSign: arr1,
        })
        //console.log(this.data.finishSign)
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    // this.requestSignData1(),
    //   this.requestSignData2()
    /** * 获取系统信息  */
    wx.getSystemInfo({
      success: function(res) {
        let cHeight = res.windowHeight;
        //console.log(cHeight)
        wx.createSelectorQuery().select('#sign-head').fields({
          size: true
        }, function(res) {
          //console.log(res.height)
          let clientHeight = cHeight - res.height
          //console.log(this, that)
          that.setData({
            clientHeight: clientHeight
          })
          //console.log(that.data.clientHeight)
        }).exec();
      }
    });
    
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
    //请求待签约数据方法
      // this.setData({
      //   status: "0",
      // })
      let pageNum1 = 1;
      let status = 0;
      //console.log(pageNum, status)
      util.request(api.PactMessage, {
        pageNum1,
        status
      }, 'POST', 'application/x-www-form-urlencoded').then(res => {
        if (res.code == 1) {
          //console.log('我的待签约数据获取')
          // let arr1 = this.data.awaitSign;
          // let arr2 = res.rows
          // Array.prototype.push.apply(arr1, arr2);
          this.setData({
            res: res,
            awaitSign: res.rows,
          })
          console.log(this.data.awaitSign)
        }
      });
    //请求已签约数据方法
      // this.setData({
      //   status: "1",
      // })
      let pageNum = 1;
      status = 1;
      //console.log(pageNum, status)
      util.request(api.PactMessage, {
        pageNum,
        status
      }, 'POST', 'application/x-www-form-urlencoded').then(res => {
        if (res.code == 1) {
          //console.log('我的已签约数据获取')
          // let arr1 = this.data.finishSign;
          // let arr2 = res.rows
          // Array.prototype.push.apply(arr1, arr2);
          this.setData({
            res1: res,
            finishSign: res.rows,
          })
          //console.log(this.data.finishSign)
        }
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
// pages/identityCard/identityCard.js
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    attendSuccessImg: "../../static/images/sfz2.png",
    twoImg: "../../static/images/sfz1.png",
    canvasImgUrl: '',
    src: "",
    num: "",
    isHint1: false,
    isHint2: false,
    nameData: '',
    cardNumber: '',
    warn: '',
    warn2: '',
    isSubmit: false,
    isSubmit2: false,
    certFrontMd5:'',
    certBackMd5:''

  },
  bindKeyInput: function(e) {
    this.setData({
      nameData: e.detail.value
    })
  },
  bindKeyInput2: function(e) {
    this.setData({
      cardNumber: e.detail.value
    })
  },
  formSubmit: function(e) {
    console.log('123')
    setTimeout(() => {
      //console.log('form发生了submit事件，携带数据为：', e.detail.value);
      let {
        nameData,
        cardNumber
      } = e.detail.value;
      if (!this.data.nameData || !this.data.cardNumber || this.data.attendSuccessImg == "../../static/images/sfz2.png" || this.data.twoImg == "../../static/images/sfz1.png") {
        this.setData({
          warn: "身份证照片或姓名或身份证号输入错误！",
          isSubmit: true,
        })
        return;
      }
      if (this.data.isSubmit || this.data.isSubmit2){
        return
      }
      this.setData({
        warn: "",
        isSubmit: false,
      })
      //console.log(this)
      
      let that = this; 

      util.requestFile(api.MessageSubmit, 
      that.data.attendSuccessImg, "certFrontFile",
      {
        certFrontMd5:that.data.certFrontMd5,
        certNo: that.data.cardNumber,
        certType: 0,
        userName: that.data.nameData
      }, 'POST', 'application/x-www-form-urlencoded').then(res => {
        if (res.code == -10) {
          wx.showModal({
            title: '提示',
            content: '您已完成实名认证，如需绑定新的微信号，请联系客服。'
          });
        }if (res.code == 1) {
          console.log(111)
          util.requestFile(api.MessageSubmit,
            that.data.twoImg, "certBackFile",
            {
              certBackMd5: that.data.certBackMd5,
              certNo: that.data.cardNumber,
              certType: 0,
              userName: that.data.nameData
            }, 'POST', 'application/x-www-form-urlencoded').then(res => {
              if (res.code == -10) {
                wx.showModal({
                  title: '提示',
                  content: '您已完成实名认证，如需绑定新的微信号，请联系客服。'
                });
              }if (res.code == 1) {
                console.log(2222)
                wx.navigateTo({
                  url: '/pages/video/video'
                })
              }else{
                this.setData({
                  warn: "身份证照片或姓名或身份证号输入错误！",
                  isSubmit: true,
                })
              }
            });
        }else {
          this.setData({
            warn: "身份证照片或姓名或身份证号输入错误！",
            isSubmit: true,
          })
        }

      });



    }, 500)

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // util.request(api.GetUserMessage,
    //   {

    //   }, 'POST', 'application/x-www-form-urlencoded').then(res => {
    //     if (res.code == 1) {
    //       console.log(res.data)
    //       this.setData({
    //         userMessage: res.data,
    //         certBackUrl: res.data.certBackUrl,
    //         certFrontUrl: res.data.certFrontUrl,
    //       })
    //       console.log(this.data.userMessage)
    //     }
    //   });
  },
  // 点击照相
  takePictures: function(e) {
    var that = this;
    var query = e.currentTarget.dataset['index'];
    that.setData({
      num: query,
      // certBackUrl:'',
      // certFrontUrl:'',
    });
    //console.log(that.data.num)
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        //console.log(that.data.num)
        if (that.data.num == 1) {
          that.setData({
            attendSuccessImg: tempFilePaths[0],
            isHint1: true
          });
          //身份证正面ocr
          util.requestFile(api.GetIDCardOCR,
            that.data.attendSuccessImg, "imageFile",
            {
              cardSide: "FRONT"
            }, 'POST', 'application/x-www-form-urlencoded').then(res => {
              console.log(res)
              if(res.code==1){
                that.setData({
                  nameData: res.data.userName,
                  cardNumber: res.data.certNo,
                  certFrontMd5: res.data.certFrontMd5,
                  isSubmit: false,
                  warn: "",
                });
              } else if (res.code !== 1 && res.msg == 'error'){
                that.setData({
                  warn: "身份证照片或姓名或身份证号输入错误！",
                  isSubmit: true,
                })
              } else if (res.code !== 1 && res.msg !== 'error') {
                that.setData({
                  warn: res.msg,
                  isSubmit: true,
                })
              }

            });







        } else {
          that.setData({
            twoImg: tempFilePaths[0],
            isHint2: true
          });
          //身份证反面ocr
          util.requestFile(api.GetIDCardOCR,
            that.data.twoImg, "imageFile",
            {
              cardSide: "BACK"
            }, 'POST', 'application/x-www-form-urlencoded').then(res => {
              console.log(res)
              if (res.code == 1) {
                that.setData({
                  certBackMd5: res.data.certBackMd5,
                  isSubmit2: false,
                  warn2: "",
                });
              } else if (res.code !== 1 && res.msg == 'error') {
                that.setData({
                  warn2: "身份证照片或姓名或身份证号输入错误！",
                  isSubmit2: true,
                })
              } else if (res.code !== 1 && res.msg !== 'error') {
                that.setData({
                  warn2: res.msg,
                  isSubmit2: true,
                })
              }

            });
        }



        // 上传图片
        //判断机型
        // var model = "";
        // wx.getSystemInfo({
        //   success: function(res) {
        //     var that = this;
        //     model = res.model;
        //   }
        // })
        // if (model.indexOf("iPhone") <= 0) {
        //   // that.uploadFileOpt(that.data.attendSuccessImg);
        //   //console.log(111111)
        // } else {
        //   drawCanvas();

        // }

        // 缩放图片
        // function drawCanvas() {
        //   const ctx = wx.createCanvasContext('attendCanvasId');
        //   ctx.drawImage(tempFilePaths[0], 0, 0, 94, 96);
        //   ctx.draw();
        //   that.prodImageOpt();
        // }
      }
    });
  },

  // 生成图片
  // prodImageOpt: function() {
  //   var that = this;
  //   wx.canvasToTempFilePath({
  //     canvasId: 'attendCanvasId',
  //     success: function success(res) {
  //       that.setData({
  //         canvasImgUrl: res.tempFilePath
  //       });
  //       // 上传图片
  //       that.uploadFileOpt(that.data.canvasImgUrl);
  //     },
  //     complete: function complete(e) {}
  //   });
  // },


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
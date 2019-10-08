// pages/complain/complain.js
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iptContent: '',
    imgs: [],
    imgLength: 0,
    type: '',
    num: 0,
    tepe1: false,
    tepe2: false,
    tepe3: false,
    tepe4: false,
    tepe5: false,
  },
  bindKeyInput: function(e) {
    this.setData({
      iptContent: e.detail.value
    })
    //console.log(e.detail.value)
  },
  //提交建议
  getSuggest: function() {
    //console.log(11)
    if (this.data.type && this.data.iptContent) {
      //console.log(22)
      util.request(api.AddUserSuggest, {
        content: this.data.iptContent,
        type: this.data.num
      }, 'POST', 'application/x-www-form-urlencoded').then(res => {
        console.log(res)
        if (res.code == 1) {
          if (this.data.imgs.length > 0) {
            let dataId = res.data;
            for (var i = 0; i < this.data.imgs.length; i++) {
              util.requestFile(api.AddUserSuggestFile,
                this.data.imgs[i], "imageFile", {
                  pid: dataId,
                }, 'POST', 'application/x-www-form-urlencoded').then(res => {
                if (res.code == 1) {
                  console.log(2222)
                  wx.showToast({
                    title: '反馈成功',
                    icon: 'success',
                    duration: 1500
                  })
                  setTimeout(() => {
                    wx.switchTab({
                      url: '/pages/me/me'
                    });
                  }, 1500)
                } else {
                  wx.showToast({
                    title: '网络资源错误',
                    duration: 1500
                  })
                }
              });
            }
          } else {
            wx.showToast({
              title: '反馈成功',
              icon: 'success',
              duration: 1500
            })
            setTimeout(() => {
              wx.switchTab({
                url: '/pages/me/me'
              });
            }, 1500)
          }

        } else {
          wx.showToast({
            title: '网络资源错误',
            duration: 1500
          })
        }
      });
    } else {
      wx.showModal({
        title: '错误',
        content: '建议类型和输入内容不能为空！'
      });
    }
  },


  //选择建议类型
  suggesType: function(e) {
    //console.log(e.currentTarget.dataset['value'])
    //console.log(e.currentTarget.dataset['index'])
    let types = e.currentTarget.dataset['value']
    let mixi = e.currentTarget.dataset['index']
    //console.log(mixi)
    if (mixi == 1) {
      this.setData({
        tepe1: true,
        tepe2: false,
        tepe3: false,
        tepe4: false,
        tepe5: false,
        type: types,
        num: mixi - 1,
      });
    }
    if (mixi == 2) {
      this.setData({
        tepe1: false,
        tepe2: true,
        tepe3: false,
        tepe4: false,
        tepe5: false,
        type: types,
        num: mixi - 1,
      });
    }
    if (mixi == 3) {
      this.setData({
        tepe1: false,
        tepe2: false,
        tepe3: true,
        tepe4: false,
        tepe5: false,
        type: types,
        num: mixi - 1,
      });
    }
    if (mixi == 4) {
      this.setData({
        tepe1: false,
        tepe2: false,
        tepe3: false,
        tepe4: true,
        tepe5: false,
        type: types,
        num: mixi - 1,
      });
    }
    if (mixi == 5) {
      this.setData({
        tepe1: false,
        tepe2: false,
        tepe3: false,
        tepe4: false,
        tepe5: true,
        type: types,
        num: mixi - 1,
      });
    }
    //console.log(this.data.num)
  },


  //删除照片
  cancel: function(e) {
    // console.log(e)
    // console.log(e.currentTarget.dataset['index'])
    let arr = this.data.imgs;
    arr.splice(e.currentTarget.dataset['index'], 1);
    this.setData({
      imgs: arr,
      imgLength: arr.length
    });
  },

  // 点击照相
  takePictures: function() {
    var that = this;
    // var query = e.currentTarget.dataset['index'];
    // that.setData({
    //   num: query,
    // });
    //console.log(that.data.num)
    wx.chooseImage({
      count: 5, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      // 可以指定来源是相册还是相机，默认二者都有
      sourceType: ['album'],
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        //console.log(tempFilePaths)
        if (that.data.imgLength > 0 && that.data.imgLength < 5){
          if (that.data.imgLength == 1 && tempFilePaths.length>4){
            tempFilePaths = tempFilePaths.splice(0,4)
          }
          if (that.data.imgLength == 2 && tempFilePaths.length > 3) {
            tempFilePaths = tempFilePaths.splice(0, 3)
          }
          if (that.data.imgLength == 3 && tempFilePaths.length > 2) {
            tempFilePaths = tempFilePaths.splice(0, 2)
          }
          if (that.data.imgLength == 4 && tempFilePaths.length > 1) {
            tempFilePaths = tempFilePaths.splice(0, 1)
          }
          let imgsArr = that.data.imgs
          for (var i = 0; i < tempFilePaths.length;i++){
            imgsArr.push(tempFilePaths[i])
            console.log(imgsArr)
            that.setData({
              imgs: imgsArr,
              imgLength: imgsArr.length
            });
          }
          
        }
        if (that.data.imgLength == 0){
          that.setData({
            imgs: tempFilePaths,
            imgLength: tempFilePaths.length
          });
        }
        





        // 上传图片
        //判断机型
        var model = "";
        wx.getSystemInfo({
          success: function(res) {
            var that = this;
            model = res.model;
          }
        })
        if (model.indexOf("iPhone") <= 0) {
          // that.uploadFileOpt(that.data.attendSuccessImg);
          //console.log(111111)
        } else {
          drawCanvas();

        }

        // 缩放图片
        function drawCanvas() {
          const ctx = wx.createCanvasContext('attendCanvasId');
          ctx.drawImage(tempFilePaths[0], 0, 0, 94, 96);
          ctx.draw();
          that.prodImageOpt();
        }
      }
    });
  },

  // 生成图片
  prodImageOpt: function() {
    var that = this;
    wx.canvasToTempFilePath({
      canvasId: 'attendCanvasId',
      success: function success(res) {
        that.setData({
          canvasImgUrl: res.tempFilePath
        });
        // 上传图片
        that.uploadFileOpt(that.data.canvasImgUrl);
      },
      complete: function complete(e) {}
    });
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
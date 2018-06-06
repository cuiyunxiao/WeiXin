const util = require('../../../utils/config.js');
const geturl = require('../../../config.js').geturl;
const getOne = require('../../../config.js').getOne;
const confirmphoto = require('../../../config.js').confirmphoto;
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    loginBtnTxt: "确认需求",
    loginBtnBgBgColor: "#ff9800",
    btnLoading: false,
    disabled: false,
    orderlist: null,
    requireNo: '',
    phoScanReqs: [],
  },
  setLoginData1: function () {
    this.setData({
      loginBtnTxt: "正在提交",
      disabled: !this.data.disabled,
      loginBtnBgBgColor: "#999",
      btnLoading: !this.data.btnLoading
    });
  },
  setLoginData2: function () {
    this.setData({
      loginBtnTxt: "确认需求",
      disabled: !this.data.disabled,
      loginBtnBgBgColor: "#ff9800",
      btnLoading: !this.data.btnLoading
    });
  },
  notarize:function(){
    var that = this
    wx.request({
      url: geturl(confirmphoto),
      data: {
        requireNo: that.data.requireNo
      },
      method: 'POST',
      header: {
        'content-type': 'application/json;charset=utf-8' // 默认值
      },
      dataType: "json",
      success: function (res) {
        if (res.data.status == 200) {
          wx.showToast({
            title: res.data.data,
            icon: 'success',
            duration: 1500
          })
        }
        setTimeout(function () {
          wx.navigateTo({
            url: '../submit_order/submit_order',
          })
            ;
        }, 1500);
        that.setLoginData1();
      }
    })
     
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      requireNo: app.appData.requireNo
    })
    var requireNo = that.data.requireNo
    wx.request({
      url: geturl(getOne + '/' + requireNo),
      method: 'GET',
      data: {
        requireNo: that.data.requireNo,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      dataType: "json",
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          orderlist: res.data.data,
          phoScanReqs: res.data.data.phoScanReqs
        })

      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
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
    this.setLoginData2();
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
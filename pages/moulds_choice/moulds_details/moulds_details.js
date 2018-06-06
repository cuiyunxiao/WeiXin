const util = require('../../../utils/config.js');
const geturl = require('../../../config.js').geturl;
const getOne = require('../../../config.js').getOne;
var app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputname: '',//设计的主题
    textcontent: '',//设计的需求
    requireNo: '',
    orderlist: null,
    mudleReqs: [],
    show: 0,//显示报价
  },

  notarize: function () {
    wx.navigateTo({
      url: '../print_notarize/print_notarize',
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(app.appData.requireNo)
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
        if (res.data.data.requireStatus == 'dsl' || res.data.data.requireStatus == 'wtj') {
          that.setData({
            show: 1
          })
        }
        that.setData({
          orderlist: res.data.data,
          mudleReqs: res.data.data.mudleReqs
        })
        console.log(that.data.mudleReqs)
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
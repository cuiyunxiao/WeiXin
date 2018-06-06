
const util = require('../../../utils/config.js');
const geturl = require('../../../config.js').geturl;
const WxParse= require('../../../wxParse/wxParse.js')//引入富文本解析插件
const noticedetail = require('../../../config.js').noticedetail;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleNo:null,
    article:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var index = options.index
    
    var that = this
      wx.request({
        url: geturl(noticedetail),
        method: 'POST',
        data: {
          id: index,

        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        dataType: "json",
        success: function (res) {
          var temp = WxParse.wxParse('article', 'html', res.data.data.content, that, 5);
          that.setData({
            article: temp
          })
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
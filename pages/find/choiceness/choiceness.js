
var app = getApp()
const util = require('../../../utils/config.js');
const geturl = require('../../../config.js').geturl;
const bestChapter = require('../../../config.js').bestChapter;
const discount = require('../../../config.js').discount
const easyKnow = require('../../../config.js').easyKnow


Page({
  /**
   * 页面的初始数据
   */
  data: {
    category: [
      { name: '精选', id: 'jingxuan' },
      { name: '优惠', id: 'youhui' },
      { name: '易知', id: 'yizhi' },
      { name: '培训', id: 'peixun' },
      { name: '赛事', id: 'saishi' },
    ],
    current: 0,
    isScroll: false,
    toView: 'jingxuan',
    orderlist: []
  },
  // 添加点击事件
  switchTab(e) {
    this.setData({
      toView: e.target.dataset.id,
      current: e.target.dataset.index
    })

    if (this.data.current == 0){
      var that = this
      // 在页面加载时候渲染页面
      wx.request({
        url: geturl(bestChapter),
        method: 'POST',
        dataType: "json",
        success: function (res) {
          that.setData({
            orderlist: res.data.data.content
          })
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
    } else if (this.data.current == 1){
      var that = this
      wx.request({
        url: geturl(discount),
        method: 'POST',
        dataType: "json",
        success: function (res) {
          // success
      
          that.setData({
            orderlist: res.data.data.content
          })
          console.log(res.data.data.content)
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
    } else if (this.data.current == 2) {
      var that = this
      wx.request({
        url: geturl(easyKnow),
        method: 'POST',
        dataType: "json",
        success: function (res) {
          // success
      
          that.setData({
            orderlist: res.data.data.content
          })
          console.log(res.data.data.content)
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // 在页面加载时候渲染页面
    wx.request({
      url: geturl(bestChapter),
      method: 'POST', 
      dataType: "json",
      success: function (res) {
        // success
        console.log(res)
        that.setData({
          orderlist: res.data.data.content
        })
        console.log(res.data.data.content)
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })

  },
  //获取详情
  getDetail:function(e){
    var that = this;
    var index = e.currentTarget.dataset.id //获取下标
    var orderlist = that.data.orderlist;
    var articleNo = orderlist[index].articleNo
    var current = that.data.current
    app.appData.articleNo = articleNo
    wx.navigateTo({
      url: '../detail/detail?current=' + current,
    })
  } ,

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
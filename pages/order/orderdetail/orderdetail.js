
const util = require('../../../utils/config.js');
const geturl = require('../../../config.js').geturl;
const orderone = require('../../../config.js').orderone;
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderNo: null,
    address: {},
    invoice: {},
    order: {},
    orderpay: [],
    orderdets: [],
    products: [],
    dataList: [],//需求详细
    attachName:"",
  },
  // 催单
  cuidan: function () {
    wx.showModal({
      title: '提示',
      content: '已经帮您催单请耐心等待。。。。',
    })

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      orderNo: app.appData.orderNo
    })
    var orderNo = that.data.orderNo
    wx.request({
      url: geturl(orderone + '/' + orderNo),
      method: 'GET',
      data: {
        orderNo: that.data.orderNo,

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      dataType: "json",
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          console.log(res)
          var data = res.data.data
          console.log(data)
          that.setData({
            address: data.address,
            invoice: data.invoice,
            order: data.order,
            orderPay: data.orderPay,
            orderdets: data.orderdets,
            products: data.products,
          })
          for (var i = 0; i < data.products.length; i++) {
            if (data.products[i].entityReqs.length !=0) {
              that.setData({
                dataList: data.products[i].entityReqs
              })
              for (var i = 0; i < that.data.dataList.length; i++) {
                var attachName = that.data.dataList[i].attachName.substring(0, 20)
                that.setData({
                  attachName: attachName
                })
              }
            } else if (data.products[i].industryReqs.length != 0) {
              that.setData({
                dataList: data.products[i].industryReqs
              })
              // for (var i = 0; i < that.data.dataList.length; i++) {
              //   var attachName = that.data.dataList[i].attachName.substring(0, 20)
              //   that.setData({
              //     attachName: attachName
              //   })
              // }
            } else if (data.products[i].mudleReqs.length != 0 ) {
              that.setData({
                dataList: data.products[i].mudleReqs
              })
              for (var i = 0; i < that.data.dataList.length; i++) {
                var attachName = that.data.dataList[i].attachName.substring(0, 20)
                that.setData({
                  attachName: attachName
                })
              }
            } else if (data.products[i].perScanReqs.length != 0  ) {
              that.setData({
                dataList: data.products[i].perScanReqs
              })
              for (var i = 0; i < that.data.dataList.length; i++) {
                var attachName = that.data.dataList[i].attachName.substring(0, 20)
                that.setData({
                  attachName: attachName
                })
              }
            } else if (data.products[i].phoScanReqs.length != 0  ) {
              that.setData({
                dataList: data.products[i].phoScanReqs
              })
              for (var i = 0; i < that.data.dataList.length; i++) {
                var attachName = that.data.dataList[i].attachName.substring(0, 20)
                that.setData({
                  attachName: attachName
                })
              }
            } else if (data.products[i].printReqs.length != 0 ) {
              that.setData({
                dataList: data.products[i].printReqs
              })
              for (var i = 0; i < that.data.dataList.length; i++) {
                var attachName = that.data.dataList[i].attachName.substring(0, 20)
                that.setData({
                  attachName: attachName
                })
              }
            }
           
          }
        }
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
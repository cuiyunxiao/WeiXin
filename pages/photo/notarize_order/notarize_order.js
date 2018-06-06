var app = getApp()
const geturl = require('../../../config.js').geturl;
const getOne = require('../../../config.js').getOne;
const reqtopay = require('../../../config.js').reqtopay;
const findMrAddress = require('../../../config.js').findMrAddress;
const ordersave = require('../../../config.js').ordersave;
const orderone = require('../../../config.js').orderone;
const publicpay = require('../../../config.js').publicpay;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    invoiceway: '请编辑',//开发票方式
    personname: '',//名称
    invoiceTitle: '',//名称
    invoiceinfo: {},//发票信息
    items: [
      { id: '0', value: '是' },
      { id: '1', value: '否' },
    ],
    sharetype: '是',//扫描类型
    textcontent: '',//描述内容
    textareacontent: '',
    // type:null,
    dataObj: null,//页面初始化时候返回信息
    address: null,
    invoice: null,
    order: null,
    orderdets: [],
    //发票类型
    invoiceid: null,
    createTime: null,
    orderdetIdhidden: null,//订单需求明细id
    orderNo: null,
    remarkMsg: null,//备注信息
        // item: [
    //   { id: '0', value: '对公转账', checked: 'true' },
    //   { id: '1', value: '微信支付（暂未开通）', checked: 'false' },
    // ],
  },
  radioChange: function (e) {
    if (e.detail.value == 0) {
      this.setData({
        sharetype: '是'
      })
    } else {
      this.setData({
        sharetype: '否'
      })
    }

    console.log(this.data.sharetype)
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  bindTextArea: function (e) {
    this.setData({
      textcontent: e.detail.value
    })
    wx.setStorage({
      key: 'textcontent',
      data: this.data.textcontent,
      success: function (res) {
        console.log(res)
      }
    })

  },
  payment: function () {
    var that = this;
    var order = {};
    order.address = {};
    var orderdets = []; var OrderDetail = {};
    order.address.id = that.data.address.id;
    order.payType = 'wechatpay';
    order.remarkMsg = that.data.textcontent;
    order.id = that.data.orderdetIdhidden;
    order.createTime = that.data.createTime;
    order.orderNo = that.data.order.orderNo;
    order.invoice = {}
    if (that.data.type == 'p') {
      order.invoice = {
        invoiceNo: that.data.invoice.invoiceNo,
        id: that.data.invoiceid,
        type: that.data.type,
        invoicetitle: that.data.invoiceinfo.invoicetitle,
      }
    }
    if (that.data.type == 'z') {
      order.invoice = {
        invoiceNo: that.data.invoice.invoiceNo,
        id: that.data.invoiceid,
        type: that.data.type,
        invoiceTitle: that.data.invoiceinfo.invoiceTitle,
        itinCode: that.data.invoiceinfo.itinCode,
        bank: that.data.invoiceinfo.bank,
        bankCode: that.data.invoiceinfo.bankCode,
        phone: that.data.invoiceinfo.phone,
        address: that.data.invoiceinfo.address,
      }
    }
    for (var i = 0; i < that.data.orderdets.length; i++) {
      OrderDetail.productNo = that.data.orderdets[i].productNo
      OrderDetail.id = that.data.orderdetIdhidden
      orderdets.push(OrderDetail)
    }
    order.orderdets = orderdets
    console.log(order.invoice)
    console.log(order)
    wx.request({
      url: geturl(ordersave),
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      dataType: "json",
      data: JSON.stringify(order),
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          wx.request({
            url: geturl(publicpay + '/' + order.orderNo),
            method: 'GET',
            header: {
              'content-type': 'application/json' // 默认值
            },
            dataType: "json",
            success: function (res) {
              var orderNo = res.data.data.orderNo
              var tel = res.data.data.tel
              wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 2000
              })
              setTimeout(function () {
                wx.redirectTo({
                  url: '../modeling_success/modeling_success' + '?orderNo=' + orderNo + '&tel=' + tel,
                })
              }, 2500)
            }
          })
        } else {
          wx.showToast({
            title: '支付失败',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  editinvoice: function () {
    wx.navigateTo({
      url: '../invoice_info/invoice_info',
    })
  },
  adressTo: function () {
    wx.navigateTo({
      url: '../../address/address_management/address_management',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


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
    var that = this;
    that.setData({
      requireNo: app.appData.requireNo,
      invoiceTitle: app.appData.invoice.invoiceTitle,
      invoiceway: app.appData.invoice.invoiceway,
      personname: app.appData.invoice.personname,
      remarkMsg: app.appData.remarkMsg,
      invoiceway: app.appData.invoice.invoiceway,
      invoiceTitle: app.appData.invoice.invoiceTitle,
      orderdets: app.appData.orderdets
    })
    var requireNo = that.data.requireNo
    if (app.appData.chooseflag == 0) {
      wx.request({
        url: geturl(findMrAddress),//获取默认地址
        header: {
          'content-type': 'json' // 默认值
        },
        method: 'GET',
        success: function (res) {
          console.log(res)
          if (res.data.status == 200) {
            that.setData({
              address: res.data.data
            })
          }

        }
      })
    } else if (app.appData.chooseflag == 1) {
      that.setData({
        address: null,
        address: app.appData.address
      })
    }
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
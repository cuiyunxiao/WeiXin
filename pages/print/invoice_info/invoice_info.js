
const uploadFileUrl = require('../../../config.js').uploadFileUrl;
const CreateListUrl = require('../../../config.js').CreateListUrl;
const util = require('../../../utils/config.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: [
      { name: '纸质普通发票', id: 0 },
      { name: '纸质增值税发票', id: 1 },
    ],
    current: 0,
    isScroll: false,
    invoiceinfo: {},
    invoicetitle: '',//纸质发票抬头
    personname: '',//个人姓名
    toView: 1,//是否添加识别号
    invoiceTitle: '',//增值发票抬头
    itinCode: '',//纳税人识别号
    invoicenum: '',//企业税号
    bank: '',//开户银行
    bankCode: '',//开户账号
    address: '',//企业地址
    phone: '',//企业电话
    invoiceway: '纸质普通发票',//开发票方式
    type: 'p',
    items: [
      { id: '0', value: '个人', },
      { id: '1', value: '企业', },
    ],

  },

  // 单选按钮
  radioChange: function (e) {
    var id = e.detail.value
    if (id == 0) {
      this.setData({
        invoicetitle: '个人',
        toView: 1,
      })
    }
    if (id == 1) {
      this.setData({
        invoicetitle: '企业',
        toView: 0,
      })
    }

  },
  // 设置获取个人发票信息
  bindinput: function (e) {
    var personname = e.detail.value
    this.setData({
      personname: personname
    })

  },

  // 获取纳税人识别号
  bindtoView: function (e) {
    var TaxpayerID = e.detail.value
    this.setData({
      itinCode: TaxpayerID
    })

  },
  //获取增值发票抬头
  invoiceTitle: function (e) {
    var invoiceTitle = e.detail.value
    this.setData({
      invoiceTitle: invoiceTitle
    })

  },

  //获取企业税号
  bindinvoicenum: function (e) {
    var invoicenum = e.detail.value
    this.setData({
      invoicenum: invoicenum
    })

  },

  //获取开户银行
  bankname: function (e) {
    var bank = e.detail.value
    this.setData({
      bank: bank
    })

  },

  //获取开户账号
  accountnumber: function (e) {
    var bankCode = e.detail.value
    this.setData({
      bankCode: bankCode
    })

  },
  //获取企业地址
  bindaddress: function (e) {
    var address = e.detail.value
    this.setData({
      address: address
    })

  },

  //获取企业电话
  bindphone: function (e) {
    var phone = e.detail.value
    this.setData({
      phone: phone
    })

  },
  // 添加点击事件
  switchTab(e) {
    this.setData({
      toView: e.target.dataset.id,
      current: e.target.dataset.index
    })
    var current = this.data.current;
    if (current == 0) {
      this.setData({
        invoiceway: '纸质普通发票',
        type: 'p'
      })
    }
    if (current == 1) {
      this.setData({
        invoiceway: '纸质增值税发票',
        type: 'z'
      })
    }
    var globainvoice = app.appData.globainvoice;
    globainvoice = { invoiceway: this.data.invoiceway, personname: this.data.personname, invoicetitle: this.data.invoicetitle }
    console.log(globainvoice)
  },
  //确认提交
  affirm: function () {
    var that = this
    var invoicetitle = this.data.invoicetitle;
    var personname = this.data.personname;
    var invoiceTitle = this.data.invoiceTitle;
    var TaxpayerID = this.data.TaxpayerID;
    var invoicenum = this.data.invoicenum;
    var bank = this.data.bank;
    var bankCode = this.data.bankCode;
    var address = this.data.address;
    var phone = this.data.phone;
    var type = this.data.type;
    var itinCode = this.data.itinCode;
    var invoiceinfo = {};
    invoiceinfo.invoicetitle = invoicetitle;
    invoiceinfo.personname = personname;
    invoiceinfo.invoiceTitle = invoiceTitle;
    invoiceinfo.invoicenum = invoicenum;
    invoiceinfo.bank = bank;
    invoiceinfo.bankCode = bankCode;
    invoiceinfo.address = address;
    invoiceinfo.phone = phone;
    invoiceinfo.type = type;
    invoiceinfo.itinCode = itinCode;
    that.setData({
      invoiceinfo: invoiceinfo
    })
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setData({
      invoiceway: this.data.invoiceway,//开发票方式
      personname: this.data.personname,//名称
      invoiceTitle: this.data.invoiceTitle,//名称
      invoiceinfo: this.data.invoiceinfo,
      type: this.data.type,
    })
    wx.navigateBack({
      url: '../submit_order/submit_order',
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
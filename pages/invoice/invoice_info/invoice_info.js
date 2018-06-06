
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
      { name: '纸质普通发票', id: 'instrudy' },
      { name: '纸质增值税发票', id: 'print' },
    ],
    current: 0,
    isScroll: false,
    orderlist: [],
    invoicetitle:'',//纸质发票抬头
    personname:'',//个人姓名
    toView:1,//是否添加识别号
    Valueinvoice:'',//增值发票抬头
    TaxpayerID:'',//纳税人识别号
    invoicenum:'',//企业税号
    bankname:'',//开户银行
    accountnumber:'',//开户账号
    cnmpanyaddr:'',//企业地址
    cnmpanyphone:'',//企业电话
    items: [
      { id: '0', value: '个人', checked: 'true'},
      { id: '1', value: '企业',  },
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
    console.log(personname)
  },

// 获取纳税人识别号
  bindtoView:function(e){
    var TaxpayerID = e.detail.value
      this.setData({
        TaxpayerID: TaxpayerID
      })
  },
//获取增值发票抬头
  bindValueinvoice: function (e) {
    var Valueinvoice = e.detail.value
    this.setData({
      Valueinvoice: Valueinvoice
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
  bindbankname: function (e) {
    var bankname = e.detail.value
    this.setData({
      bankname: bankname
    })
  },

//获取开户账号
  bindaccountnumber: function (e) {
    var accountnumber = e.detail.value
    this.setData({
      accountnumber: accountnumber
    })
  },
//获取企业地址
  bindcnmpanyaddr: function (e) {
    var cnmpanyaddr = e.detail.value
    this.setData({
      cnmpanyaddr: cnmpanyaddr
    })
  },

//获取企业电话
  bindcnmpanyphone: function (e) {
    var cnmpanyphone = e.detail.value
    this.setData({
      cnmpanyphone: cnmpanyphone
    })
    console.log(cnmpanyphone)
  },
  // 添加点击事件
  switchTab(e) {
    this.setData({
      toView: e.target.dataset.id,
      current: e.target.dataset.index
    })

  },
 //确认提交
  affirm:function(){
    var invoicetitle = this.data.invoicetitle;
    var personname = this.data.personname;
    var Valueinvoice = this.data.Valueinvoice;
    var TaxpayerID = this.data.TaxpayerID;
    var invoicenum = this.data.invoicenum;
    var bankname = this.data.bankname;
    var accountnumber = this.data.accountnumber;
    var cnmpanyaddr = this.data.cnmpanyaddr;
    var cnmpanyphone = this.data.cnmpanyphone;
    wx.request({
      url: CreateListUrl,
      method: 'POST',
      data: {

        "invoicetitle": invoicetitle,
        "personname": personname,
        "Valueinvoice": Valueinvoice,
        "TaxpayerID": TaxpayerID,
        "invoicetitle": invoicetitle,

        
      },
      success: function (result) {
        setTimeout(function () {
          util.showMessage(that, '提交成功！', 2000);
          console.log(result);
          wx.navigateTo({
            url: '../../common/submit_success/submit_success',
          })
        }, 2000);

      },
      fail: function ({ errMsg }) {
        console.log('request fail', errMsg)
        self.setData({
          loading: false
        })
      }
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
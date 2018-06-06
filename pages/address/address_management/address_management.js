var util = require("../../../utils/util.js");
const geturl = require('../../../config.js').geturl;
const showAddress = require('../../../config.js').showAddress;
const listAddress = require('../../../config.js').listAddress;
const saveAddress = require('../../../config.js').saveAddress;
const editAddress = require('../../../config.js').editAddress;
const addressMr = require('../../../config.js').addressMr;
const deleteAddress = require('../../../config.js').deleteAddress;
var app = getApp();
Page({
  data: {
    address: [],
    radioindex: '',
    id:'',
    checked:'false',
    colorflag:true,
  },
  onLoad: function (options) {
    var that = this
    //获取物流地址
    wx.request({
      url: geturl(showAddress),
      header: {
        'content-type': 'json' // 默认值
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          address: res.data.data
        })
        var address = that.data.address;
      }
    })
  },
  // 选择地址
chooseaddress:function(e){
  app.appData.address = null
  var that = this;
  var index = e.currentTarget.dataset.id //获取下标
  var address = that.data.address;
  var chooseaddress = address[index];
  app.appData.address = chooseaddress;
  app.appData.chooseflag = 1;
  console.log(app.appData.address)
},


  // 编辑地址
  editaddress: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.id //获取下标
    var address = that.data.address;
    var id = address[index].id;
    that.setData({
      id: address[index].id
    })
    wx.request({
      url: geturl(editAddress),
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
      method: 'POST',
      data: {
        id: id
      },
      success: function (res) {
        that.setData({
          address: res.data.data
        })
        console.log(that.data.address)
        var detail = {}
        var detail = {
          addressMx: that.data.address.addressMx,
          area: that.data.address.area,
          city: that.data.address.city,
          email: that.data.address.email,
          name: that.data.address.name,
          province: that.data.address.province,
          tel: that.data.address.tel,
          id: that.data.id
        }
        var details = JSON.stringify(detail);
        wx.navigateTo({
          url: '../edit_address/edit_address?details=' + details,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })

      },
    }) 
  },
  // 删除地址
  deladdress: function (e) {
    var that = this
    wx.showToast({
      title: '正在删除...',
      icon: 'loading',
      duration: 1000
    })
    var index = e.currentTarget.dataset.id //获取下标
    var address = that.data.address;
   
    var id = address[index].id
    wx.request({
      url: geturl(deleteAddress),
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      data: {
          id:id
      },
      success: function (res) {
   
        wx.request({
          url: geturl(showAddress),
          header: {
            'content-type': 'json' // 默认值
          },
          method: 'GET',
          success: function (res) {
            that.setData({
              address: res.data.data
            })
         
            var address = that.data.address;
          }
        })
      },
    })

  },
  
  onReady: function () {
    // 页面渲染完成
  },
  addAddress: function () {
    wx: wx.navigateTo({
      url: '../new_address/new_address',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
 
  onShow: function () {
    // 页面显示
    var that = this
    //获取物流地址
    wx.request({
      url: geturl(showAddress),
      header: {
        'content-type': 'json' // 默认值
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          address: res.data.data
        })
        console.log(that.data.address)

        var address = that.data.address;

      }
    })

  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})
var util = require("../../utils/util.js");
const personal = require('../../config.js').personal;
const geturl = require('../../config.js').geturl;

var app = getApp();

// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    accountName: '',
    tel: '',
    btwText: '登录'
  },

  /**
   * 获取用户信息
   */
  onLoad: function (options) {

  },

  // 点击退出登录
  btnClose: function () {
    wx.redirectTo({
      url: '../login/login',
    })
    this.setData({ username: "" })

  },
  // 跳转需求页面
  mydemand: function () {
    if (app.appData.userinfo == null) {

      wx.showModal({
        title: '提示',
        content: '请先登录',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../login/login',
            })
          } else if (res.cancel) {
            return false
          }
        }
      })


    } else {
      wx.navigateTo({
        url: '../mydemand/mydemand',
      })
    }

  },
  // 跳转订单页面
  myorder: function () {
    if (app.appData.userinfo == null) {

      wx.showModal({
        title: '提示',
        content: '请先登录',
      })

      setTimeout(function () {
        wx.navigateTo({
          url: '../login/login',
        })
      }, 1500);

    } else {
      wx.navigateTo({
        url: '../order/myorder/myorder',
      })
    }

  },

  // 跳转收货地址
  myaddress: function () {
    if (app.appData.userinfo == null) {

      wx.showModal({
        title: '提示',
        content: '请先登录',
      })

      setTimeout(function () {
        wx.navigateTo({
          url: '../login/login',
        })
      }, 1500);

    } else {
      wx.navigateTo({
        url: '../address/address_management/address_management',
      })
    }

  },

  // 跳转我的消息
  mynotice: function () {
    if (app.appData.userinfo == null) {

      wx.showModal({
        title: '提示',
        content: '请先登录',
      })



      setTimeout(function () {
        wx.navigateTo({
          url: '../login/login',
        })
      }, 1500);

    } else {
      wx.navigateTo({
        url: '../news/notice/notice',
      })
    }

  },

  // 跳转个人设置页面
  personalset: function () {
    if (app.appData.userinfo == null) {

      wx.showModal({
        title: '提示',
        content: '请先登录',
      })

      setTimeout(function () {
        wx.navigateTo({
          url: '../login/login',
        })
      }, 1500);

    } else {
      wx.navigateTo({
        url: '../personalset/personal_set/personal_set',
      })
    }

  },




  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //去登录页面
  btnopen:function(){
    wx.navigateTo({
      url: '../login/login',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    // console.log(personal)
    // console.log(geturl(personal))
    app.appData.flag = null;
    var that = this
    if (app.appData.userinfo !== null) {
      that.setData({
        btwText: '退出登录'
      })
    }
    wx.request({
      url: geturl(personal),
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      success: function (res) {
        if (res.data.status == 200) {
          that.setData({
            username: app.appData.userinfo.username,
            accountName: res.data.data.accountName,
            tel: res.data.data.tel
          })
        } else {
          return false
        }

      }

    })
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
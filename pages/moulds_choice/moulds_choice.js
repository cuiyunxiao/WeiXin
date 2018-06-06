const uploadFileUrl = require('../../config.js').uploadFileUrl;
const CreateListUrl = require('../../config.js').CreateListUrl;
const util = require('../../utils/config.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    HeadList: ["实物扫描", "人像扫描", "照片建模", "工业设计", "3D打印", "模具制造",],
    newHeadList: ["实物扫描", "人像扫描", "照片建模", "工业设计", "3D打印", "模具制造",],
    headSelect: 5,
    selectId: 1,
    scroll_xvalue: 0,
    scrollTop: 0,
    flag: true,
    cover: true,
    // input默认是1  
    num: 1,

  },
  preventD() { },
  bindinput: function (e) {
    this.setData({
      inputname: e.detail.value
    })

  },
  bindTextArea: function (e) {
    this.setData({
      textcontent: e.detail.value
    })

  },

  // 单选按钮
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  taggle: function (e) {
    var flags = this.data.flag;
    var covers = this.data.cover;
    console.log(flags)
    this.setData({
      flag: !flags
    })
    this.setData({
      cover: !covers
    })
    if (flags == false) {
      this.setData({
        newHeadList: ["实物扫描", "人像扫描", "照片建模", "工业设计", "3D打印", "模具制造",]
      })

    } else {
      this.setData({
        newHeadList: ["全部"]
      })
    }
  },

  headAction: function (e) {
    var self = this;
    var dataset = e.currentTarget.dataset,
      main_width = self.data.main_width;
    console.log(dataset);
    if (dataset.id == 0) {
      wx.switchTab({
        url: '../entity/add_entity/add_entity',
      })

    } else if (dataset.id == 1) {
      wx.redirectTo({
        url: '../personscan/person_scan/person_scan',
      })
    }
    else if (dataset.id == 2) {
      wx.redirectTo({
        url: '../photo/modeling_choice/modeling_choice',
      })
    }
    else if (dataset.id == 3) {
      wx.redirectTo({
        url: '../industry/add_industry/add_industry',
      })
    }
    else if (dataset.id == 4) {
      wx.redirectTo({
        url: '../print/print_choice/print_choice',
      })
    }
   
    var choseID;
    if (dataset.id == 0) {
      choseID = 1;
    } else if (dataset.id == 1) {
      choseID = 8;
    } else {
      choseID = 1;
    }
    console.log('choseid' + choseID);
    self.setData({
      scroll_xvalue: parseInt(dataset.id) * main_width,   //设置距离左边的位置
      headSelect: dataset.id,
      selectId: choseID,
      page: 1
    });

  },




  /*
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

      this.setData({ username: app.appData.userinfo.username })
    

    this.setData({
      headSelect: 5,
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
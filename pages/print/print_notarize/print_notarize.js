const util = require('../../../utils/config.js');
const geturl = require('../../../config.js').geturl;
const getOne = require('../../../config.js').getOne;
const confirmprint = require('../../../config.js').confirmprint;
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    loginBtnTxt: "确认需求",
    loginBtnBgBgColor: "#ff9800",
    btnLoading: false,
    disabled: false,
    orderlist: null,
    requireNo: '',
    printReqs: [],
    totalPrice: 0,           // 总价，初始为0
    totalquantity: 0,          // 总数，初始为0
    selectAllStatus: true,  // 全选状态，默认全选
    selected: true,
    id: '',
  },
  setLoginData1: function () {
    this.setData({
      loginBtnTxt: "正在提交",
      disabled: !this.data.disabled,
      loginBtnBgBgColor: "#999",
      btnLoading: !this.data.btnLoading
    });
  },
  setLoginData2: function () {
    this.setData({
      loginBtnTxt: "确认需求",
      disabled: !this.data.disabled,
      loginBtnBgBgColor: "#ff9800",
      btnLoading: !this.data.btnLoading
    });
  },
  notarize: function () {
    var that = this;
    var strb = that.data.id
    let printReqs = this.data.printReqs;
    wx.request({
      url: geturl(confirmprint),
      data: {
        requireNo: that.data.requireNo,
        checkStr: strb
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      dataType: "json",
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          wx.showToast({
            title: res.data.data,
            icon: 'success',
            duration: 1500
          })
          setTimeout(function () {
            wx.navigateTo({
              url: '../submit_order/submit_order',
            })
              ;
          }, 1500);
        } else {
          wx.showToast({
            title: '提交需求失败',
            icon: 'none',
            duration: 1500
          })
          return false
        }
        that.setLoginData1();
      }
    })
    app.appData.globaData = { totalPrice: this.data.totalPrice }

  },
   //勾选事件处理函数  
  checkboxChange: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.id //获取下标
    var printReqs = that.data.printReqs;
    var id = printReqs[index].id;
    const selected = printReqs[index].selected;
    printReqs[index].selected = !selected; 
    for (var key in printReqs) {
      if (printReqs[key].selected !== true) {
        that.setData({
          selectAllStatus: false
        });
        break;
      }
      that.setData({
        selectAllStatus: true
      });
    }
    that.setData({
      id: ''
    });
    var id = [];
    for (var i = 0; i < printReqs.length; i++) {
      if (printReqs[i].selected == true) {
        id.unshift(that.data.printReqs[i].id);
        var strb = id.join(";");
        console.log(strb)
        that.setData({
          id: strb
        })
      }
    }   
    this.setData({
      printReqs: printReqs
    });

    that.getTotalPrice();
    that.getTotalquantity();
  },
  /**
    * 全选事件
    */
  selectAll(e) {
    var that = this;
    let selectAllStatus = that.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    var printReqs = that.data.printReqs;
    for (let i = 0; i < printReqs.length; i++) {
      printReqs[i].selected = selectAllStatus;            // 改变所有商品状态
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      printReqs: printReqs
    });
    that.getTotalPrice();
    that.getTotalquantity();
  },
  /**
     * 计算总数
     */
  getTotalquantity() {
    let printReqs = this.data.printReqs;                  // 获取需求列表
    let total = 0;
    for (let i = 0; i < printReqs.length; i++) {         // 循环列表得到每个数据
      if (printReqs[i].selected) {                     // 判断选中才会计算价格
        total += parseInt(printReqs[i].qty)  // 所有数量加起来
      }
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      printReqs: printReqs,
      totalquantity: total
    });
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let printReqs = this.data.printReqs;
    let total = 0;
    for (let i = 0; i < printReqs.length; i++) {         // 循环列表得到每个数据
      if (printReqs[i].selected) {                     // 判断选中才会计算价格
        total += printReqs[i].qty * printReqs[i].price;   // 所有价格加起来
      }
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      printReqs: printReqs,
      totalPrice: total.toFixed(2)
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
   that.setLoginData2()
    let selectAllStatus = that.data.selectAllStatus;
    var printReqs = that.data.printReqs;
    if (that.data.selectAllStatus) {
      for (let i = 0; i < printReqs.length; i++) {
        this.data.printReqs[i].selected = true;            // 改变所有商品状态
      }
    }
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
        console.log(res.data.data)
        that.setData({
          orderlist: res.data.data,
          printReqs: res.data.data.printReqs
        })
        var id = []
        for (var i = 0; i < that.data.printReqs.length; i++) {
          that.data.printReqs[i].selected = true
          if (that.data.printReqs[i].selected = true) {
            id.unshift(that.data.printReqs[i].id);
          }
        }
        var strb = id.join(";");
        that.setData({
          id: strb
        })
        console.log(that.data.id)
        that.getTotalPrice();
        that.getTotalquantity();
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
    var that = this
    this.setLoginData2();
    that.getTotalPrice();
    that.getTotalquantity();
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
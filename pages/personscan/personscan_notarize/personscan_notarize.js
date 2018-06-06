const util = require('../../../utils/config.js');
const geturl = require('../../../config.js').geturl;
const getOne = require('../../../config.js').getOne;
const confirmperson = require('../../../config.js').confirmperson;
var app = getApp()
Page({
  data: {
    loginBtnTxt: "确认需求",
    loginBtnBgBgColor: "#ff9800",
    btnLoading: false,
    disabled: false,
    carts: [],               // 需求列表
    hasList: false,          // 列表是否有数据
    totalPrice: 0,           // 总价，初始为0
    totalquantity: 0,          // 总数，初始为0
    selectAllStatus: true,  // 全选状态，默认全选
    time: '2017-10-20 16:26:34',
    personnum: '',//扫描人数
    orderlist: null,
    requireNo: '',
    perScanReqs: [],
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
  onShow() {
    var globaData = app.appData.globaData
   
    this.setData({
      hasList: true,

    });
    this.getTotalPrice();
    this.getTotalquantity();
  },

  checkboxChange: function (e) {
    var that = this;
    var Allprice = 0, i = 0;
    var index = e.currentTarget.dataset.id //获取下标
    var perScanReqs = that.data.perScanReqs;
    var id = perScanReqs[index].id;
    const selected = perScanReqs[index].selected;
    perScanReqs[index].selected = !selected;
    for (var key in perScanReqs) {
      if (perScanReqs[key].selected !== true) {
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
    for (var i = 0; i < perScanReqs.length;i++){
      if (perScanReqs[i].selected == true){
        id.unshift(that.data.perScanReqs[i].id);
        var strb = id.join(";");
        console.log(strb)
        that.setData({
          id: strb
        })
      }
    }   
    that.setData({
      perScanReqs: perScanReqs
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
    var perScanReqs = that.data.perScanReqs;
    for (let i = 0; i < perScanReqs.length; i++) {
      perScanReqs[i].selected = selectAllStatus;            // 改变所有商品状态
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      perScanReqs: perScanReqs
    });
    that.getTotalPrice();
    that.getTotalquantity();
  },



  onLoad: function (options) {
    var that = this;
    let selectAllStatus = that.data.selectAllStatus;
    var perScanReqs = that.data.perScanReqs;
    if (that.data.selectAllStatus) {
      for (let i = 0; i < perScanReqs.length; i++) {
        this.data.perScanReqs[i].selected = true;            // 改变所有商品状态
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

        that.setData({
          orderlist: res.data.data,
          perScanReqs: res.data.data.perScanReqs,

        })
        var id = []
        for (var i = 0; i < that.data.perScanReqs.length; i++) {
          that.data.perScanReqs[i].selected = true
          if (that.data.perScanReqs[i].selected = true) {
            id.unshift(that.data.perScanReqs[i].id);
          }
        }
        var strb = id.join(";");
        that.setData({
          id: strb
        })
   
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
     * 计算总数
     */
  getTotalquantity() {
    let perScanReqs = this.data.perScanReqs;                  // 获取需求列表
    let total = 0;
    for (let i = 0; i < perScanReqs.length; i++) {         // 循环列表得到每个数据
      if (perScanReqs[i].selected) {                     // 判断选中才会计算价格
        total += parseInt(perScanReqs[i].qty)  // 所有数量加起来
      }
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      perScanReqs: perScanReqs,
      totalquantity: total
    });
  },
  /**
    * 生命周期函数--监听页面显示
    */
  onShow: function () {

    this.setLoginData2();
  },
  /**
   * 计算总价
   */
  getTotalPrice() {
    let perScanReqs = this.data.perScanReqs;
    let total = 0;
    for (let i = 0; i < perScanReqs.length; i++) {         // 循环列表得到每个数据
      if (perScanReqs[i].selected) {                     // 判断选中才会计算价格
        total += perScanReqs[i].qty * perScanReqs[i].price;   // 所有价格加起来
      }
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      perScanReqs: perScanReqs,
      totalPrice: total.toFixed(2)
    });
  },
  // 确认需求
  notarize: function () {
    app.appData.flag = true
    var that = this;
    var strb = that.data.id
    let perScanReqs = this.data.perScanReqs;
    wx.request({
      url: geturl(confirmperson),
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

  }
})


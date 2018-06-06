
const util = require('../../../utils/config.js');
const geturl = require('../../../config.js').geturl;
const orderquery = require('../../../config.js').orderquery;
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    category: [
      { name: '全部', id: 'quanbu' },
      { name: '待付款', id: 'daifukaun' },
      { name: '待交付', id: 'daizhifu' },
      { name: '待确认', id: 'daiqueren' },
      { name: '已完成', id: 'yiwancheng' },
    ],
    current: 0,
    isScroll: false,
    toView: 'quanbu',
    orderlist: [],
    attachName: [],
    status: 0,//状态
    orderdets: [],//订单信息列表 
    remarkMsg: null,//订单备注
    scrollTop: 0,
    scrollHeight: 0,
    hidden: true,
  },
  bindDownLoad: function () {
    //上拉  
    console.log("上拉")
    var that = this
    var p = 1
    that.setData({
      hidden: false
    });
    wx.request({
      url: geturl(orderquery),
      data: {
        pageNo: p
      },
      method: 'POST',
      dataType: "json",
      header: {
        'content-type': 'application/x-www-form-urlencode' // 默认值
      },
      success: function (res) {
        var l = that.data.orderlist
        for (var i = 0; i < res.data.data.content.length; i++) {
          l.push(res.data.data.content[i])
        }
        that.setData({
          orderlist: l
        });
        p++;
        that.setData({
          hidden: true
        });
      }
    });
  },
  // 催单
  cuidan: function () {
    wx.showModal({
      title: '提示',
      content: '已经帮您催单请耐心等待。。。。',
    })

  },
  // 点击跳转到订单详情页面
  getone: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.id //获取下标
    console.log(index)
    var orderlist = that.data.orderlist;
    var bizCode = orderlist[index].bizCode;
    var status = orderlist[index].status;
    var orderNo = orderlist[index].orderNo;
    var remarkMsg = orderlist[index].remarkMsg
    var invoice = orderlist[index].invoice
    var orderdets = []
    var orderdets = orderlist[index].orderdets
    if (bizCode == 'print' && status !== 'wpay') {
      app.appData.orderNo = orderNo
      app.appData.remarkMsg = remarkMsg
      app.appData.invoice.invoiceway = invoice.type
      app.appData.invoice.invoiceTitle = invoice.invoiceTitle
      app.appData.orderdets = orderdets
      wx.navigateTo({
        url: '../orderdetail/orderdetail',
      })
    } else if (bizCode == 'print' && status == 'wpay') {
      app.appData.orderNo = orderNo
      app.appData.remarkMsg = remarkMsg
      app.appData.invoice.invoiceway = invoice.type
      app.appData.invoice.invoiceTitle = invoice.invoiceTitle
      app.appData.orderdets = orderdets
      wx.navigateTo({
        url: '../../print/submit_order/submit_order',
      })
    } else if (bizCode == 'entity' && status !== 'wpay') {
      app.appData.orderNo = orderNo
      app.appData.remarkMsg = remarkMsg
      app.appData.invoice.invoiceway = invoice.type
      app.appData.invoice.invoiceTitle = invoice.invoiceTitle
      app.appData.orderdets = orderdets
      wx.navigateTo({
        url: '../orderdetail/orderdetail',
      })
    } else if (bizCode == 'entity' && status == 'wpay') {
      app.appData.orderNo = orderNo
      app.appData.remarkMsg = remarkMsg
      app.appData.invoice.invoiceway = invoice.type
      app.appData.invoice.invoiceTitle = invoice.invoiceTitle
      app.appData.orderdets = orderdets
      wx.navigateTo({
        url: '../../entity/notarize_order/notarize_order',
      })
    } else if (bizCode == "industry" && status !== 'wpay') {
      app.appData.orderNo = orderNo
      app.appData.remarkMsg = remarkMsg
      app.appData.invoice.invoiceway = invoice.type
      app.appData.invoice.invoiceTitle = invoice.invoiceTitle
      app.appData.orderdets = orderdets
      wx.navigateTo({
        url: '../orderdetail/orderdetail',
      })
    } else if (bizCode == "industry" && status == 'wpay') {
      app.appData.orderNo = orderNo
      app.appData.remarkMsg = remarkMsg
      app.appData.invoice.invoiceway = invoice.type
      app.appData.invoice.invoiceTitle = invoice.invoiceTitle
      app.appData.orderdets = orderdets
      wx.navigateTo({
        url: '../../industry/notarize_order/notarize_order',
      })
    } else if (bizCode == "person" && status !== 'wpay') {
      app.appData.orderNo = orderNo
      app.appData.remarkMsg = remarkMsg
      app.appData.invoice.invoiceway = invoice.type
      app.appData.invoice.invoiceTitle = invoice.invoiceTitle
      app.appData.orderdets = orderdets
      wx.navigateTo({
        url: '../orderdetail/orderdetail',
      })
    } else if (bizCode == "person" && status == 'wpay') {
      app.appData.orderNo = orderNo
      app.appData.remarkMsg = remarkMsg
      app.appData.invoice.invoiceway = invoice.type
      app.appData.invoice.invoiceTitle = invoice.invoiceTitle
      app.appData.orderdets = orderdets
      wx.navigateTo({
        url: '../../personscan/notarize_order/notarize_order',
      })
    } else if (bizCode == "photo" && status !== 'wpay') {
      app.appData.orderNo = orderNo
      app.appData.remarkMsg = remarkMsg
      app.appData.invoice.invoiceway = invoice.type
      app.appData.invoice.invoiceTitle = invoice.invoiceTitle
      app.appData.orderdets = orderdets
      wx.navigateTo({
        url: '../orderdetail/orderdetail',
      })
    } else if (bizCode == "photo" && status == 'wpay') {
      app.appData.orderNo = orderNo
      app.appData.remarkMsg = remarkMsg
      app.appData.invoice.invoiceway = invoice.type
      app.appData.invoice.invoiceTitle = invoice.invoiceTitle
      app.appData.orderdets = orderdets
      wx.navigateTo({
        url: '../../photo/notarize_order/notarize_order',
      })
    } else if (bizCode == "mudle" && status !== 'wpay') {
      app.appData.orderNo = orderNo
      app.appData.remarkMsg = remarkMsg
      app.appData.invoice.invoiceway = invoice.type
      app.appData.invoice.invoiceTitle = invoice.invoiceTitle
      app.appData.orderdets = orderdets
      wx.navigateTo({
        url: '../orderdetail/orderdetail',
      })
    } else if (bizCode == "mudle" && status == 'wpay') {
      app.appData.orderNo = orderNo
      app.appData.remarkMsg = remarkMsg
      app.appData.invoice.invoiceway = invoice.type
      app.appData.invoice.invoiceTitle = invoice.invoiceTitle
      app.appData.orderdets = orderdets
      wx.navigateTo({
        url: '../../moulds_choice/submit_order/submit_order',
      })
    }
  },
  // 添加点击事件
  switchTab(e) {
    var that = this
    this.setData({
      toView: e.target.dataset.id,
      current: e.target.dataset.index,
    })
    if (this.data.current == 0) {
     
      var p = 1
      wx.getSystemInfo({
        success: function (res) {
          console.info(res.windowHeight);
          that.setData({
            scrollHeight: res.windowHeight
          });
        }
      });
      that.setData({
        hidden: false,
        orderlist: []
      });
      // 在页面加载时候渲染页面
      wx.request({
        url: geturl(orderquery),
        method: 'POST',
        data: {
          sText: encodeURI(null),
          sType: encodeURI(null),
          status: encodeURI(null),
          pageNo: p
        },
        dataType: "json",
        success: function (res) {
         
          var data = res.data.data
          // success
          var l = that.data.orderlist
          for (var i = 0; i < res.data.data.content.length; i++) {
            l.push(res.data.data.content[i])
          }
          that.setData({
            orderlist: l
          });
          p++;
          that.setData({
            hidden: true
          });
          for (var i = 0; i < that.data.orderlist.length; i++) {
            var orderdets = that.data.orderlist[i].orderdets;
            that.setData({
              orderdets: orderdets
            })
            if (that.data.orderlist[i].status == 'wpay') {
              that.setData({
                status: 1
              })
            }
          }
        },
      })
    } if (this.data.current == 1) {
      var that = this
      var that = this
      var p = 1
      wx.getSystemInfo({
        success: function (res) {
          console.info(res.windowHeight);
          that.setData({
            scrollHeight: res.windowHeight
          });
        }
      });
      that.setData({
        hidden: false,
        orderlist: []
      });
      // 在页面加载时候渲染页面
      wx.request({
        url: geturl(orderquery),
        method: 'POST',
        data: {
          sText: encodeURI(null),
          sType: encodeURI(null),
          status: "wpay",
          pageNo: p
        },
        dataType: "json",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
         
          var data = res.data.data
          var data = res.data.data
          // success
          var l = that.data.orderlist
          for (var i = 0; i < res.data.data.content.length; i++) {
            l.push(res.data.data.content[i])
          }
          that.setData({
            orderlist: l
          });
          p++;
          that.setData({
            hidden: true
          });
          for (var i = 0; i < that.data.orderlist.length; i++) {
            var orderdets = that.data.orderlist[i].orderdets;
            that.setData({
              orderdets: orderdets
            })
          }
        },
      })
    } if (this.data.current == 2) {
      var that = this
      var p = 1
      wx.getSystemInfo({
        success: function (res) {
          console.info(res.windowHeight);
          that.setData({
            scrollHeight: res.windowHeight
          });
        }
      });
      that.setData({
        hidden: false,
        orderlist: []
      });
      // 在页面加载时候渲染页面
      wx.request({
        url: geturl(orderquery),
        method: 'POST',
        data: {
          sText: encodeURI(null),
          sType: encodeURI(null),
          status: "wdeliver",
          pageNo: p
        },
        dataType: "json",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
        
          var data = res.data.data
          var data = res.data.data
          // success
          var l = that.data.orderlist
          for (var i = 0; i < res.data.data.content.length; i++) {
            l.push(res.data.data.content[i])
          }
          that.setData({
            orderlist: l
          });
          p++;
          that.setData({
            hidden: true
          });
          for (var i = 0; i < that.data.orderlist.length; i++) {
            var orderdets = that.data.orderlist[i].orderdets;
            that.setData({
              orderdets: orderdets
            })
          }
        },
      })
    } if (this.data.current == 3) {
      var that = this
      var p = 1
      wx.getSystemInfo({
        success: function (res) {
          console.info(res.windowHeight);
          that.setData({
            scrollHeight: res.windowHeight
          });
        }
      });
      that.setData({
        hidden: false,
        orderlist: []
      });
      // 在页面加载时候渲染页面
      wx.request({
        url: geturl(orderquery),
        method: 'POST',
        data: {
          sText: encodeURI(null),
          sType: encodeURI(null),
          status: "wsign",
          pageNo: p
        },
        dataType: "json",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
       
          var data = res.data.data
          var data = res.data.data
          // success
          var l = that.data.orderlist
          for (var i = 0; i < res.data.data.content.length; i++) {
            l.push(res.data.data.content[i])
          }
          that.setData({
            orderlist: l
          });
          p++;
          that.setData({
            hidden: true
          });
          for (var i = 0; i < that.data.orderlist.length; i++) {
            var orderdets = that.data.orderlist[i].orderdets;
            that.setData({
              orderdets: orderdets
            })
          }
        },
      })
    } if (this.data.current == 4) {
      var that = this
      var p = 1
      wx.getSystemInfo({
        success: function (res) {
          console.info(res.windowHeight);
          that.setData({
            scrollHeight: res.windowHeight
          });
        }
      });
      that.setData({
        hidden: false,
        orderlist: []
      });
      // 在页面加载时候渲染页面
      wx.request({
        url: geturl(orderquery),
        method: 'POST',
        data: {
          sText: encodeURI(null),
          sType: encodeURI(null),
          status: "finish",
          pageNo: p
        },
        dataType: "json",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success: function (res) {
         
          var data = res.data.data
          // success
          var data = res.data.data
          // success
          var l = that.data.orderlist
          for (var i = 0; i < res.data.data.content.length; i++) {
            l.push(res.data.data.content[i])
          }
          that.setData({
            orderlist: l
          });
          p++;
          that.setData({
            hidden: true
          });
          for (var i = 0; i < that.data.orderlist.length; i++) {
            var orderdets = that.data.orderlist[i].orderdets;
            that.setData({
              orderdets: orderdets
            })
          }
        },
      })
    }




  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    var that = this
    var p = 1
    that.setData({
      hidden: false,
      orderlist: []
    });
    // 在页面加载时候渲染页面
    wx.request({
      url: geturl(orderquery),
      method: 'POST',
      data: {
        sText: encodeURI(null),
        sType: encodeURI(null),
        status: encodeURI(null),
        pageNo: p
      },
      dataType: "json",
      success: function (res) {
        console.log(res.data.data)
        var data = res.data.data
        // success
        var l = that.data.orderlist
        for (var i = 0; i < res.data.data.content.length; i++) {
          l.push(res.data.data.content[i])
        }
        that.setData({
          orderlist: l
        });
        p++;
        that.setData({
          hidden: true
        });
        for (var i = 0; i < that.data.orderlist.length; i++) {
          var orderdets = that.data.orderlist[i].orderdets;
          that.setData({
            orderdets: orderdets
          })
          if (that.data.orderlist[i].status == 'wpay') {
            that.setData({
              status: 1
            })
          }
        }
      },
    })
  },
  // 删除订单
  // delorder: function (e) {
  //   wx.showToast({
  //     title: '正在删除...',
  //     icon: 'loading',
  //     duration: 3000
  //   })
  //   var that = this
  //   console.log(e.target.dataset.id)
  //   wx.request({
  //     url: url,
  //     method: 'DELETE', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
  //     // header: {}, // 设置请求的 header
  //     success: function (res) {
  //       if (res.data == 1) {
  //         that.onLoad()
  //         wx.hideToast()
  //       }

  //     },
  //     fail: function () {
  //       // fail
  //     },
  //     complete: function () {
  //       // complete
  //     }
  //   })
  // },

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
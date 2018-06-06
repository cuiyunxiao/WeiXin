const util = require('../../utils/config.js');
const geturl = require('../../config.js').geturl;
const query = require('../../config.js').query;
const recalldemand = require('../../config.js').recalldemand;
const deldemand = require('../../config.js').deldemand;
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    category: [
      { name: '全部', id: 'quanbu' },
      { name: '未提交', id: 'weitijiao' },
      { name: '待受理', id: 'daishouli' },
      { name: '未确认', id: 'weiqueren' },
      { name: '已确认', id: 'yiqueren' },
      { name: '未满足', id: 'weimanzu' }
    ],
    current: 0,
    isScroll: false,
    toView: 'quanbu',
    orderlist: [],
    attachName: [],
    status: 0,//状态
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
      url: geturl(query),
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
  // 添加点击事件
  switchTab(e) {
    var that = this
    this.setData({
      toView: e.target.dataset.id,
      current: e.target.dataset.index,
    })
 
    
    if (this.data.current == 0) {
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
        url: geturl(query),
        method: 'POST',
        data: {
          sText: null,
          sType: null,
          status: null,
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
            if (that.data.orderlist[i].requireStatus == "wtj") {
              that.setData({
                status: 1,
              })
            } else if (that.data.orderlist[i].requireStatus == "dsl") {
              that.setData({
                status: 1,
              })
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
    }
    if (this.data.current == 1) {
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
        url: geturl(query),
        method: 'POST',
        data: {
          sText: null,
          sType: null,
          status: "wtj",
          pageNo: p
        },

        dataType: "json",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
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
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
    }
    if (this.data.current == 2) {
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
        url: geturl(query),
        method: 'POST',
        data: {
          sText: null,
          sType: null,
          status: "dsl",
          pageNo: p
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
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

        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
    }
    if (this.data.current == 3) {
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
        url: geturl(query),
        method: 'POST',
        data: {
          sText: null,
          sType: null,
          status: "wqr",
          pageNo: p
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
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

        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
    }
    if (this.data.current == 4) {
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
        url: geturl(query),
        method: 'POST',
        data: {
          sText: null,
          sType: null,
          status: "qr",
          pageNo: p
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
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

        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
    }
    if (this.data.current == 5) {
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
        url: geturl(query),
        method: 'POST',
        data: {
          sText: null,
          sType: null,
          status: "wx",
          pageNo: p
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
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
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
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
      url: geturl(query),
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
          if (that.data.orderlist[i].requireStatus == "wtj") {
            that.setData({
              status: 1,
            })
          } else if (that.data.orderlist[i].requireStatus == "dsl") {
            that.setData({
              status: 1,
            })
          }
        }
      },
    })
  },

  //实现上滑加载
  onReachBottom: function () {
  },
  //获取需求详情
  getone: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.id //获取下标
    var orderlist = that.data.orderlist;
    var bizCode = orderlist[index].bizCode;
    var requireStatus = orderlist[index].requireStatus;
    var requireNo = orderlist[index].requireNo;
    if (bizCode == 'print' && requireStatus == 'dsl' ) {
      app.appData.requireNo = requireNo
      wx.navigateTo({
        url: '../print/print_details/print_details',
      })
    } else if (bizCode == 'print' && requireStatus == 'wqr') {
      app.appData.requireNo = requireNo
      wx.navigateTo({
        url: '../print/print_notarize/print_notarize',
      })
    } else if (bizCode == 'print' && requireStatus == 'wtj') {
      app.appData.requireNo = requireNo
      wx.navigateTo({
        url: '../print/print_notarize/print_notarize',
      })
    } else if (bizCode == 'print' && requireStatus == 'qr') {
      app.appData.requireNo = requireNo
      wx.navigateTo({
        url: '../print/submit_order/submit_order',
      })
    } 
    else if (bizCode == 'entity' && requireStatus == 'dsl') {
      app.appData.requireNo = requireNo
      wx.navigateTo({
        url: '../entity/entity_details/entity_details',
      })
    } else if (bizCode == 'entity' && requireStatus == 'wqr') {
      app.appData.requireNo = requireNo
      wx.navigateTo({
        url: '../entity/entity_notarize/entity_notarize',
      })
    } else if (bizCode == 'entity' && requireStatus == 'wtj') {
      app.appData.requireNo = requireNo
      wx.navigateTo({
        url: '../entity/entity_notarize/entity_notarize',
      })
    } else if (bizCode == 'entity' && requireStatus == 'qr') {
      app.appData.requireNo = requireNo
      wx.navigateTo({
        url: '../entity/submit_order/submit_order',
      })
    } 
    else if (bizCode == 'industry' && requireStatus == 'dsl' ) {
      app.appData.requireNo = requireNo
      wx.navigateTo({
        url: '../industry/industry_details/industry_details',
      })
    } else if (bizCode == 'industry' && requireStatus == 'wqr') {
      app.appData.requireNo = requireNo
      wx.navigateTo({
        url: '../industry/industry_design/industry_design',
      })
    } else if (bizCode == 'industry' && requireStatus == 'wtj') {
      app.appData.requireNo = requireNo
      wx.navigateTo({
        url: '../industry/industry_design/industry_design',
      })
    } else if (bizCode == 'industry' && requireStatus == 'qr') {
      app.appData.requireNo = requireNo
      wx.navigateTo({
        url: '../industry/submit_order/submit_order',
      })
    } 
    else if (bizCode == 'person' && requireStatus == 'dsl' ) {
      app.appData.requireNo = requireNo
      wx.navigateTo({
        url: '../personscan/personscan_details/personscan_details',
      })
    } else if (bizCode == 'person' && requireStatus == 'wqr') {
      app.appData.requireNo = requireNo
      wx.navigateTo({
        url: '../personscan/personscan_notarize/personscan_notarize',
      })
    } else if (bizCode == 'person' && requireStatus == 'wtj') {
      app.appData.requireNo = requireNo
      wx.navigateTo({
        url: '../personscan/personscan_notarize/personscan_notarize',
      })
    } else if (bizCode == 'person' && requireStatus == 'qr') {
      app.appData.requireNo = requireNo
      wx.navigateTo({
        url: '../personscan/submit_order/submit_order',
      })
    } 
    else if (bizCode == 'photo' && requireStatus == 'dsl' ) {
      app.appData.requireNo = requireNo
      wx.navigateTo({
        url: '../photo/photo_details/photo_details',
      })
    } else if (bizCode == 'photo' && requireStatus == 'wqr') {
      app.appData.requireNo = requireNo
      wx.navigateTo({
        url: '../photo/photo_modeling/photo_modeling',
      })
    } else if (bizCode == 'photo' && requireStatus == 'wyj') {
      app.appData.requireNo = requireNo
      wx.navigateTo({
        url: '../photo/photo_modeling/photo_modeling',
      })
    } else if (bizCode == 'photo' && requireStatus == 'qr') {
      app.appData.requireNo = requireNo
      wx.navigateTo({
        url: '../photo/submit_order/submit_order',
      })
    } 
    else if (bizCode == 'mudle' && requireStatus == 'dsl' ) {
      app.appData.requireNo = requireNo
      wx.navigateTo({
        url: '../moulds_choice/moulds_details/moulds_details',
      })
    }
    else if (bizCode == 'mudle' && requireStatus == 'wqr') {
      app.appData.requireNo = requireNo
      wx.navigateTo({
        url: '../moulds_choice/moulds_notarize/moulds_notarize',
      })
    } else if (bizCode == 'mudle' && requireStatus == 'wtj') {
      app.appData.requireNo = requireNo
      wx.navigateTo({
        url: '../moulds_choice/moulds_notarize/moulds_notarize',
      })
    } else if (bizCode == 'mudle' && requireStatus == 'qr') {
      app.appData.requireNo = requireNo
      wx.navigateTo({
        url: '../moulds_choice/submit_order/submit_order',
      })
    } 
  },
  //跳转到订单提交页面
goorder:function(e){
  var that = this;
  var index = e.currentTarget.dataset.id //获取下标
  var orderlist = that.data.orderlist;
  var bizCode = orderlist[index].bizCode;
  if (bizCode == 'print'){
    wx.navigateTo({
      url: '../print/submit_order/submit_order',
    })
  } else if (bizCode == 'entity'){
    wx.navigateTo({
      url: '../entity/submit_order/submit_order',
    })
  } else if (bizCode == 'industry') {
    wx.navigateTo({
      url: '../industry/submit_order/submit_order',
    })
  } else if (bizCode == 'person') {
    wx.navigateTo({
      url: '../personscan/submit_order/submit_order',
    })
  } else if (bizCode == 'photo') {
    wx.navigateTo({
      url: '../photo/submit_order/submit_order',
    })
  } else if (bizCode == 'mudle') {
    wx.navigateTo({
      url: '../moulds_choice/submit_order/submit_order',
    })
  }


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
  // 处理需求撤回或者删除
  dispose: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.id //获取下标
    var orderlist = that.data.orderlist;
    var requireStatus = orderlist[index].requireStatus;
    var requireNo = orderlist[index].requireNo;

    if (requireStatus == "dsl") {
      wx.showToast({
        title: '正在撤回...',
        icon: 'loading',
        duration: 1500
      })
      wx.request({
        url: geturl(recalldemand + '/' + requireNo),
        method: 'GET',
        header: {
          'content-type': 'application/json' // 默认值
        },
        dataType: "json",
        success: function (res) {
          console.log(res)
          wx.showToast({
            title: '撤回成功',
            duration: 1000
          })
          wx.request({
            url: geturl(query),
            method: 'POST',
            data: {
              sText: null,
              sType: null,
              status: null
            },
            dataType: "json",
            success: function (res) {
              // success
              that.setData({
                orderlist: res.data.data.content
              })
              console.log(that.data.orderlist)
              for (var i = 0; i < that.data.orderlist.length; i++) {

                if (that.data.orderlist[i].requireStatus == "wtj") {
                  that.setData({
                    status: 1,
                  })
                } else if (that.data.orderlist[i].requireStatus == "dsl") {
                  that.setData({
                    status: 1,
                  })
                }
              }
            },
          })
        }
      })
    } else if (requireStatus == "wtj") {
      wx.showToast({
        title: '正在删除...',
        icon: 'loading',
        duration: 1500
      })
      wx.request({
        url: geturl(deldemand + '/' + requireNo),
        method: 'GET',
        header: {
          'content-type': 'application/json' // 默认值
        },
        dataType: "json",
        success: function (res) {

          wx.showToast({
            title: '删除成功',
            duration: 1000
          })
          wx.request({
            url: geturl(query),
            method: 'POST',
            data: {
              sText: null,
              sType: null,
              status: null
            },
            dataType: "json",
            success: function (res) {
              // success
              that.setData({
                orderlist: res.data.data.content
              })

              for (var i = 0; i < that.data.orderlist.length; i++) {

                if (that.data.orderlist[i].requireStatus == "wtj") {
                  that.setData({
                    status: 1,
                  })
                } else if (that.data.orderlist[i].requireStatus == "dsl") {
                  that.setData({
                    status: 1,
                  })
                }
              }
            },
          })
        }
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

var app = getApp()
const util = require('../../../utils/config.js');
const geturl = require('../../../config.js').geturl;
const message = require('../../../config.js').message;
const delnotice = require('../../../config.js').delnotice;
const notice = require('../../../config.js').notice;
const noticedetail = require('../../../config.js').noticedetail;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    category: [
      { name: '系统通知', id: 'tongzhi' },
      { name: '系统公告', id: 'gonggao' },
    ],
    current: 0,
    isScroll: false,
    toView: 'tongzhi',
    orderlist: [],
    buttonClicked: false,
    details: '',//公告
    scrollTop : 0,
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
      url: geturl(message),
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
    this.setData({
      toView: e.target.dataset.id,
      current: e.target.dataset.index
    })
    var that = this;
    if (that.data.current == 0) {
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
      wx.request({
        url: geturl(message),
        data: {
          pageNo: p
        },
        method: 'POST',
        dataType: "json",
        header: {
          'content-type': 'application/x-www-form-urlencode' // 默认值
        },
        success: function (res) {
          console.log(res)
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
     that.bindDownLoad();
 
    } else if (that.data.current == 1) {
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
        orderlist:[]
      });
      wx.request({
        url: geturl(notice),
        method: 'POST',
        dataType: "json",
        header: {
          'content-type': 'application/x-www-form-urlencode' // 默认值
        },
        success: function (res) {
          console.log(res)
         
          that.setData({
            orderlist: res.data.data.content
          });
          p++;
          that.setData({
            hidden: true
          });
        },
      })
      console.log("上拉")
      var that = this
      var p = 1
      that.setData({
        hidden: false,
         orderlist: []
      });
      wx.request({
        url: geturl(notice),
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
    wx.request({
      url: geturl(message),
      data: {
        pageNo: p
      },
      method: 'POST',
      dataType: "json",
      header: {
        'content-type': 'application/x-www-form-urlencode' // 默认值
      },
      success: function (res) {
        console.log(res)
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
    // 在页面加载时候渲染页面
    // wx.request({
    //   url: geturl(message),
    //   method: 'POST',
    //   dataType: "json",
    //   header: {
    //     'content-type': 'application/x-www-form-urlencode' // 默认值
    //   },
    //   success: function (res) {
    //     // success

    //     var content = res.data.data.content
    //     that.setData({
    //       orderlist: content
    //     })   
    //   },
    // })

  },

  //进入操作页面
  operate: function () {
    var that = this
    var orderlist = that.data.orderlist
    for (var i = 0; i < orderlist.length; i++) {
      var details = orderlist[i].details
      if (details.search('您的工业设计') != -1) {
        app.appData.requireNo = orderlist[i].bizNo
        setTimeout(function () {
          wx.showToast({
            title: '正在加载',
            icon: 'loading',
            duration: 2000
          })
          wx.navigateTo({
            url: '../../industry/industry_design/industry_design',
          })
        }, 1000)
        return false
      } else if (details.search('您的实物扫描') != -1) {
        app.appData.requireNo = orderlist[i].bizNo
        setTimeout(function () {
          wx.navigateTo({
            url: '../../entity/entity_notarize/entity_notarize',
          })
        }, 1000)
        return false
      } else if (details.search('您的人像扫描') != -1) {
        app.appData.requireNo = orderlist[i].bizNo
        setTimeout(function () {
          wx.navigateTo({
            url: '../../personscan/personscan_notarize/personscan_notarize',
          })
        }, 1000)
        return false
      } else if (details.search('您的照片建模') != -1) {
        app.appData.requireNo = orderlist[i].bizNo
        setTimeout(function () {
          wx.navigateTo({
            url: '../../photo/photo_modeling/photo_modeling',
          })
        }, 1000)
        return false
      } else if (details.search('您的3D打印') != -1) {
        app.appData.requireNo = orderlist[i].bizNo
        setTimeout(function () {
          wx.navigateTo({
            url: '../../print/print_notarize/print_notarize',
          })
        }, 1000)
        return false
      } else if (details.search('您的模具制造') != -1) {
        app.appData.requireNo = orderlist[i].bizNo
        setTimeout(function () {
          wx.navigateTo({
            url: '../../moulds_choice/moulds_notarize/moulds_notarize',
          })
        }, 1000)
        return false
      }
    }
  },
  // 删除订单
  delnotice: function (e) {
    wx.showToast({
      title: '正在删除...',
      icon: 'loading',
      duration: 1500
    })
    var that = this
    var index = e.currentTarget.dataset.id //获取下标
    console.log(index)
    wx.request({
      url: geturl(delnotice),
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      data: {
        id: index
      },
      success: function (res) {
        if (res.data.status == 200) {
          wx.request({
            url: geturl(message),
            method: 'POST',
            dataType: "json",
            header: {
              'content-type': 'application/x-www-form-urlencode' // 默认值
            },
            success: function (res) {
              // success
              console.log(res)
              var content = res.data.data.content
              that.setData({
                orderlist: content
              })
            },
          })
        }
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  //查看公告详情
  godetail: function (e) {
    var that = this
    var index = e.currentTarget.dataset.id //获取下标
    wx.navigateTo({
      url: '../detail/detail?index=' + index,
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
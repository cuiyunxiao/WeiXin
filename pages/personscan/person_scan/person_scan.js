const util = require('../../../utils/config.js');
const geturl = require('../../../config.js').geturl;
const initnum = require('../../../config.js').initnum;
const person = require('../../../config.js').person;
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    HeadList: ["实物扫描", "人像扫描", "照片建模", "工业设计", "3D打印", "模具制造",],
    newHeadList: ["实物扫描", "人像扫描", "照片建模", "工业设计", "3D打印", "模具制造",],
    headSelect: 1,
    selectId: 1,
    scroll_xvalue: 0,
    scrollTop: 0,
    flag: true,
    cover: true,
    // input默认是1  
    num: 1,
    requireNo: null,//需求编号
    // 使用data数据对象设置样式名  
    minusStatus: 'disabled',
    disableds: false,
    loginBtnBgBgColors: "#ff9800",
    items: [
      { id: '0', value: '人像全身扫描',  },
      { id: '1', value: '趣味装饰扫描', checked: 'true' },
    ],
    array: ['扫描打印(提供打印成品和扫描)', '扫描（仅扫描）'],
    array1: ['person;print', 'person'],
    objectArray: [
      {
        id: 0,
        name: '扫描打印(提供打印成品和扫描)'
      },
      {
        id: 1,
        name: '扫描（仅扫描）'
      },
    ],

    date: '请选择', //预约时间
   fuwutype:'',//服务类型
   scantype: 'qw'//扫描类型
  },
  preventD() { },
  // 单选按钮
  radioChange: function (e) {
    var id = e.detail.value
    if(id == 0){
      this.setData({
        scantype: 'qs'
      })
    }

    if (id == 1) {
      this.setData({
        scantype: 'qw'
      })
    }
    console.log(this.data.scantype)
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
  // 点击日期组件确定事件 
  binddateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var evalue = e.detail.value;
    var dB = new Date(evalue.replace(/-/g, "/"))
    var d = new Date();
    var str = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    console.log(str)
    if (Date.parse(str) > Date.parse(dB)) {//时间戳对比  
      wx.showModal({
        title: '提示',
        content: '请选择正确时间',
      })
      return false
    }
    else {
      this.setData({
        date: e.detail.value
      })
      return true
    }  
   
  },

  headAction: function (e) {
    var self = this;
    var dataset = e.currentTarget.dataset,
      main_width = self.data.main_width;
    console.log(dataset);
    if (dataset.id == 0) {
      wx.switchTab({
        url: '../../entity/add_entity/add_entity',
        success: function (e) {
          var page = getCurrentPages().pop();
          if (page == undefined || page == null) return;
          page.onLoad();
        }
      }) 
    }
    else if (dataset.id == 2) {
      wx.redirectTo({
        url: '../../photo/modeling_choice/modeling_choice',
      })
    }
    else if (dataset.id == 3) {
      wx.redirectTo({
        url: '../../industry/add_industry/add_industry',
      })
    }
     else if (dataset.id == 4) {
      wx.redirectTo({
        url: '../../print/print_choice/print_choice',
      })
    }
    else if (dataset.id == 5) {
      wx.redirectTo({
        url: '../../moulds_choice/moulds_choice',
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
 
  // 添加picker
  bindPickerChange: function (e) {
   
    this.setData({
      index: e.detail.value,
      fuwutype: this.data.array1[e.detail.value]
    })
   
   
  },
  /* 点击减号 */
  bindMinus: function () {
    var num = this.data.num;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus: function () {
    var that = this
    var num = this.data.num;
    // 不作过多考虑自增1 
    if (num < 5) {
      num++;
    } 
   
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
  
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus,
     
    });
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var that = this
    var num = e.detail.value;
    if (num > 5) {
      
    } else if (num == 0 || num == '') {
      wx.showModal({
        title: '提示',
        content: '请输入正确数量',
      })
      return false
    }
    // 将数值与状态写回  
    this.setData({
      num: num
    });
  },
  // 点击日期组件确定事件 
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

  // 给按钮添加提交事件

  comfig: function () {
    if (app.appData.userinfo == null) {
      wx.showModal({
        title: '提示',
        content: '请先登录',
        success: function (res) {
          wx.redirectTo({
            url: '../../login/login',
          })
        }
      })
      return false
    } else {
      this.setData({ username: app.appData.userinfo.username })
    }
    var require = {};
    var list = [];
    var service = {};
    var that = this;
    var num = this.data.num
    var date = this.data.date
    var fuwutype = this.data.fuwutype
    var scantype = this.data.scantype

    
    service.serviceType = that.data.fuwutype
    service.scanType = that.data.scantype
    list.push(service)
    var require = {
      column1: num,
      requireNo: that.data.requireNo,
      bizCode: 'person',
      bookStime: date,
      perScanReqs:list
    }
    if (num == '' || num == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入正确数量',
      })
      return false
    }else if (date == "请选择") {
      wx.showModal({
        title: '提示',
        content: '请输入预约时间',
      })
      return false
    }else if (fuwutype == "") {
      wx.showModal({
        title: '提示',
        content: '选择服务类型',
      })
      return false
    }
    wx.showToast({
      title: '正在提交...',
      icon: 'loading',
      duration: 1500
    })
    this.setData({
      disableds: !this.data.disabled,
      loginBtnBgBgColors: "#999",
    });
    wx.request({
      url: geturl(person),
      method: 'POST',
      data: JSON.stringify(require),
      header: {
        'content-type': 'application/json;charset=utf-8' // 默认值
      },
      dataType: "json",
      success: function (res) {
   
        if (res.data.status == 200) {
          setTimeout(function () {
            util.showMessage(that, '提交成功！', 2000);
            wx.redirectTo({
              url: '../submit_success/submit_success',
            })
          }, 2000);
        } else {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '提交失败'
          });
        }

      },
      fail: function ({ errMsg }) {
        console.log('request fail', errMsg)
        self.setData({
          loading: false
        })
      }
    })
    app.appData.globaData = { num: this.data.num, date: this.data.date, fuwutype: this.data.fuwutype, scantype: this.data.scantype}
    // console.log(app.appData.globaData)
  },


  /*
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
    var that = this
    wx.request({
      url: geturl(initnum),
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'GET',
      success: function (res) {
        wx.setStorage({
          key: "initnum",
          data: res.data.data
        })
        wx.getStorage({
          key: 'initnum',
          success: function (res) {
            that.setData({
              requireNo: res.data
            })
            app.appData.requireNo = that.data.requireNo 
           
          }
        })

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
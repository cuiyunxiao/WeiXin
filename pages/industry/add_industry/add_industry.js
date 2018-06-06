const geturl = require('../../../config.js').geturl;
const uploadImage = require('../../../config.js').uploadImage;
const initnum = require('../../../config.js').initnum;
const industry = require('../../../config.js').industry;
const util = require('../../../utils/config.js');
var app = getApp()
Page({


  /**
   * 页面的初始数据
   */
  data: {
    HeadList: ["实物扫描", "人像扫描", "照片建模", "工业设计", "3D打印", "模具制造",],
    newHeadList: ["实物扫描", "人像扫描", "照片建模", "工业设计", "3D打印", "模具制造",],
    headSelect: 3,
    selectId: 1,
    scroll_xvalue: 0,
    scrollTop: 0,
    flag: true,
    cover: true,
    loginBtnTxt: "确认上传",
    loginBtnBgBgColor: "#ff9800",
    btnLoading: false,
    disabled: false,
    // input默认是1  
    num: 1,
    // 使用data数据对象设置样式名  
    minusStatus: 'disabled',
    date: '请选择', //预约时间;
    inputname: '',//标题名字
    textcontent: '',//描述内容
    src: '',
    imageList: [],//图片数组
    imagesKey: [],	// 图片key
    requireNo: null,//需求编号
    attach: null,//上传图片返回的信息
    disableds: false,
    loginBtnBgBgColors: "#ff9800",
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
        url: '../../entity/add_entity/add_entity',
      })

    }
    else if (dataset.id == 1) {
      wx.redirectTo({
        url: '../../personscan/person_scan/person_scan',
      })
    }
    else if (dataset.id == 2) {
      wx.redirectTo({
        url: '../../photo/modeling_choice/modeling_choice',
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


  // 给按钮添加提交事件

  submitFun: function () {
    var require = {};
    var arrs = [];
    var req = {};
    var that = this;
    var inputname = this.data.inputname;
    var textcontent = this.data.textcontent;
    var imageList = this.data.imageList;
    var globaData = app.appData.globaData;
    globaData = { inputname: inputname, textcontent: textcontent }
    console.log(globaData)
    console.log(imageList)
    req.description = textcontent
    req.attach = that.data.attach;
    arrs.push(req)
    var require = {
      title: inputname,
      requireNo: that.data.requireNo,
      bizCode: 'industry',
      industryReqs: arrs
    }

    if (inputname == "") {
      wx.showModal({
        title: '提示',
        content: '请输入实物名称',
      })
      return false
    }
    else if (textcontent == "") {
      wx.showModal({
        title: '提示',
        content: '请输入描述信息',
      })
      return false
    } else if (imageList == "") {
      wx.showModal({
        title: '提示',
        content: '请上传照片',
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
      url: geturl(industry),
      method: 'POST',
      data: JSON.stringify(require),
      header: {
        'content-type': 'application/json;charset=utf-8' // 默认值
      },
      dataType: "json",
      success: function (res) {
        if (res.statusCode == 200) {
          setTimeout(function () {
            util.showMessage(that, '提交成功！', 2000);
            console.log(res);
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
  },
  Confirmupload: function () {
    var that = this;
    var successUp = 0; //成功个数
    var failUp = 0; //失败个数
    var length = that.data.imageList.length; //总共个数
    var i = 0; //第几个
    if (length == 0) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请选择照片'
      });
      return false
    } else {
      this.setLoginData1();
      setTimeout(function () {
    
      }, 2000);
      that.uploadDIY(that.data.imageList, successUp, failUp, i, length);
    }

  },
  // 添加图片
  chooseImage: function () {
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
    var that = this
    that.data.imagesKey = [];
    wx.chooseImage({
      count: 20 - that.data.imageList.length,
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: (res) => {
        that.setData({
          imageList: that.data.imageList.concat(res.tempFilePaths)
        })
        var successUp = 0; //成功个数
        var failUp = 0; //失败个数
        var length = that.data.imageList.length; //总共个数
        var i = 0; //第几个

      }
    })
  },
  // 删除图片
  delImage: function (e) {
    var that = this;
    that.removeByValue(that.data.imageList, e.target.dataset.src)
    that.setData({
      imageList: that.data.imageList
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },
  // 上传
  uploadDIY(filePaths, successUp, failUp, i, length) {
    var that = this;
    wx.uploadFile({
      url: geturl(uploadImage),
      filePath: filePaths[i],
      name: 'file',
      header: { "Content-Type": "multipart/form-data" },
      formData: {
        'requireNo': encodeURI(that.data.requireNo),
        'bizCode': encodeURI('industry'),
        'zpSumNum': encodeURI(length),
      },
      success: (res) => {
        var dataObj = JSON.parse(res.data).data;
        that.setData({
          attach: dataObj
        })
        console.log(that.data.attach)
        successUp++;
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 1500
        });
     

      },
      fail: (res) => {
        console.log(res.errMsg)
        failUp++;
  
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '上传失败'
        });
        return false
      },
      complete: () => {
        i++;
        if (i == length) {
          wx.showToast({
            title: '共' + successUp + '张上传成功,' + failUp + '张上传失败！',
            icon: 'success',
            duration: 2000
          });
          that.setLoginData2();
        } else {  //递归调用uploadDIY函数
          setTimeout(function () {
            that.uploadDIY(filePaths, successUp, failUp, i, length);
          }, 2000);
        }
      },
    });
  },
  removeByValue: function (arr, val) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == val) {
        arr.splice(i, 1);
        break;
      }
    }
  },
  removeDuplicatedItem: function (ar) {
    var ret = [];
    ar.forEach(function (e, i, ar) {
      if (ar.indexOf(e) === i) {
        ret.push(e);
      }
    });
    return ret;
  },
  /*
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    

    this.setData({
      headSelect: 3,
    })

  },
  setLoginData1: function () {
    this.setData({
      loginBtnTxt: "上传中",
      disabled: !this.data.disabled,
      loginBtnBgBgColor: "#999",
      btnLoading: !this.data.btnLoading
    });
  },
  setLoginData2: function () {
    this.setData({
      loginBtnTxt: "确认上传",
      disabled: !this.data.disabled,
      loginBtnBgBgColor: "#ff9800",
      btnLoading: !this.data.btnLoading
    });
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
            console.log(that.data.requireNo)
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

const util = require('../../../utils/config.js');
const geturl = require('../../../config.js').geturl;
const uploadImage = require('../../../config.js').uploadImage;
const initnum = require('../../../config.js').initnum;
const submit = require('../../../config.js').submit;
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    HeadList: ["实物扫描", "人像扫描", "照片建模", "工业设计", "3D打印", "模具制造",],
    newHeadList: ["实物扫描", "人像扫描", "照片建模", "工业设计", "3D打印", "模具制造",],
    headSelect: 0,
    selectId: 1,
    scroll_xvalue: 0,
    show: 0,
    scrollTop: 0,
    flag: true,
    cover: true,
    loginBtnTxt: "确认上传",
    loginBtnBgBgColor: "#ff9800",
    btnLoading: false,
    disabled: false,
    disableds: false,
    loginBtnBgBgColors: "#ff9800",
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
  attachArr:[],//将返回的照片信息转为数组
  obj:{}//选择的照片转为对象
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
  preventD: function () {
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
        newHeadList: ["实物扫描", "人像扫描", "照片建模", "工业设计", "3D打印", "模具制造",],
        show: 0
      })
    } else {
      this.setData({
        newHeadList: ["全部"],
        show: 1
      })
    }
  },
  headAction: function (e) {
    var self = this;
    var dataset = e.currentTarget.dataset,
      main_width = self.data.main_width;

    if (dataset.id == 1) {
      wx.redirectTo({
        url: '../../personscan/person_scan/person_scan',
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

    self.setData({
      scroll_xvalue: parseInt(dataset.id) * main_width,   //设置距离左边的位置
      headSelect: dataset.id,
      selectId: choseID,
      page: 1
    });

  },

  // 点击日期组件确定事件 
  bindDateChange: function (e) {
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
    }else{
      this.setData({
        date: e.detail.value
      })
      return true
    }  
  },

  // 按钮样式
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

  // 给按钮添加提交事件
  submitFun: function () {
    var require = {};
    var list = [];
    var temp = {};
    var that = this;
    if (that.data.attach == null) {
      wx.showModal({
        title: '提示',
        content: '请先确认上传图片',
      })
      return false
    }
    var date = that.data.date;
    var inputname = that.data.inputname;
    var textcontent = that.data.textcontent;
    var imagesKey = that.data.imagesKey;
    var imageList = that.data.imageList;
    var requireNo = that.data.requireNo;
    var attach = that.data.attach;
    temp.attach = that.data.attach;
    temp.note = textcontent;
    temp.scanWay = "default";
    temp.address = "广州光机电技术研究院";
    temp.qty = 1;
    list.push(temp)
    var require = {
      title: inputname,
      requireNo: that.data.requireNo,
      bizCode: 'entity',
      bookStime: date,
      entityReqs: list
    }
    if (date == "请选择") {
      wx.showModal({
        title: '提示',
        content: '请完善预约时间',
      })
      return false
    }
    else if (inputname == "") {
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
    if (requireNo == null) {
      wx.showModal({
        title: '失败',
        content: '请选择图片',
      })
    } else {
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
        url: geturl(submit),
        method: 'POST',
        data: JSON.stringify(require),
        header: {
          'content-type': 'application/json;charset=utf-8' // 默认值
        },
        dataType: "json",
        success: function (res) {
          console.log(res);
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
          that.setData({
            loading: false
          })
        }
      })
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
      count: 30 - that.data.imageList.length,
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: (res) => {
        // var imageListobj = 
        console.log(that.data.imageList.concat(res))
        that.setData({
          imageList: that.data.imageList.concat(res.tempFilePaths),
          attachArr:[]
        })
        var arr = that.data.imageList;
        var obj = {}
        for(var key in arr){
          obj[key] = arr[key]
        }
        that.setData({
         obj:obj
        })
        console.log(that.data.obj)
        var successUp = 0; //成功个数
        var failUp = 0; //失败个数
        var length = that.data.imageList.length; //总共个数
        var i = 0; //第几个   
    
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
        'bizCode': encodeURI('entity'),
        'zpSumNum': encodeURI(length),
      },
      success: (res) => {
        console.log(res)
        var dataObj = JSON.parse(res.data).data;
       
        var attachArr = [];
        for (var item in dataObj){
          attachArr.push(dataObj[item]);
        }
        console.log(attachArr)
        that.setData({
          attach: dataObj, 
          attachArr: [],
          attachArr: attachArr,
        })
  
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

          }
        })

      }
    })


    this.setData({
      headSelect: 0,
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
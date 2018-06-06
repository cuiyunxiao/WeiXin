var util = require("../../../utils/util.js");
const personal = require('../../../config.js').personal;
const geturl = require('../../../config.js').geturl;
const edit = require('../../../config.js').edit;
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    accountType: '',
    registBtnTxt: "保存设置",
    registBtnBgBgColor: "#ff9800",
    array1: ['机械设计', '加工制造', '创意设计', '其他'],
    objectArray: [
      {
        id: 0,
        name: '机械设计'
      },
      {
        id: 1,
        name: '加工制造'
      },
      {
        id: 2,
        name: '创意设计'
      },
      {
        id: 3,
        name: '其他'
      },
    ],
    index1: 0,

    array2: ['3D扫描', '工业设计', '3D打印', '模具设计', '一体化设计制造服务'],
    objectArray: [
      {
        id: 0,
        name: '3D扫描'
      },
      {
        id: 1,
        name: '工业设计'
      },
      {
        id: 1,
        name: '3D打印'
      },
      {
        id: 1,
        name: '模具设计'
      },
      {
        id: 1,
        name: '一体化设计制造服务'
      },


    ],
    index2: 0,
    inputUserName: '',
    email: '',
    username: '',
    phone: '',
    avatarUrl: "../../../images/timg.jpg",
    nickName:'',//昵称
    trueName:'',//姓名公司名
    email:'',//邮箱
    lingo:'机械设计',//行业
    attention:'3D扫描',//关注
  },
// 设置昵称
setnickName:function(e){
  var value = e.detail.value;
    this.setData({
      nickName:value
    })
},
// 设置姓名公司名
settrueName: function (e) {
  var value = e.detail.value;
  this.setData({
   trueName: value
  })
  console.log(this.data.trueName)
},
// 设置邮箱
emailInput: function (e) {
  // console.log(e)
  this.setData({
    email: e.detail.value
  })
  console.log(this.data.email)
},
// 设置行业
bindPickerChange1: function (e) {
  console.log('picker发送选择改变，携带值为', e.detail.value)
  var array1 = this.data.array1
  this.setData({
    index1: e.detail.value,
    lingo: array1[e.detail.value]
  })
},
// 设置关注
bindPickerChange2: function (e) {
  console.log('picker发送选择改变，携带值为', e.detail.value)
  var array2= this.data.array2
  this.setData({
    index2: e.detail.value,
    attention: array2[e.detail.value]
  })
},

  onLoad: function (options) {
    var that = this;
    wx.request({
      url: geturl(personal),
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data)
        if (res.data.status == 200) {
          that.setData({
            username: res.data.data.accountName,
            phone: res.data.data.tel,
            accountType: res.data.data.accountType,
          })
        }
      }
    })
  },


  // checkUserEmail: function (e) {
  //   // console.log(e)
  //   var param = e.detail.value;
  //   var email = util.regexConfig().email;
  //   var inputUseremail = param.trim();
  //   if (email.test(inputUseremail)) {
  //     return true;
  //   } else {
  //     wx.showModal({
  //       title: '提示',
  //       showCancel: false,
  //       content: '请输入正确的邮箱'
  //     });
  //     return false;
  //   }
  // },
  // 跳转到修改手机号码页面

  changeNum: function () {
    wx.navigateTo({
      url: '../../alternum/alternum',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  // 添加picker
  // bindPickerChange: function (e) {
  //   console.log('picker发送选择改变，携带值为', e.detail.value)
  //   this.setData({
  //     index: e.detail.value
  //   })
  // },
 
  setregistData1: function () {
    this.setData({
      registBtnTxt: "保存中",
      registDisabled: !this.data.registDisabled,
      registBtnBgBgColor: "#999",
      btnLoading: !this.data.btnLoading
    });
  },
  setregistData2: function () {
    this.setData({
      registBtnTxt: "保存修改",
      registDisabled: !this.data.registDisabled,
      registBtnBgBgColor: "#ff9800",
      btnLoading: !this.data.btnLoading
    });
  },
  // 添加保存点击事件
  saveform: function () {
    var email = util.regexConfig().email;
    var inputUseremail = this.data.email.trim();
    var that = this;
    var nickName = that.data.nickName;
    var trueName = that.data.trueName;
    var email = that.data.email;
    var lingo = that.data.lingo;
    var attention = that.data.attention;
    var Account = {};
    var Account = {
      nickName: nickName,
      trueName: trueName,
      email: email,
      lingo: lingo,
      attention: attention,
    }
    console.log(Account)
      wx.request({
        url: geturl(edit),
        data: Account,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },// 设置请求的 header
        success: function (res) {
          console.log(res)
          if (res.data.status == 200) {
            // console.log(res.data)
            setTimeout(function () {
              wx.showModal({
                title: '提示',
                showCancel: true,
                content: res.data.data,
              });
            }, 2000);
            setTimeout(function () {
              that.setregistData2();
              wx.switchTab({
                url: '../../personal_center/personal_center'
              })

            }, 3000);
            return true
          } else {
            console.log(res.data)
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: 修改失败,
            });
            that.setregistData2();
            return false;
          }
        },

      })

      return true;
    
  },

  /**
   * 生命周期函数--监听页面加载
   */

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
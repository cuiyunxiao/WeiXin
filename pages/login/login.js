
const loginUrl = require('../../config.js').loginUrl;
var util = require("../../utils/util.js");
var app = getApp();
Page({
  data: {
    loginBtnTxt: "登录",
    loginBtnBgBgColor: "#ff9800",
    btnLoading: false,
    disabled: false,
    inputUserName: '',
    inputPassword: '',
    uerName:'',
    avatarUrl: "../../images/timg.jpg",
  },

  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  
  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    // 页面显示

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  formSubmit: function (e) {
    var param = e.detail.value;
    this.mysubmit(param);

  },
  mysubmit: function (param) {
    var flag = this.checkPassword(param)
    if (flag) {
      this.setLoginData1();
      this.checkUserInfo(param);
      // console.log(param);
      // console.log(param.username);
      app.appData.userinfo = { username: param.username, password: param.password};
    }
  },
  setLoginData1: function () {
    this.setData({
      loginBtnTxt: "登录中",
      disabled: !this.data.disabled,
      loginBtnBgBgColor: "#999",
      btnLoading: !this.data.btnLoading
    });
  },
  setLoginData2: function () {
    this.setData({
      loginBtnTxt: "登录",
      disabled: !this.data.disabled,
      loginBtnBgBgColor: "#ff9800",
      btnLoading: !this.data.btnLoading
    });
  },

  checkPassword: function (param) {
    var userName = param.username.trim();
    var password = param.password.trim();
    if (password.length <= 0) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入密码'
      });
      return false;
    } else {
      return true;
    }
  },
  checkUserInfo: function (param) {
    var username = param.username
    var password = param.password
    var that = this; 
    // console.log(param)
    if ((username !== '' || username !== '') && password !== '') {
      wx.request({
        url: loginUrl,
        data: {
          inputName: username,
          pwd: password,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        method: 'POST',
        success: function (res) {
          if (res.data.status == 200){
            app.appData.sessionid == null;
            app.appData.sessionid = res.data.data;        
          setTimeout(function () {
            // console.log(app.appData.sessionid)
            // console.log(res.data)   
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 1500
            });
            that.setLoginData2();
            wx.switchTab({
              url: '../index/index',
            })
          }, 2000);
          }else{
            setTimeout(function () {
              // console.log(res.data)
              wx.showModal({
                title: '提示',
                showCancel: false,
                content: res.data.msg
              });
              that.setLoginData2();
            
            }, 2000);
          }
        },fail:function(){
          that.setLoginData2();
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '用户名或密码有误，请重新输入'
          });
        }
      })
     
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '用户名或密码有误，请重新输入'
      });
      this.setLoginData2();
    }
  },


})
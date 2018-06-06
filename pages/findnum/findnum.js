var util = require("../../utils/util.js");
const sendMsgCode = require('../../config.js').sendMsgCode;
const vrifyTel = require('../../config.js').vrifyTel;
const reset = require('../../config.js').reset;
Page({
  data: {
    registBtnTxt: "提交",
    registBtnBgBgColor: "#ff9800",
    getSmsCodeBtnTxt: "获取验证码",
    getSmsCodeBtnColor: "#0099FF",
    btnLoading: false,
    registDisabled: false,
    smsCodeDisabled: false,
    telphone: '',
    SmsCode: '',//验证码
    Password: '',//密码
    codeToken: '',//cookie值
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
// 设置手机号
  setPhoneNum: function (e) {
    var value = e.detail.value;
    this.setData({
      telphone: value
    });
  },
  // 设置验证码
  setSmsCode: function (e) {
    var value = e.detail.value;
    this.setData({
      SmsCode: value
    });
  },
  // 设置密码
  setPassword: function (e) {
    var value = e.detail.value;
    this.setData({
      Password: value
    });
  },
  formSubmit: function (e) {
    var Password = this.data.Password
    var regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
    if (!regExp.test(Password)){
      wx.showModal({
        title: '提示',
        content: '密码由6~20位字母（区分大小写）与数字组合构成', 
      })
      return false
    }
    var param = e.detail.value;
    this.mysubmit(param);
  },
  mysubmit: function (param) {
    var num = param.username.trim();
    var flag = this.checkPassword(param)
    var that = this;
    var tel = that.data.telphone;
    var inputCode = that.data.SmsCode;
    var password = that.data.Password;
    var codeToken = that.data.codeToken;
    console.log(password)
    console.log(inputCode)
    var data1 = { codeToken, tel, inputCode, password }
    if (flag) {
      this.setregistData1();
      wx.request({
        url: reset,
        data: {
          tel: tel,
          inputCode: inputCode,
          password: password,
          codeToken: codeToken,
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },// 设置请求的 header
        success: function (res) {
          console.log(res)
          if (res.data.status == 200) {
            setTimeout(function () {
              wx.showToast({
                title: '修改成功',
                showCancel: true,
                content: '成功',
              });

            }, 2000);
            setTimeout(function () {
              that.setregistData2();
              wx.redirectTo({
                url: '../login/login'
              })

            }, 3000);
            return true
          } else {
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: res.data.msg,
            });
            that.setregistData2();
            return false;
          }
        },

      })
    }
  },
  setregistData1: function () {
    this.setData({
      registBtnTxt: "提交中",
      registDisabled: !this.data.registDisabled,
      registBtnBgBgColor: "#999",
      btnLoading: !this.data.btnLoading
    });
  },
  setregistData2: function () {
    this.setData({
      registBtnTxt: "提交",
      registDisabled: !this.data.registDisabled,
      registBtnBgBgColor: "#ff9800",
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
        content: '请设置新密码'
      });
      return false;
    } else if (password.length < 6 || password.length > 20) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '密码长度为6-20位字符'
      });
      return false;
    } else {
      return true;
    }
  },
  getSmsCode: function (param) {
    var phone = util.regexConfig().phone;
    var $this = this;
    var mobile = $this.data.telphone;
    console.log(mobile)
    var that = this;
    var count = 60;
    var phone = util.regexConfig().phone;
    var inputUserName = mobile.trim();
    if (phone.test(inputUserName)) {
      // 先判断下号码是否已经注册
      wx.request({
        url: vrifyTel,
        data: { tel: mobile },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },// 设置请求的 header
        success: function (res) {
          console.log(res)
          if (res.data.msg == '此手机已注册过，直接登录？') {
            var si = setInterval(function () {
              if (count > 0) {
                count--;
                that.setData({
                  getSmsCodeBtnTxt: '重新发送' + count + ' s',
                  getSmsCodeBtnColor: "#999",
                  smsCodeDisabled: true
                });
              } else {
                that.setData({
                  getSmsCodeBtnTxt: "获取验证码",
                  getSmsCodeBtnColor: "#ff9900",
                  smsCodeDisabled: false
                });
                count = 60;
                clearInterval(si);
              }
            }, 1000);
            // 号码存在获取验证码
            wx.request({
              url: sendMsgCode,
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              data: {
                tel: mobile
              },
              method: 'POST',
              success: function (res) {
                console.log(res)
                if (res.data.status == 200) {
                  wx.showModal({
                    title: '提示',
                    showCancel: false,
                    content: "验证码已发送请注意查收"
                  });
                  wx.setStorageSync("sessionid", res.header["Set-Cookie"]);
                  var sessionid = wx.getStorageSync("sessionid")
                  console.log(wx.getStorageSync("sessionid"))
                  if (sessionid.search('REDIS_VRIFYCODE_SESSION_KEY') != -1) {
                    var value1 = sessionid.match(/=(\S*);/)[1];
                    that.setData({
                      codeToken: value1
                    })
                    console.log(that.data.codeToken)
                  }
                  // util.regesCookie(res)
                }
              }
            })
            return true
          } else if (res.data.status == 200) {
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '该号码尚未注册',
            });
            that.setData({
              getSmsCodeBtnTxt: "获取验证码",
              getSmsCodeBtnColor: "#ff9900",
              smsCodeDisabled: false
            });
            return false;
          }
        },
        fail: function () {
        },
      })
      return true;
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入正确的手机号码'
      });
      return false;
    }
   
  },

  redirectTo: function (param) {
    wx.redirectTo({
      url: '../login/login'
    })
  }

})
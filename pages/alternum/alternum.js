var util = require("../../utils/util.js");
const sendMsgCode = require('../../config.js').sendMsgCode;
const vrifyTel = require('../../config.js').vrifyTel;
const Newphone = require('../../config.js').Newphone;
const geturl = require('../../config.js').geturl;
Page({
  data: {
    registBtnTxt: "确认修改",
    registBtnBgBgColor: "#ff9800",
    getSmsCodeBtnTxt: "获取验证码",
    getSmsCodeBtnColor: "#0099FF",
    btnLoading: false,
    registDisabled: false,
    smsCodeDisabled: false,
    telphone: '',
    SmsCode: '',//验证码
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

  // 获取手机号码
  setTelPhone: function setTelPhone(e) {
    var val = e.detail.value;
    this.setData({
      telphone: val
    });
  },
  // 设置验证码
  setSmsCode: function (e) {
    var value = e.detail.value;
    this.setData({
      SmsCode: value
    });
  },
  formSubmit: function (e) {
    var param = e.detail.value;
    this.mysubmit(param);

  },
  mysubmit: function (param) {
    var num = param.username.trim();
    console.log(num)
    var that = this;
    var newTel = that.data.telphone;
    var inputCode = that.data.SmsCode;
    var codeToken = that.data.codeToken;
    console.log(inputCode)
    this.setregistData1();
    // console.log(geturl(Newphone))
    wx.request({
      url: geturl(Newphone),
      data: {
        newTel: newTel,
        inputCode: inputCode,
        codeToken: codeToken,
      },
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
              content:res.data.data,
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
          console.log(res.data)
          wx.showModal({
            title: '提示',
            showCancel: false,
            content:修改失败,
          });
          that.setregistData2();
          return false;
        }
      },

    })
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
  // 获取验证吗
  getSmsCode: function (param) {
    var phone = util.regexConfig().phone;
    var $this = this;
    var mobile = $this.data.telphone;
    console.log(mobile)
    var phoneNum = param.username
    // console.log(param)
    var that = this;
    var count = 60;
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
          if (res.data.msg == '此手机已注册过，直接登录？'){
              //号码存在不可以获取验证码
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '请输入新手机号码'
            });
            return false;
          } else if (res.data.status == 200){
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
                // console.log(res)
                if (res.data.status == 200) {
                  wx.showModal({
                    title: '提示',
                    showCancel: false,
                    content: '验证码已发送请注意查收'
                  });
                  wx.setStorageSync("sessionid", res.header["Set-Cookie"]);
                  var sessionid = wx.getStorageSync("sessionid")
                  // console.log(wx.getStorageSync("sessionid"))
                  if (sessionid.search('REDIS_VRIFYCODE_SESSION_KEY') != -1) {
                    var value1 = sessionid.match(/=(\S*);/)[1];
                    that.setData({
                      codeToken: value1
                    })
                    // console.log(that.data.codeToken)
                  }
                  // util.regesCookie(res)
                }
              }
            })
            return true
          }

        }
      })
    } else {
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

    }

  },

  redirectTo: function (param) {
    wx.redirectTo({
      url: '../login/login'
    })
  }

})
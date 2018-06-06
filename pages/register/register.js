var util = require("../../utils/util.js");
const sendMsgCode = require('../../config.js').sendMsgCode;
const vrifyName = require('../../config.js').vrifyName;
const vrifyTel = require('../../config.js').vrifyTel;
const register = require('../../config.js').register;
Page({
  data: {
    registBtnTxt: "注册",
    registBtnBgBgColor: "#ff9800",
    getSmsCodeBtnTxt: "获取验证码",
    getSmsCodeBtnColor: "#0099FF",
    btnLoading: false,
    registDisabled: false,
    smsCodeDisabled: false,
    telphone: '',
    SmsCode: '',//验证码
    setname: '',//用户名
    Password: '',//密码
    accountType: '',//用户类型
    codeToken: '',//cookie值
    checkboxItems: [
      { name: '企业', value: '企业', },
      { name: '个人', value: '个人', },
      { name: '', value: '', checked: 'true' },
    ]

  },
  /**
 * 监听checkbox事件
 */
  checkboxChange: function (e) {
    var checked = e.detail.value
    var changed = {}
    for (var i = 0; i < this.data.checkboxItems.length; i++) {
      if (checked.indexOf(this.data.checkboxItems[i].name) == 1) {
        changed['checkboxItems[' + i + '].checked'] = true;
        var accountType = this.data.checkboxItems[i].name
        this.setData({
          accountType: accountType
        })
        console.log(this.data.accountType)
      } else {
        changed['checkboxItems[' + i + '].checked'] = false
      }

      if (checked.length == 0) {
        wx.redirectTo({
          url: 'register',
        })
        setTimeout(function () {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '请至少选择一项'
          })

        }, 30);
      }

    }

    this.setData(changed)
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
  // getPhoneNum: function (e) {
  //   var value = e.detail.value;
  //   this.setData({
  //     phoneNum: value
  //   });
  // },
  formSubmit: function (e) {
    var Password = this.data.Password
    var regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
    if (!regExp.test(Password)) {
      wx.showModal({
        title: '提示',
        content: '密码由6~20位字母（区分大小写）与数字组合构成',
      })
      return false
    }
    var param = e.detail.value;
    this.mysubmit(param);

  },
  // 提交注册信息
  mysubmit: function (param) {
    var that = this;
    var value = param.uservalue.trim();
    // var num = param.username.trim();
    var that = this;
    var accountType = that.data.accountType;
    var accountName = that.data.setname;
    var tel = that.data.telphone;
    var inputCode = that.data.SmsCode;
    var password = that.data.Password;
    var codeToken = that.data.codeToken;
    var data1 = { accountType, accountName, tel, inputCode, password }
    console.log(data1)
    // console.log(num)
    var flag = this.checkUserValue(value)
      && this.checkUserName(param)
      && this.checkPassword(param)
      && this.checkpasswordcheck(param)
    if (flag) {
      this.setregistData1();
      wx.request({
        url: register,
        data: {
          accountType: accountType,
          accountName: accountName,
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
              wx.showModal({
                title: '注册成功',
                showCancel: true,
                content: res.data.msg,
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
        fail: function () {
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
  //验证手机号码
  checkUserName: function (param) {
    //调用util中手机号码的正则校验
    var phone = util.regexConfig().phone;
    var inputUserName = param.username.trim();
    if (phone.test(inputUserName)) {
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
  // 设置用户名
  setname: function setname(e) {
    var val = e.detail.value;
    this.setData({
      setname: val
    });

  },

  // 校验用户名
  checkUserValue: function (value) {
    var that = this;
    var setname = that.data.setname;
    console.log(setname)
    // 判断名字是否存在
    wx.request({
      url: vrifyName,
      data: { accountName: setname },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },// 设置请求的 header
      success: function (res) {
        if (res.data.status == 200) {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: res.data.msg,
          });
          return true
        } else {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: res.data.msg,
          });
          return false;
        }
      },
      fail: function () {
      },
    })

    //调用util中用户名的正则校验
    var name = util.regexConfig().name;
    console.log(name)
    console.log(value)
    console.log(name.test(value))
    if (name.test(value)) {
      return true;
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '用户名不正确'
      });
      return false;
    }

  },

  // 验证两次密码是否一致
  checkpasswordcheck: function (param) {

    var passwordcheck = param.passwordcheck.trim();
    var password = param.password.trim();
    if (passwordcheck !== password) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '两次密码不一致'
      });
      return false;
    } else {
      return true
    }
  },
  // 设置密码
  setPassword: function (e) {
    var setPassword = e.detail.value;
    this.setData({
      Password: setPassword
    })
  },

  // 检查密码
  checkPassword: function (param) {
    var userName = param.username.trim();
    var password = param.password.trim();
    console.log(password)
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
  // 设置手机号
  setTelPhone: function setTelPhone(e) {
    var val = e.detail.value;
    this.setData({
      telphone: val
    });
  },
  setSmsCode: function setSmsCode(e) {
    var val = e.detail.value;
    this.setData({
      SmsCode: val
    });
    console.log(this.data.SmsCode)
  },
  // // 获取验证吗
  getSmsCode: function (param) {
    var phone = util.regexConfig().phone;
    var $this = this;
    var mobile = $this.data.telphone;
    console.log(mobile)
    var that = this;
    var count = 60;
    // 在这里要获取一下服务器中的手机号判断是否存在
    wx.request({
      url: vrifyTel,
      data: { tel: mobile },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },// 设置请求的 header
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: res.data.msg,
          });
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
              console.log(res)
              if (res.data.status == 200) {
                wx.showModal({
                  title: '提示',
                  showCancel: false,
                  content: res.data.msg
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
        } else {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: res.data.msg,
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

  },
  redirectTo: function (param) {
    wx.redirectTo({
      url: '../login/login'
    })
  }

})
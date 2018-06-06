const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}
// 验证邮箱以及手机的正则
function regexConfig() {
  var reg = {
    email: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
    phone: /^1(3|4|5|7|8)\d{9}$/,
    name: /^[\u4E00-\u9FA5A-Za-z0-9_]+$/
  }
  return reg;
}
// 设置cookie
// function regesCookie(res){
//   var that = this
//   wx.setStorageSync("sessionid", res.header["Set-Cookie"]);
//   var sessionid = wx.getStorageSync("sessionid")
//   console.log(wx.getStorageSync("sessionid"))
//   if (sessionid.search('REDIS_VRIFYCODE_SESSION_KEY') != -1) {
//     var value1 = sessionid.match(/=(\S*);/)[1];
//     that.setData({
//       codeToken: value1
//     })
//     console.log(that.data.codeToken)
//   }
// }
module.exports = {
  formatTime: formatTime,
  regexConfig: regexConfig,
  // regesCookie: regesCookie
}

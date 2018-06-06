//app.js
App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  // 添加初始登陆数据

appData:{
  userinfo:null,
  globaData:null,
  globainvoice:null,
  sessionid:null,
  requireNo:null,
  orderNo:null,
  invoice: { invoiceTitle: '', invoiceway: '', personname:''},
  flag:null,
  orderNo:null,
  remarkMsg:null,
  orderdets:[],//需求详情
  articleNo:null,//发现详情编号
  address:null,//选择的地址,
  chooseflag:0 //是否选择新地址
},



  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})

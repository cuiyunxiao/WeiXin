Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: [
      { name: '3D打印', id: 'photo' },
    ],
    current: 0,
    isScroll: false,
    toView: 'quanbu',
    orderlist: [],
    demandurl: '../../print/print_choice/print_choice',
    orderNo: null,
    tel: null
  },

  // 添加点击事件
  btnClick: function () {
    wx.navigateTo({
      url: '../../order/myorder/myorder',
    })
  },
  btnClick1: function () {
    wx.navigateTo({
      url: '../modeling_choice/modeling_choice',
    })

  },
  btnClick2: function () {
    wx.navigateTo({
      url: this.data.demandurl,
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderNo: options.orderNo,
      tel: options.tel,
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
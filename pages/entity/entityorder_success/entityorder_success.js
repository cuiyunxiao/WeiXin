Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: [
      { name: '工业设计', id: 'instrudy' },
      { name: '3D打印', id: 'print' },
    ],
    current: 0,
    isScroll: false,
    toView: 'quanbu',
    orderlist: [],
    demandurl:'../../industry/add_industry/add_industry',
    orderNo:null,
    tel:null
  },

  // 添加点击事件
  switchTab(e) {
    this.setData({
      toView: e.target.dataset.id,
      current: e.target.dataset.index
    })
    console.log(this.data.current)
    if (this.data.current == 0){
      this.setData({
        demandurl: '../../industry/add_industry/add_industry'
      })
    }
    if (this.data.current == 1) {
      this.setData({
        demandurl: '../../print/print_choice/print_choice'
      })
    }

  },
  btnClick:function(){
    wx.navigateTo({
      url: '../../order/myorder/myorder',
    })
  },
  btnClick1:function(){
    wx.switchTab({
      url: '../add_entity/add_entity',
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
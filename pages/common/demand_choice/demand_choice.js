
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isScroll: true,
    flag: true,
    cover: true,
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
        isScroll: false
      })

    } else {
      this.setData({
        newHeadList: ["全部"],

      })
    }
  },
  
  //  * 生命周期函数--监听页面加载
  //  */
  onLoad: function (options) {
    // 在页面加载时候渲染页面
  

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
// pages/additem/additem.js
var db = wx.cloud.database()
const goodsList = db.collection("goodslist")
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:'',
    show1: false,
    show2: false,
    list: ["书籍","女装","大片"],
    price: [10,20,30,40,50,60,70,80,90,100,110,120,130,140,150],
    imgUrl: '',
    text: '',
    money: '',
    tag:'',
    title: '',
    introduction: ''
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.setData({show1:false, show2:false})
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

  },

  onInput1(event){
    console.log(event.detail)
    var that = this
    this.data.title = event.detail
  },

  onInput2(event) {
    console.log(event.detail)
    var that = this
    this.data.introduction = event.detail
  },

  //切条，勿看，从这里开始
  ex1:function(){
    this.setData({show1: true});
  },

  ex2: function () {
    this.setData({ show2: true });
  },
  //标签
  onConfirm1(event) {
    var that = this
    const { picker, value, index } = event.detail
    console.log(event.detail.value)
    that.data.tag = event.detail.value

    this.setData({ show1: false });
  },

  onCancel1() {
    this.setData({ show1: false });
  },

  onConfirm2(event) {
    var that = this
    const { picker, value, index } = event.detail
    that.data.money = event.detail.value
    console.log(event.detail.value)
    this.setData({ show2: false });
  },

  onCancel2() {
    this.setData({ show2: false });
  },
  //结束
  //上传图片
  addImg:function(event){
    var that = this
    var count = Math.random() * 10000
    wx.chooseImage({ 
      sizeType: ["compressed"],
      sourceType: ["album", "camera"],
      success: function(res) {
        wx.showLoading({
          title: '上传中',
        })
        const filePath = res.tempFilePaths[0];
        that.setData({
          imgurl: filePath
        }) 
        const cloudPath = count + filePath.match(/\.[^.]+?$/)[0]
        //console.log(cloudPath)
      

        //云端上传
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res =>{
            that.data.imgUrl = res.fileID
            console.log('[上传文件] 成功：', cloudPath, res)
            
          },
          fail:e =>{
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              title: '上传失败',
            })
          },
          complete:() => {
            wx.hideLoading()
          }
        })
      },
    })
  },

  finalSubmit:function(){
    db.collection("goodslist").add({
      data: {
        price: this.data.money,
        tag: this.data.tag,
        imgUrl: this.data.imgUrl,
        title: this.data.title,
        introduction: this.data.introduction,
        time: util.formatTime(new Date())
      },
      success: function(res){
        console.log(res)
      }
    })
  }
})
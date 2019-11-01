const {regeneratorRuntime} = global
const {chooseImage, uploadFile, chooseVideo} = require('../../../utils/wxApi')
const {host} = require('../../../utils/config')
Page({
  data: {
    placeholder: '填写备注(可以不填)',
    remark: '',
    countLimit: 500,
    placeholderStyle: 'color:#C0C4CC;',
    previewUrl: '',
    limit: 1024 * 1024 * 2,
    activate: '',
    classify: 'image' // image video
  },
  onLoad(q) {
    this.setData({
      classify: q.classify,
      limit: q.classify === 'image' ? 1024 * 1024 * 2 : 1024 * 1024 * 2
    })
  },
  onShow() {

  },
  onReady() {

  },
  onHide() {

  },
  onUnload() {

  },
  onPullDownRefresh() {

  },
  onReachBottom() {

  },
  onShareAppMessage() {

  },
  onPageScroll(opt) {

  },
  onResize() {

  },
  async bindChooseFileTap(e) {
    if (this.data.classify === 'image') {
      let images = await chooseImage()
      if (images.tempFilePaths[0]) {
        if (images.tempFiles[0].size > this.data.limit) {
          wx.showToast({
            icon: 'none',
            title: '只能上传小于2MB的图片'
          })
        } else {
          this.setData({
            previewUrl: images.tempFilePaths[0],
            remark: images.tempFilePaths[0],
            activate: 'activate'
          })
        }
      }
    } else if(this.data.classify === 'video') {
      let video = await chooseVideo()
      if (video.tempFilePath) {
        if (video.size > this.data.limit) {
          wx.showToast({
            icon: 'none',
            title: '只能上传小于2MB的视频文件'
          })
        } else {
          this.setData({
            previewUrl: video.tempFilePath,
            remark: video.tempFilePath,
            activate: 'activate'
          })
        }
        console.log(`video: ${JSON.stringify(video)}`)
      }
    }
  },
  async bindUploadTap(e) {
    wx.showLoading()
    let _this = this
    let remark = _this.data.remark
    let previewUrl = _this.data.previewUrl
    if (!previewUrl) {
      wx.showToast({
        icon: 'none',
        title: `请选择要上传的${_this.data.classify === 'image' ? '图片' : '视频'}`
      })
      return false
    }
    let opt = {
      url: host + '/upload',
      filePath: previewUrl,
      name: _this.data.classify || 'file',
      formData: {remark}
    }
    let uploader = await uploadFile(opt)
    wx.hideLoading()
    if (uploader && uploader.data) {
      let data = typeof uploader.data === 'string' ? JSON.parse(uploader.data) : upload.data
      wx.showToast({
        icon: 'none',
        title: `${_this.data.classify === 'image' ? '图片' : '视频'}上传成功`
      })
      this.setData({
        remark: data.fileUrl
      })
    }
  }
})
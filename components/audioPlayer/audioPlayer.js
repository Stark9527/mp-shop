Component({
  properties: {
    audioCover: {
      type: String,
      value: 'http://cczbfile.ccvzb.com//gcrcsUploadFile/2018/5/17/18512/1526554262156.jpg'
    },
    audioResource: {
      type: String,
      value: 'http://cczbfile.ccvzb.com//gcrcsUploadFile/2018/9/13/112519/1536809119259.mp3'
    },
    audioAuthor: {
      type: String,
      value: '张梅梅暗室逢灯看'
    },
    audioName: {
      type: String,
      value: '这么好听的歌'
    }
  },
  data: {
    audioContext: null, // 音频实例
    audioPlay: false, // 控制封面旋转
    audioLoading: false, // 加载音频时效果
    switchOn: true // 播放暂停控制
  },
  observers: {

  },
  methods: {
    bindAudioSwitchTap(option) {
      let status = option.target.dataset.switch
      if (status === 'play') {
        this.data.audioContext.play()
      } else if (status === 'pause') {
        this.data.audioContext.pause()
      }
    },
    pause() {
      this.data.audioContext.pause()
    },
    stop() {
      this.data.audioContext.stop()
    },
    destroy() {
      this.data.audioContext.destroy()
    },
    onCanplay(res) {
      console.log('音频可以播放了', JSON.stringify(res))
      this.setData({
        audioLoading: false
      })
    },
    onPlay(res) {
      console.log('音频播放啦', JSON.stringify(res))
      this.setData({
        audioPlay: true,
        audioLoading: false,
        switchOn: false
      })
      this.triggerEvent('playAudioTrigger', {name: 'shishijian'})
    },
    onPause(res) {
      console.log('音频暂停播放', JSON.stringify(res))
      this.setData({
        audioPlay: false,
        switchOn: true
      })
    },
    onStop(res) {
      console.log('音频停止了，再次播放会重头播发', JSON.stringify(res))
      this.setData({
        audioPlay: false,
        switchOn: true
      })
    },
    onEnded(res) {
      console.log('音频播放完毕', JSON.stringify(res))
      this.setData({
        audioPlay: false,
        switchOn: true
      })
    },
    onTimeUpdate() {
      console.log('音频播放进度更新了~')
    },
    onWaiting(res) {
      console.log('音频正在加载中...', JSON.stringify(res))
      this.setData({
        audioLoading: true,
        audioPlay: false,
        switchOn: true
      })
    },
    onError(res) {
      console.log('音频播放出错了', JSON.stringify(res))
      this.setData({
        audioPlay: false,
        switchOn: true
      })
    }
  },
  lifetimes: {
    created() {

    },
    attached() {
      let _this = this
      const audioContext = wx.createInnerAudioContext()
      audioContext.src = _this.data.audioResource
      audioContext.onCanplay(_this.onCanplay.bind(_this))
      audioContext.onPlay(_this.onPlay.bind(_this))
      audioContext.onPause(_this.onPause.bind(_this))
      audioContext.onStop(_this.onStop.bind(_this))
      audioContext.onEnded(_this.onEnded.bind(_this))
      audioContext.onTimeUpdate(_this.onTimeUpdate.bind(_this))
      audioContext.onWaiting(_this.onWaiting.bind(_this))
      audioContext.onError(_this.onError.bind(_this))
      _this.setData({
        audioContext: audioContext
      })
    },
    ready() {

    },
    moved() {

    },
    detached() {
      this.destroy()
    }
  },
  options: {}
})
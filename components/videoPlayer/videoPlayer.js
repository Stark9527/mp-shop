Component({
  properties: {

  },
  data: {

  },
  observers: {

  },
  methods: {
    bindplay(e) { // 当开始/继续播放时触发play事件
      console.log(`bindplay: ${JSON.stringify(e.detail)}`)
    },
    bindpause(e) { // 当暂停播放时触发 pause 事件
      console.log(`bindpause: ${JSON.stringify(e.detail)}`)
    },
    bindended(e) { // 当播放到末尾时触发 ended 事件
      console.log(`bindended: ${JSON.stringify(e.detail)}`)
    },
    bindtimeupdate(e) { // 播放进度变化时触发，event.detail = {currentTime, duration} 。触发频率 250ms 一次
      console.log(`bindtimeupdate: ${JSON.stringify(e.detail)}`)
    },
    bindfullscreenchange(e) { // 视频进入和退出全屏时触发，event.detail = {fullScreen, direction}，direction 有效值为 vertical 或 horizontal
      console.log(`bindfullscreenchange: ${JSON.stringify(e.detail)}`)
    },
    bindwaiting(e) { // 视频出现缓冲时触发
      console.log(`bindwaiting: ${JSON.stringify(e.detail)}`)
    },
    binderror(e) { // 视频播放出错时触发
      console.log(`binderror: ${JSON.stringify(e.detail)}`)
    },
    bindprogress(e) { // 加载进度变化时触发，只支持一段加载。event.detail = {buffered}，百分比
      console.log(`bindprogress: ${JSON.stringify(e.detail)}`)
    }
  },
  lifetimes: {
    created() {

    },
    attached() {

    },
    ready() {

    },
    moved() {

    },
    detached() {

    }
  },
  pageLifetimes:  { // 组件所在页面的生命周期
    show() {

    },
    hide() {

    },
    resize() {

    }
  },
  options: {

  }
})
const _ajax = require('../../utils/request')
Component({
  properties: { // 模板属性对象
    list: {
      type: Array,
      value: []
    },
    needClassify: {
      type: Boolean,
      value: false
    }
  },
  data: { // 私有数据
    privateData: '私有数据'
  },
  observers: {

  },
  methods: { // 组件方法
    bindItemTap(event) {
      // let index = event.currentTarget.dataset.index // 通过组件标签的data-*属性获取传递到事件中的参数
      // let myEventDetail = {msg: 'data from custom component'} // detail对象，提供给事件监听函数
      // let myEventOption = {bubbles: false 冒泡, composed: false 穿越组件边界, capturePhase: false 捕获} // 触发事件的选项
      // this.triggerEvent('myevent', myEventDetail, myEventOption) // 传递数据到引用组件的页面
      let dataset = event.currentTarget.dataset
      console.log(dataset)
      this.triggerEvent('itemTapTrigger', {classify: dataset.data.classify})
    },
    bindFavorTap(event) {
      _ajax('favor').then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    bindShareTap(event) {

    }
  },
  lifetimes: { // 组件生命周期，可以写在lifetimes对象里，也可以单独写在methods对象里
    created() {

    },
    attached() {
      // console.log(this.properties.list.length) // 直接通过属性获取引用组件的页面传递过来的值
      // console.log(this.data.list.length) // 用data也能获取properties里的值
      // console.log(this.data.privateData) // 直接使用data获取私有数据
      // console.log(this.dataset.color) // 通过dataset获取引用组件的页面传递过来的值
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
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  }
})
Component({
  properties: { // 模板属性对象
    loaded: {
      type: Boolean,
      value: false
    },
    loadingText: {
      type: String,
      value: '加载中....'
    },
    loading: {
      type: Boolean,
      value: true
    },
    noMoreText: {
      type: String,
      value: '- 没有更多了 -'
    }
  },
  data: { // 私有数据

  },
  observers: {

  },
  methods: { // 组件方法

  },
  lifetimes: { // 组件生命周期，可以写在lifetimes对象里，也可以单独写在methods对象里
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
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  }
})
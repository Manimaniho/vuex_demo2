import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 文本框的内容
    inputValue: 'aaa',
    // 所有的任务列表
    list: [],
    // 前端模拟 下一个id
    nextId: 5
  },
  mutations: {
    // 添加列表项
    addItem(state) {
      const obj = {
        // 真实生产环境中id都是后端自动生成的
        // id: '',
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      // 追加到list中
      state.list.push(obj)
      state.nextId++
      state.inputValue = ''
    },
    setInputValue(state, val) {
      state.inputValue = val
    },
    initList(state, list) {
      state.list = list
    }
  },
  actions: {
    // axios为异步操作
    getList(context) {
      axios.get('/list.json').then(({ data }) => {
        console.log(data)
        context.commit('initList', data)
      })
    }
  },
  modules: {
  }
})

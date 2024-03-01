import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    viewKey: 'all',
    // 文本框的内容
    inputValue: 'aaa',
    // 所有的任务列表
    list: [],
    // 前端模拟 下一个id
    nextId: 5
  },
  mutations: {
    // 修改视图的关键字
    changeViewKey(state, key) {
      state.viewKey = key
    },
    cleanDone(state) {
      state.list = state.list.filter(x => x.done === false)
    },
    // 修改列表项的选中状态
    changeStatus(state, param) {
      const i = state.list.findIndex(x => x.id === param.id)
      if (i !== -1) {
        state.list[i].done = param.status
      }
    },
    // 根据id删除对应的任务事项
    removeItem(state, id) {
      // 根据id查找对应项的索引
      const i = state.list.findIndex(x => x.id === id)
      // 根据索引删除对应的元素
      if (i !== -1) {
        state.list.splice(i, 1)
      }
    },
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
  getters: {
    // 统计未完成的任务的条数
    unDoneLength(state) {
      return state.list.filter(x => x.done === false).length
    },
    infoList(state) {
      if (state.viewKey === 'all') {
        return state.list
      }
      if (state.viewKey === 'undone') {
        return state.list.filter(x => !x.done)
      }
      if (state.viewKey === 'done') {
        return state.list.filter(x => x.done)
      }
      return state.list
    }
  },
  modules: {
  }
})

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//准备actions:用于响应组件中的动作
const actions = {
  setLogged(context, bool) {
    context.commit("SetLogged", bool)
  },
  //再登陆后设置用户信息
  setUserMessage(context, user) {
    context.commit('SetUserMessage', user)
  }
}

//准备mutations:用于操作数据(state状态)
const mutations = {
  SetLogged(state, bool) {
    state.logged = bool
  },
  SetUserMessage(state, user) {
    state.user.username = user.username
    state.user.nickname = user.nickname
    state.user.date = user.date
    state.user.avatar = user.avatar
  },
  //修改用户头像
  UpdateAvatar(state, avatar) {
    state.user.avatar = avatar
  },
  //修改用户昵称
  UpdateNickname(state, nickname) {
    state.user.nickname = nickname
  },
  //设置当前图片信息
  SetNowPicture(state, picture) {
    state.nowPicture.id = picture.id,
      state.nowPicture.url = picture.url,
      state.nowPicture.viewCount = picture.viewCount,
      state.nowPicture.likeCount = picture.likeCount,
      state.nowPicture.commentCount = picture.commentCount,
      state.nowPicture.downloadCount = picture.downloadCount,
      state.nowPicture.pictureName = picture.pictureName,
      state.nowPicture.description = picture.description
  },
  //设置搜索内容
  SetSearchCOntent(state, searchContent) {
    state.searchContent = searchContent
  }
}

//准备state:用于存储数据(状态)
const state = {
  logged: false,
  user: {
    username: "null",
    nickname: "null",
    date: null,
    avatar: "null"
  },
  nowPicture: {
    id: "",
    url: "",
    viewCount: 0,
    likeCount: 0,
    commentCount: 0,
    downloadCount: 0,
    pictureName: "",
    description: "",
  },
  searchContent: "",
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})

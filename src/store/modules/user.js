import { getToken, setToken, removeToken } from '@/utils/auth';
import { login } from '@/api/user'

const state = {
  token: getToken(),
  userInfo: {} // 存储用户基本资料
};

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
    setToken(token); // token同步到缓存
  },

  REMOVE_TOKEN(state) {
    state.token = null; // 清除vuex中的token
    removeToken(); // 清除缓存中的token
  },

  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo;
  }
};

const actions = {
  async login(context, data) {
    const token = await login(data);
    context.commit("SET_TOKEN", token);
  },

  // 退出登录
  async logout(context) {
    context.commit('REMOVE_TOKEN'); // 删除 token
    context.commit('SET_USER_INFO', {}); // 设置用户信息为空对象
  }
};

export default {
  namespaced: true, // 开启命名空间，调用时需要用模块名user加方法名
  state,
  mutations,
  actions,
};


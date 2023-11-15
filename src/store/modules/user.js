import { getToken, setToken, removeToken } from '@/utils/auth';
import { login } from '@/api/user'

const state = {
  token: getToken(),
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
};

const actions = {
  async login(context, data) {
    const { username, password } = data
    const token = await login({ username: username.trim(), password: password });
    context.commit("SET_TOKEN", token);
  },
};

export default {
  namespaced: true, // 开启命名空间，调用时需要用模块名user加方法名
  state,
  mutations,
  actions,
};


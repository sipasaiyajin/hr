// 就是建立了一个快捷访问app,user
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  // 建立 token 的快捷访问
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name
}
export default getters

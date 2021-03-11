
const getters = {
  website: state => state.common.website,
  theme: state => state.common.theme,
  themeName: state => state.common.themeName,
  isShade: state => state.common.isShade,
  isCollapse: state => state.common.isCollapse,
  keyCollapse: (state, getters) => getters.screen > 1 ? getters.isCollapse : false,
  screen: state => state.common.screen,
  logsFlag: (state, getters) => getters.logsLen === 0,
  blogLinks: state => state.blog.blogLinks,
  blogger: state => state.blog.blogger,
  reader: state => state.blog.reader,
  likes: state => state.blog.likes,
  readerAccessToken: state => state.blog.readerAccessToken,
}
export default getters
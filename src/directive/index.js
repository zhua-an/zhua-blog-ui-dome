import highlight from './highlight'

const importDirective = Vue => {
  Vue.directive('highlight', highlight)
}

export default importDirective
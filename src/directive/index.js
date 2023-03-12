import hasPermi from './hasPermission'
import Loading from "./Loading"


const install = function(Vue) {
  Vue.directive('hasPermi', hasPermi)
  Vue.directive("loading", Loading);
}

if (window.Vue) {
  window['hasPermi'] = hasPermi
  Vue.use(install); // eslint-disable-line
}

export default install
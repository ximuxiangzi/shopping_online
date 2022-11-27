 /**
 * 操作权限处理
 * Copyright (c) 2019 seclion
 */
  import store from '@/store'

  export default {
    inserted(el, binding, vnode) {
      let { value } = binding
      const permissions = JSON.parse(localStorage.getItem('permissionBot'))
      // console.log(value)
      value = Array.from(new Set(value))
      let num =0;
      permissions.forEach(e => {
        if( value.includes(e)){
          num++;
         }
      });
      // const hasPermissions =  permissions.some(permission => {
      //   // console.log(permission)
      //    return value.includes(permission);
      // })
      if (num !== value.length) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  }
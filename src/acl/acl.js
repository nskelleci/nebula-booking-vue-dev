import Vue from 'vue'
import { AclInstaller, AclCreate, AclRule } from 'vue-acl'
import router from '@/router'

Vue.use(AclInstaller)

let initialRole = 'public'

const userInfo = JSON.parse(localStorage.getItem('agency'))
if (userInfo && userInfo.role) initialRole = userInfo.role

console.log(initialRole)
export default new AclCreate({
  initial  : initialRole,
  notfound : '/pages/not-authorized',
  router,
  acceptLocalRules : true,
  globalRules: {
    isManager  : new AclRule('manager').generate(),
    isAgency : new AclRule('agency').or('manager').generate(),
    isPublic : new AclRule('public').or('manager').generate()
  }
})

import logoutService from '../../Services/logoutService'
  const actions = {
    async logout () {
      console.log("Log Out Çalıştı");
      await logoutService.logout();
    }
  }
  
  export default {
    actions
  }
export const ROUTES = {
  USERS: {
    LOGIN: 'users/login',
    LOGOUT: 'users/logout',
    CHECK_USERNAME: 'users/check_username',
    RESET_TOKEN: 'users/reset_token',
    SHOW_FROM_TOKEN: 'users/show_from_token',
    SIGNUP: 'users/signup', //post
  },


  GROUPS:{
    INDEX: 'groups', // get
    SHOW: 'groups/show', // get
    CREATE: 'groups', // post
    DESTROY: 'groups' // delete
  }
};

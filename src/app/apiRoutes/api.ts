export const ROUTES = {
  USERS: {
    LOGIN: 'users/login',
    LOGOUT: 'users/logout',
    CHECK_USERNAME: 'users/check_username',
    RESET_TOKEN: 'users/reset_token',
    SHOW_FROM_TOKEN: 'users/show_from_token',
    SIGNUP: 'users/signup', //post
    GOOGLE_AUTH: 'users/login_with_google_auth',
  },

  GROUPS: {
    INDEX: 'groups', // get
    SHOW: 'groups/show', // get
    CREATE: 'groups', // post
    DESTROY: 'groups', // delete
    UPDATE: 'groups', // put
    CREATE_MEMBER_ADMIN: 'groups/create_member_admin', //post
  },

  BILLS: {
    INDEX: 'bills', //get
    INDEX_GRAPH: 'bills/index_graph', //get
    SHOW: 'bills/show',
    CREATE: 'bills', //post
    DESTROY: 'bills',
    UPDATE: 'bills',
    SHARE_BILLS: 'bills/share_bills', //get
    AMOUNT_YOU_OWE: 'bills/amount_you_owe', //get
    AMOUNT_YOU_LENT: 'bills/amount_you_lent', //get
  },

  BANK_ACCOUNTS: {
    INDEX: 'bank_accounts', //get
    SHOW: 'bank_accounts/show', //get
    CREATE: 'bank_accounts', //post
    DESTROY: 'bank_accounts', //delete
    UPDATE: 'bank_accounts', //put
    SET_PRIMARY: 'bank_accounts/set_primary', //put
  },

  TRANSACTIONS: {
    INDEX: 'transactions', //get
    SHOW: 'transactions/show', //get
    CREATE: 'transactions', //post
    DESTROY: 'transactions', //delete
    UPDATE: 'transactions', //put
  },
};

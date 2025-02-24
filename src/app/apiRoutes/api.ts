export const ROUTES = {
  USERS: {
    LOGIN: 'users/login',
    LOGOUT: 'users/logout',
    CHECK_USERNAME: 'users/check_username',
    RESET_TOKEN: 'users/reset_token',
    SHOW_FROM_TOKEN: 'users/show_from_token',
    SIGNUP: 'users/signup',
    GOOGLE_AUTH: 'users/login_with_google_auth',
  },

  GROUPS: {
    INDEX: 'groups',
    SHOW: 'groups/show',
    CREATE: 'groups',
    DESTROY: 'groups',
    UPDATE: 'groups',
    CREATE_MEMBER_ADMIN: 'groups/create_member_admin',
  },

  BILLS: {
    INDEX: 'bills',
    INDEX_GRAPH: 'bills/index_graph',
    SHOW: 'bills/show',
    CREATE: 'bills',
    DESTROY: 'bills',
    UPDATE: 'bills',
    SHARE_BILLS: 'bills/share_bills',
    AMOUNT_YOU_OWE: 'bills/amount_you_owe',
    AMOUNT_YOU_LENT: 'bills/amount_you_lent',
  },

  BANK_ACCOUNTS: {
    INDEX: 'bank_accounts',
    SHOW: 'bank_accounts/show',
    CREATE: 'bank_accounts',
    DESTROY: 'bank_accounts',
    UPDATE: 'bank_accounts',
    SET_PRIMARY: 'bank_accounts/set_primary',
  },

  TRANSACTIONS: {
    INDEX: 'transactions',
    SHOW: 'transactions/show',
    CREATE: 'transactions',
    DESTROY: 'transactions',
    UPDATE: 'transactions',
  },

  CREDIT_CARDS: {
    INDEX: 'credit_cards',
    SHOW: 'credit_cards',
    CREATE: 'credit_cards',
    UPDATE: 'credit_cards',
    DESTROY: 'credit_cards',
    SET_PRIMARY: 'credit_cards/set_primary',
  },
};

const ItemCommands = {
  ADD: { cmd: 'add' },
  REMOVE: { cmd: 'remove' },
  CLEAR: { cmd: 'clear' },
  FIND_BY_USER: { cmd: 'findByUser' },
};

const Auth = {
  FIND_BY_EMAIL: { cmd: 'findByEmail' },
  LOGIN: { cmd: 'login' },
  REGISTER: { cmd: 'register' },
};

const Coupon = {
  CREATE: { cmd: 'create' },
  FIND_ONE: { cmd: 'findOne' },
  CAN_USE: { cmd: 'canUse' },
};

const Cart = { ...ItemCommands, PRICE: { cmd: 'price' } };

const Review = {
  CREATE_OR_UPDATE: { cmd: 'createOrUpdate' },
  FIND_ONE: { cmd: 'findOne' },
  FIND_ALL: { cmd: 'findAll' },
};

const Payment = {
  CHECKOUT: { cmd: 'checkout' },
  SUCCESS: { cmd: 'success' },
};
export const Commands = {
  FIND_ALL: { cmd: 'findAll' },
  FIND_BY_ID: { cmd: 'findById' },
  CREATE: { cmd: 'create' },
  UPDATE: { cmd: 'update' },
  DELETE: { cmd: 'delete' },
  Wishlist: ItemCommands,
  Auth,
  Cart,
  Coupon,
  Review,
  Payment,
};

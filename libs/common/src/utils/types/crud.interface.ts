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
  CREATE: { cmd: 'findByEmail' },
  FIND_ONE: { cmd: 'findOne' },
  CAN_USE: { cmd: 'canUse' },
};
export const Commands = {
  FIND_ALL: { cmd: 'findAll' },
  FIND_BY_ID: { cmd: 'findById' },
  CREATE: { cmd: 'create' },
  UPDATE: { cmd: 'update' },
  DELETE: { cmd: 'delete' },
  Auth,
  Cart: { ...ItemCommands, PRICE: { cmd: 'price' } },
  Wishlist: ItemCommands,
  Coupon,
};

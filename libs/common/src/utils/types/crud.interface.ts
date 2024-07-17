interface Crud {
  FIND_ALL: { cmd: string };
  FIND_BY_ID: { cmd: string };
  CREATE: { cmd: string };
  UPDATE: { cmd: string };
  DELETE: { cmd: string };
}

export const Commands: Crud = {
  FIND_ALL: { cmd: 'findAll' },
  FIND_BY_ID: { cmd: 'findById' },
  CREATE: { cmd: 'create' },
  UPDATE: { cmd: 'update' },
  DELETE: { cmd: 'delete' },
};

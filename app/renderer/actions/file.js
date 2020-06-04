import { createAction } from 'redux-actions';

export default {
  save: createAction('FILE_SAVE', (start, end, section, second, duration ) => ({ start, end, section, second, duration })),
  add: createAction('FILE_ADD', (file) => ({ file })),
  clear: createAction('FILE_CLEAR'),
}

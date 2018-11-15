// @flow
import * as Cook from 'js-cookie';

const cookie = () => {
  const getAll = () => Cook.get();
  const get = (name: string) => Cook.get(name);
  const set = (name: string, value: string) => Cook.set(name, value);
  const remove = (name: string) => Cook.remove(name);

  return {
    getAll,
    get,
    set,
    remove,
  };
};

export default cookie;

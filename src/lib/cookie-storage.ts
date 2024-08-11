import Cookies from 'js-cookie';
import { StateStorage } from 'zustand/middleware';

const cookieStorage: StateStorage = {
  getItem: (name: string) => {
    return Cookies.get(name) ?? null;
  },
  setItem: (name: string, value: string) => {
    Cookies.set(name, value, { expires: 1 });
  },
  removeItem: (name: string) => {
    Cookies.remove(name);
  },
};

export default cookieStorage;

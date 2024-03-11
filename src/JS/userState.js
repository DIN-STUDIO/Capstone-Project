import { atom } from 'recoil';

const userInfoState = atom({
  key: 'userInfoState',
  default: {
    accessToken: null,
    id: null,
    name: '',
    email: '',
    nickname: '',
    profileImage: '',
    isLogin: false,
  }
});

export { userInfoState };
import { message } from 'antd';

export const error = () => {
  message.error('סליחה, משהו השתבש 😔');
};

export const duplicateError = () => {
  message.error('הפריט הזה כבר קיים 😔');
};

export const duplicateUser = () => {
  message.error('משתמש זה כבר קיים 😔');
};

export const loginError = () => {
  message.error('סליחה, משהו השתבש 😔 נא לבדוק שהמשתמש הזה אכן קיים');
}

export const gutter = { xs: [8, 16], sm: [16, 24], md: [24, 32], xl: [32, 40] }

export const localStorageEmpty = () => {
  if (localStorage.meals) {
    const { breakfast, lunch, dinner, inBetween, date } = JSON.parse(localStorage.meals)
    if (breakfast.length || lunch.length || dinner.length || inBetween.length) return false
  }
  return true
}

export const onError = (e) => {
  let msg = e.toString();

  // Auth errors
  if (!(e instanceof Error) && e.message) {
    msg = e.message;
  }

  alert(msg);
}

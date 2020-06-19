import { message } from 'antd';

export const meals = ['breakfast', 'lunch', 'dinner', 'inBetween']
export const compounds = ['fats', 'proteins', 'carbs']
export const mealsDict = { breakfast: 'ארוחת בוקר', lunch: 'ארוחת צהריים', dinner: 'ארוחת ערב', inBetween: 'בין לבין' }

export const error = () => {
  message.error('סליחה, משהו השתבש 😔');
};

export const loginError = () => {
  message.error('סליחה, משהו השתבש 😔 נא לבדוק שהמשתמש הזה אכן קיים');

}

export const gutter = { xs: [8, 16], sm: [16, 24], md: [24, 32], xl: [32, 40] }

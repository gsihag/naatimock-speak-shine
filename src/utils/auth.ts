export interface User {
  email: string;
  name: string;
}

export const saveUser = (user: User) => {
  localStorage.setItem('naati_user', JSON.stringify(user));
};

export const getUser = (): User | null => {
  const userStr = localStorage.getItem('naati_user');
  return userStr ? JSON.parse(userStr) : null;
};

export const logout = () => {
  localStorage.removeItem('naati_user');
};

export const isAuthenticated = (): boolean => {
  return !!getUser();
};

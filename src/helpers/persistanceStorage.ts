export const getItem = (key: string): any => {
  try {
    return JSON.parse(localStorage.getItem(key) as string);
  } catch (e) {
    throw new Error('Error getting data from localStorage');
  }
};

export const setItem = <D>(key: string, data: D) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    throw new Error('Error saving data in localStorage');
  }
};
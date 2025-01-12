const safeLocalStorage = {
  getItem: (key) =>
    typeof window !== "undefined" ? localStorage.getItem(key) : null,
  setItem: (key, value) => {
    if (typeof window !== "undefined") localStorage.setItem(key, value);
  },
};

export default safeLocalStorage;

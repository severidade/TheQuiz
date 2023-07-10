export const validateName = (name: string) => {
  return name.length >= 4;
};

export const validateAge = (age: number | null) => {
  return age !== null && age >= 1 && age < 100;
};

export const validateEmail = (email: string) => {
  const emailRegex = /^(?!\.)[a-zA-Z0-9._%+-]+@(?!-)[a-zA-Z0-9.-]+(?<!-)\.[a-zA-Z]{2,6}$/;
  return email.match(emailRegex);
};

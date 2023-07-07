export const validateName = (name: string) => {
  return name.length >= 4;
};

export const validateAge = (age: number | null) => {
  return age !== null && age >= 1 && age < 100;
};

export const validateEmail = (email: string) => {
  return email.match(/\S+@\S+\.\S+/);
};

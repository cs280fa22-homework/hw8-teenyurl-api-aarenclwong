import { faker } from "@faker-js/faker";

export const makeKey = () => {
  const length = 6 + Math.floor(Math.random() * 4);
  return faker.internet.password(length, true, /[A-Za-z]/);
};

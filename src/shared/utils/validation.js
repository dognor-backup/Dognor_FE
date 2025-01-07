export function validateId(id) {
  const regex = /^[a-z0-9]{5,20}$/;
  return regex.test(id);
}

export function validatePassword(password) {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
  return regex.test(password);
}

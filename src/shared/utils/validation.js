export function validateId(id) {
  const regex = /^[a-z0-9]{5,20}$/;
  return regex.test(id);
}

export function validatePassword(password) {
  const regex = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;
  return regex.test(password);
}
export function validatePhoneNumber(phoneNumber) {
  const regex = /^(01[016789])\d{3,4}\d{4}$/;
  return regex.test(phoneNumber);
}

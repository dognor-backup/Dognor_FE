export const calculateAge = (birthDay) => {
  if (!birthDay) return "정보 없음";

  const birthDate = new Date(birthDay);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const isBirthdayPassed =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() >= birthDate.getDate());

  if (!isBirthdayPassed) {
    age -= 1;
  }

  if (age < 1) {
    const months =
      today.getFullYear() * 12 +
      today.getMonth() -
      (birthDate.getFullYear() * 12 + birthDate.getMonth());

    return `${months}개월`;
  }

  return `${age}살`;
};

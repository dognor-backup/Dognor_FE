export function getRandomCard(len, arr) {
  if (len < 3) return arr;
  const randomIndex = Math.floor(Math.random() * (len - 2));
  return arr.slice(randomIndex, randomIndex + 3);
}

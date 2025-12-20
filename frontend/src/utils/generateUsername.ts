export function generateUsername(username: string) {
  const randomNumber = Math.floor(Math.random() * 900 + 100);
  return `${username}-${randomNumber}`;
}

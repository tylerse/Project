// CAESER ENCRYPTION CODE USED FROM
// https://blog.stranianelli.com/how-to-code-a-caesar-cipher-in-javascript/#:~:text=It%20is%20a%20type%20of,the%20letter%20A%20becomes%20C%20.

const uppercase = () =>
  [...Array(26)].map((n, i) => `${String.fromCharCode(i + "A".charCodeAt())}`);
const lowercase = () =>
  [...Array(26)].map((n, i) => `${String.fromCharCode(i + "a".charCodeAt())}`);

const mod = (a, b) => {
  const c = a % b;
  return c < 0 ? c + b : c;
};

const chiper = (array, shift) => {
  const cipher = {};
  array.forEach((value, index) => {
    cipher[value] = array[mod(index + shift, array.length)];
  });
  return cipher;
};

const caesarChipher = (shift) => {
  return {
    ...chiper(uppercase(), shift),
    ...chiper(lowercase(), shift),
  };
};

const processCharacter = (cipher, character) =>
  cipher.hasOwnProperty(character) ? cipher[character] : character;

export default (text, shift) => {
  const caesar = caesarChipher(shift);
  return [...text].map((c) => processCharacter(caesar, c)).join("");
};
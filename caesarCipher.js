const colors = require("colors");

// decipher function rolls letters backwards from a message given a secret number
module.exports = decipher = (text = "", number = 0) => {
  const lettersArray = text.split("");
  const swappedLetters = lettersArray.map(character => {
    // Do something with each character
    // if it's a non-word character or a number, do nothing
    if (/\W|[0-9]/.test(character)) {
      return character;
    }

    // if it is, then "roll" it backwards
    const charCode = character.charCodeAt(0);
    const newCharCode = charCode - number;
    const newCharacter = String.fromCharCode(newCharCode);

    // if the new character is a letter or a number, returns it
    if (/[a-z0-9]/.test(newCharacter)) {
      return newCharacter;
    }

    // if it went out from the alphabet's ranged, then loops it
    const alphabetLength = "z".charCodeAt(0) - "a".charCodeAt(0) + 1;
    const loopedCharCode = newCharCode + alphabetLength;
    const finalCharacter = String.fromCharCode(loopedCharCode);
    return finalCharacter;
  });
  const newText = swappedLetters.join("");
  console.log(
    "\nSecret:  ".green,
    text.yellow,
    "\nRevealed:".green,
    newText.yellow
  );
  return newText;
};

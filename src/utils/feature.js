const lowerCaseHighEntryLetters = 'bdhkltf';
const lowerCaseLowEntryLetters = 'aceormnsuvwi';
const lowercaseUniqueShapes = 'gjyqzpx';
const upperCaseHighEntryLetters = 'BDHKLTF';
const upperCaseLowEntryLetters = 'ACEORMNSUVWI';
const uppercaseUniqueShapes = 'GJYQZPX';
const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const checkNextCharacter = next => {
  if (
    lowerCaseHighEntryLetters.includes(next) ||
    upperCaseHighEntryLetters.includes(next)
  ) {
    return 'high';
  } else if (
    lowerCaseLowEntryLetters.includes(next) ||
    upperCaseLowEntryLetters.includes(next)
  ) {
    return 'low';
  } else if (
    lowercaseUniqueShapes.includes(next) ||
    uppercaseUniqueShapes.includes(next)
  ) {
    return 'unique';
  }
};

export const generateLetterToSVG = str => {
  const strArr = str.split('');
  const svgLetters = [];

  for (let i = 0; i < strArr.length; i++) {
    let char = strArr[i];
    let nextChar = strArr[i + 1];
    let prevChar = i > 0 ? strArr[i - 1] : null;

    if (prevChar && !nextChar) {
      if ('rl'.includes(char)) {
        svgLetters.push(`${char}.base`);
      } else {
        svgLetters.push(`${char}.left`, `${char}.base`);
      }
    } else if (!prevChar && nextChar) {
      svgLetters.push(`${char}.base`);
    } else if (prevChar && nextChar) {
      if ('rl'.includes(char)) {
        svgLetters.push(`${char}.base`);
      } else if (char === 'c') {
        svgLetters.push('c.left', 'c.alt');
      } else {
        svgLetters.push(`${char}.left`, `${char}.base`);
      }
    } else if (!prevChar && !nextChar) {
      // if (char !== 'a') {
      //   svgLetters.push(`${char}.base`);
      // } else {
      // svgLetters.push(`${char}.left`, `${char}.base`);
      svgLetters.push(`${char}.base`);
      // }
    }
  }

  return svgLetters;
};

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

// export const generateLetterToSVG = str => {
//   const strArr = str.split('');
//   const svgLetters = [];

//   for (let i = 0; i < strArr.length; i++) {
//     let char = strArr[i];
//     let nextChar = strArr[i + 1];
//     let prevChar = i > 0 ? strArr[i - 1] : null;

//     if (prevChar && !nextChar) {
//       if ('rl'.includes(char)) {
//         svgLetters.push(`${char}.base`);
//       } else {
//         svgLetters.push(`${char}.left`, `${char}.base`);
//       }
//     } else if (!prevChar && nextChar) {
//       svgLetters.push(`${char}.base`);
//     } else if (prevChar && nextChar) {
//       if ('rl'.includes(char)) {
//         svgLetters.push(`${char}.base`);
//       } else if (char === 'c') {
//         svgLetters.push('c.left', 'c.alt');
//       } else {
//         svgLetters.push(`${char}.left`, `${char}.base`);
//       }
//     } else if (!prevChar && !nextChar) {
//       // if (char !== 'a') {
//       //   svgLetters.push(`${char}.base`);
//       // } else {
//       // svgLetters.push(`${char}.left`, `${char}.base`);
//       svgLetters.push(`${char}.base`);
//       // }
//     }
//   }

//   return svgLetters;
// };

const BASELINE_CHARS = 'acdhiklmnprtux';
const ASC_CHARS = 'bf';
const DESC_CHARS = 'gjyf';
const HK_CURVE = 'hk';
const MN_CURVE = 'mn';
const RS_CURVE = 'rs';
const VW_CURVE = 'vw';
const X_CURVE = 'x';
const Z_CURVE = 'z';
const S_CURVE = 's';
const O_CURVE = 'o';
const CAPS_CURVE = 'acdgoq';
const E_CURVE = 'e';
const S_HEIGHT_CURVE = 'ijptuy';
const ASC_CURVE = 'bfl';

export const generateLetterToSVG = str => {
  const strArr = str.split('');
  const svgLetters = [];

  for (let i = 0; i < strArr.length; i++) {
    let char = strArr[i];
    let nextChar = strArr[i + 1];
    let prevChar = i > 0 ? strArr[i - 1] : null;

    if (prevChar && !nextChar) {
      svgLetters.push(`${char}.base`);
    } else if (!prevChar && nextChar) {
      svgLetters.push(`${char}.left`);
      if (BASELINE_CHARS.includes(char)) {
        if (CAPS_CURVE.includes(nextChar)) svgLetters.push('a.alt.caps');
        else if (ASC_CURVE.includes(nextChar)) svgLetters.push('a.asc.alt');
        else if (DESC_CHARS.includes(nextChar)) svgLetters.push('a.desc.alt');
        else if (HK_CURVE.includes(nextChar)) svgLetters.push('a.hk.alt');
        else if (MN_CURVE.includes(nextChar)) svgLetters.push('a.mn.alt');
        else if (RS_CURVE.includes(nextChar)) svgLetters.push('a.rs.alt');
        else if (VW_CURVE.includes(nextChar)) svgLetters.push('a.vw.alt');
        else if (X_CURVE.includes(nextChar)) svgLetters.push('a.x.alt');
        else if (Z_CURVE.includes(nextChar)) svgLetters.push('a.z.alt');
        else if (S_CURVE.includes(nextChar)) svgLetters.push('a.s.alt');
        else if (O_CURVE.includes(nextChar)) svgLetters.push('a.o.alt');
        else if (E_CURVE.includes(nextChar)) svgLetters.push('a.e.alt');
        else if (S_HEIGHT_CURVE.includes(nextChar))
          svgLetters.push('a.s.height');
      } else if (DESC_CHARS.includes(char)) {
        if (CAPS_CURVE.includes(nextChar)) svgLetters.push('desc.caps.alt');
        else if (HK_CURVE.includes(nextChar)) svgLetters.push('a.hk.alt');
        else if (MN_CURVE.includes(nextChar)) svgLetters.push('desc.mn.alt');
        else if (RS_CURVE.includes(nextChar)) svgLetters.push('desc.rs.alt');
        else if (VW_CURVE.includes(nextChar)) svgLetters.push('desc.vw.alt');
        else if (X_CURVE.includes(nextChar)) svgLetters.push('desc.x.alt');
        else if (Z_CURVE.includes(nextChar)) svgLetters.push('desc.z.alt');
        else if (S_CURVE.includes(nextChar)) svgLetters.push('desc.s.alt');
        else if (O_CURVE.includes(nextChar)) svgLetters.push('desc.o.alt');
        else if (E_CURVE.includes(nextChar)) svgLetters.push('desc.e.alt');
        else if (ASC_CURVE.includes(nextChar)) svgLetters.push('desc.asc.alt');
        else if (S_HEIGHT_CURVE.includes(nextChar))
          svgLetters.push('desc.s.height');
      } else if (char === 'b') {
        if (CAPS_CURVE.includes(nextChar)) svgLetters.push('b.caps.alt');
        else if (ASC_CURVE.includes(nextChar)) svgLetters.push('b.l.alt');
        else if (DESC_CHARS.includes(nextChar)) svgLetters.push('b.desc.alt');
        else if (HK_CURVE.includes(nextChar)) svgLetters.push('b.hk.alt');
        else if (MN_CURVE.includes(nextChar)) svgLetters.push('b.mn.alt');
        else if (RS_CURVE.includes(nextChar)) svgLetters.push('b.rs.alt');
        else if (VW_CURVE.includes(nextChar)) svgLetters.push('b.vw.alt');
        else if (X_CURVE.includes(nextChar)) svgLetters.push('b.x.alt');
        else if (Z_CURVE.includes(nextChar)) svgLetters.push('b.z.alt');
        else if (S_CURVE.includes(nextChar)) svgLetters.push('b.s.alt');
        else if (O_CURVE.includes(nextChar)) svgLetters.push('b.o.alt');
        else if (E_CURVE.includes(nextChar)) svgLetters.push('b.e.alt');
        else if (S_HEIGHT_CURVE.includes(nextChar))
          svgLetters.push('b.s.height');
      } else if (char === 'e') {
        if (CAPS_CURVE.includes(nextChar)) svgLetters.push('e.caps.alt');
        else if (ASC_CURVE.includes(nextChar)) svgLetters.push('e.asc.alt');
        else if (DESC_CHARS.includes(nextChar)) svgLetters.push('e.desc.alt');
        else if (HK_CURVE.includes(nextChar)) svgLetters.push('e.hk.alt');
        else if (MN_CURVE.includes(nextChar)) svgLetters.push('e.mn.alt');
        else if (RS_CURVE.includes(nextChar)) svgLetters.push('e.rs.alt');
        else if (VW_CURVE.includes(nextChar)) svgLetters.push('e.vw.alt');
        else if (X_CURVE.includes(nextChar)) svgLetters.push('e.x.alt');
        else if (Z_CURVE.includes(nextChar)) svgLetters.push('e.z.alt');
        else if (O_CURVE.includes(nextChar)) svgLetters.push('e.o.alt');
        else if (E_CURVE.includes(nextChar)) svgLetters.push('e.e.alt');
        else if (S_HEIGHT_CURVE.includes(nextChar))
          svgLetters.push('e.s.height');
      }
    } else if (prevChar && nextChar) {
      svgLetters.push(`${char}.alt`);
      if (BASELINE_CHARS.includes(char)) {
        if (CAPS_CURVE.includes(nextChar)) svgLetters.push('a.alt.caps');
        else if (ASC_CURVE.includes(nextChar)) svgLetters.push('a.asc.alt');
        else if (DESC_CHARS.includes(nextChar)) svgLetters.push('a.desc.alt');
        else if (HK_CURVE.includes(nextChar)) svgLetters.push('a.hk.alt');
        else if (MN_CURVE.includes(nextChar)) svgLetters.push('a.mn.alt');
        else if (RS_CURVE.includes(nextChar)) svgLetters.push('a.rs.alt');
        else if (VW_CURVE.includes(nextChar)) svgLetters.push('a.vw.alt');
        else if (X_CURVE.includes(nextChar)) svgLetters.push('a.x.alt');
        else if (Z_CURVE.includes(nextChar)) svgLetters.push('a.z.alt');
        else if (S_CURVE.includes(nextChar)) svgLetters.push('a.s.alt');
        else if (O_CURVE.includes(nextChar)) svgLetters.push('a.o.alt');
        else if (E_CURVE.includes(nextChar)) svgLetters.push('a.e.alt');
        else if (S_HEIGHT_CURVE.includes(nextChar))
          svgLetters.push('a.s.height');
      } else if (DESC_CHARS.includes(char)) {
        if (CAPS_CURVE.includes(nextChar)) svgLetters.push('desc.caps.alt');
        else if (HK_CURVE.includes(nextChar)) svgLetters.push('a.hk.alt');
        else if (MN_CURVE.includes(nextChar)) svgLetters.push('desc.mn.alt');
        else if (RS_CURVE.includes(nextChar)) svgLetters.push('desc.rs.alt');
        else if (VW_CURVE.includes(nextChar)) svgLetters.push('desc.vw.alt');
        else if (X_CURVE.includes(nextChar)) svgLetters.push('desc.x.alt');
        else if (Z_CURVE.includes(nextChar)) svgLetters.push('desc.z.alt');
        else if (S_CURVE.includes(nextChar)) svgLetters.push('desc.s.alt');
        else if (O_CURVE.includes(nextChar)) svgLetters.push('desc.o.alt');
        else if (E_CURVE.includes(nextChar)) svgLetters.push('desc.e.alt');
        else if (ASC_CURVE.includes(nextChar)) svgLetters.push('desc.asc.alt');
        else if (S_HEIGHT_CURVE.includes(nextChar))
          svgLetters.push('desc.s.height');
      } else if (char === 'b') {
        if (CAPS_CURVE.includes(nextChar)) svgLetters.push('b.caps.alt');
        else if (ASC_CURVE.includes(nextChar)) svgLetters.push('b.l.alt');
        else if (DESC_CHARS.includes(nextChar)) svgLetters.push('b.desc.alt');
        else if (HK_CURVE.includes(nextChar)) svgLetters.push('b.hk.alt');
        else if (MN_CURVE.includes(nextChar)) svgLetters.push('b.mn.alt');
        else if (RS_CURVE.includes(nextChar)) svgLetters.push('b.rs.alt');
        else if (VW_CURVE.includes(nextChar)) svgLetters.push('b.vw.alt');
        else if (X_CURVE.includes(nextChar)) svgLetters.push('b.x.alt');
        else if (Z_CURVE.includes(nextChar)) svgLetters.push('b.z.alt');
        else if (S_CURVE.includes(nextChar)) svgLetters.push('b.s.alt');
        else if (O_CURVE.includes(nextChar)) svgLetters.push('b.o.alt');
        else if (E_CURVE.includes(nextChar)) svgLetters.push('b.e.alt');
        else if (S_HEIGHT_CURVE.includes(nextChar))
          svgLetters.push('b.s.height');
      }
    } else if (!prevChar && !nextChar) {
      svgLetters.push(`${char}.base`);
    }
  }

  return svgLetters;
};

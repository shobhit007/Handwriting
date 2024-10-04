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
const DESC_CHARS = 'jgy';
const HK_CURVE = 'hk';
const MN_CURVE = 'mn';
const RS_CURVE = 'rs';
const VW_CURVE = 'vw';
const X_CURVE = 'x';
const Z_CURVE = 'z';
const S_CURVE = 's';
const O_CURVE = 'o';
const CAPS_CURVE = 'acdgq';
const E_CURVE = 'e';
const S_HEIGHT_CURVE = 'ijptuy';
const ASC_CURVE = 'bfl';

const createConnections = (char, nextChar) => {
  const connections = [];
  if (BASELINE_CHARS.includes(char)) {
    if (CAPS_CURVE.includes(nextChar)) connections.push('a.alt.caps');
    else if (nextChar === 'f') connections.push('a.f.alt');
    else if (ASC_CURVE.includes(nextChar)) connections.push('a.asc.alt');
    else if (HK_CURVE.includes(nextChar)) connections.push('a.hk.alt');
    else if (MN_CURVE.includes(nextChar)) connections.push('a.mn.alt');
    else if (RS_CURVE.includes(nextChar)) connections.push('a.rs.alt');
    else if (VW_CURVE.includes(nextChar)) connections.push('a.vw.alt');
    else if (X_CURVE.includes(nextChar)) connections.push('a.x.alt');
    else if (Z_CURVE.includes(nextChar)) connections.push('a.z.alt');
    else if (S_CURVE.includes(nextChar)) connections.push('a.s.alt');
    else if (O_CURVE.includes(nextChar)) connections.push('a.o.alt');
    else if (E_CURVE.includes(nextChar)) connections.push('a.e.alt');
    else if (S_HEIGHT_CURVE.includes(nextChar)) connections.push('a.s.height');
  } else if (char === 'f') {
    if (CAPS_CURVE.includes(nextChar)) connections.push('f.caps.alt');
    else if (HK_CURVE.includes(nextChar)) connections.push('f.hk.alt');
    else if (MN_CURVE.includes(nextChar)) connections.push('f.mn.alt');
    else if (RS_CURVE.includes(nextChar)) connections.push('f.rs.alt');
    else if (VW_CURVE.includes(nextChar)) connections.push('f.vw.alt');
    else if (X_CURVE.includes(nextChar)) connections.push('f.x.alt');
    else if (Z_CURVE.includes(nextChar)) connections.push('f.z.alt');
    else if (S_CURVE.includes(nextChar)) connections.push('f.s.alt');
    else if (O_CURVE.includes(nextChar)) connections.push('f.o.alt');
    else if (E_CURVE.includes(nextChar)) connections.push('f.e.alt');
    else if (ASC_CURVE.includes(nextChar)) connections.push('f.asc.alt');
    else if (S_HEIGHT_CURVE.includes(nextChar)) connections.push('f.s.height');
  } else if (DESC_CHARS.includes(char)) {
    if (CAPS_CURVE.includes(nextChar)) connections.push('desc.caps.alt');
    else if (HK_CURVE.includes(nextChar)) connections.push('desc.hk.alt');
    else if (MN_CURVE.includes(nextChar)) connections.push('desc.mn.alt');
    else if (RS_CURVE.includes(nextChar)) connections.push('desc.rs.alt');
    else if (VW_CURVE.includes(nextChar)) connections.push('desc.vw.alt');
    else if (X_CURVE.includes(nextChar)) connections.push('desc.x.alt');
    else if (Z_CURVE.includes(nextChar)) connections.push('desc.z.alt');
    else if (S_CURVE.includes(nextChar)) connections.push('desc.s.alt');
    else if (O_CURVE.includes(nextChar)) connections.push('desc.o.alt');
    else if (E_CURVE.includes(nextChar)) connections.push('desc.e.alt');
    else if (nextChar === 'f') connections.push('desc.f.alt');
    else if (ASC_CURVE.includes(nextChar)) connections.push('desc.asc.alt');
    else if (S_HEIGHT_CURVE.includes(nextChar))
      connections.push('desc.s.height');
  } else if (char === 'b') {
    if (CAPS_CURVE.includes(nextChar)) connections.push('b.caps.alt');
    else if (ASC_CURVE.includes(nextChar)) connections.push('b.asc.alt');
    else if (HK_CURVE.includes(nextChar)) connections.push('b.hk.alt');
    else if (MN_CURVE.includes(nextChar)) connections.push('b.mn.alt');
    else if (RS_CURVE.includes(nextChar)) connections.push('b.rs.alt');
    else if (VW_CURVE.includes(nextChar)) connections.push('b.vw.alt');
    else if (X_CURVE.includes(nextChar)) connections.push('b.x.alt');
    else if (Z_CURVE.includes(nextChar)) connections.push('b.z.alt');
    else if (O_CURVE.includes(nextChar)) connections.push('b.o.alt');
    else if (E_CURVE.includes(nextChar)) connections.push('b.e.alt');
    else if (S_HEIGHT_CURVE.includes(nextChar)) connections.push('b.s.height');
  } else if (char === 'e') {
    if (CAPS_CURVE.includes(nextChar)) connections.push('e.caps.alt');
    else if (ASC_CURVE.includes(nextChar)) connections.push('e.asc.alt');
    else if (HK_CURVE.includes(nextChar)) connections.push('e.hk.alt');
    else if (MN_CURVE.includes(nextChar)) connections.push('e.mn.alt');
    else if (RS_CURVE.includes(nextChar)) connections.push('e.rs.alt');
    else if (VW_CURVE.includes(nextChar)) connections.push('e.vw.alt');
    else if (X_CURVE.includes(nextChar)) connections.push('e.x.alt');
    else if (Z_CURVE.includes(nextChar)) connections.push('e.z.alt');
    else if (O_CURVE.includes(nextChar)) connections.push('e.o.alt');
    else if (E_CURVE.includes(nextChar)) connections.push('e.e.alt');
    else if (S_HEIGHT_CURVE.includes(nextChar)) connections.push('e.s.height');
  } else if (char === 's') {
    if (CAPS_CURVE.includes(nextChar)) connections.push('s.caps.alt');
    else if (ASC_CURVE.includes(nextChar)) connections.push('s.asc.alt');
    else if (HK_CURVE.includes(nextChar)) connections.push('s.hk.alt');
    else if (MN_CURVE.includes(nextChar)) connections.push('s.mn.alt');
    else if (RS_CURVE.includes(nextChar)) connections.push('s.rs.alt');
    else if (VW_CURVE.includes(nextChar)) connections.push('s.vw.alt');
    else if (X_CURVE.includes(nextChar)) connections.push('s.x.alt');
    else if (Z_CURVE.includes(nextChar)) connections.push('s.z.alt');
    else if (O_CURVE.includes(nextChar)) connections.push('s.o.alt');
    else if (E_CURVE.includes(nextChar)) connections.push('s.e.alt');
    else if (S_HEIGHT_CURVE.includes(nextChar)) connections.push('s.s.height');
  } else if (char === 'o') {
    if (CAPS_CURVE.includes(nextChar)) connections.push('o.caps.alt');
    else if (ASC_CURVE.includes(nextChar)) connections.push('o.asc.alt');
    else if (HK_CURVE.includes(nextChar)) connections.push('o.hk.alt');
    else if (MN_CURVE.includes(nextChar)) connections.push('o.mn.alt');
    else if (RS_CURVE.includes(nextChar)) connections.push('o.rs.alt');
    else if (VW_CURVE.includes(nextChar)) connections.push('o.vw.alt');
    else if (X_CURVE.includes(nextChar)) connections.push('o.x.alt');
    else if (Z_CURVE.includes(nextChar)) connections.push('o.z.alt');
    else if (O_CURVE.includes(nextChar)) connections.push('o.o.alt');
    else if (E_CURVE.includes(nextChar)) connections.push('o.e.alt');
    else if (S_HEIGHT_CURVE.includes(nextChar)) connections.push('o.s.height');
  } else if (char === 'v' || char === 'w') {
    if (CAPS_CURVE.includes(nextChar)) connections.push('v.caps.alt');
    else if (ASC_CURVE.includes(nextChar)) connections.push('v.asc.alt');
    else if (HK_CURVE.includes(nextChar)) connections.push('v.hk.alt');
    else if (MN_CURVE.includes(nextChar)) connections.push('v.mn.alt');
    else if (RS_CURVE.includes(nextChar)) connections.push('v.rs.alt');
    else if (VW_CURVE.includes(nextChar)) connections.push('v.vw.alt');
    else if (X_CURVE.includes(nextChar)) connections.push('v.x.alt');
    else if (Z_CURVE.includes(nextChar)) connections.push('v.z.alt');
    else if (O_CURVE.includes(nextChar)) connections.push('v.o.alt');
    else if (E_CURVE.includes(nextChar)) connections.push('v.e.alt');
    else if (S_HEIGHT_CURVE.includes(nextChar)) connections.push('v.s.height');
  } else if (char === 'z') {
    if (CAPS_CURVE.includes(nextChar)) connections.push('z.caps.alt');
    else if (ASC_CURVE.includes(nextChar)) connections.push('z.asc.alt');
    else if (HK_CURVE.includes(nextChar)) connections.push('z.hk.alt');
    else if (MN_CURVE.includes(nextChar)) connections.push('z.mn.alt');
    else if (RS_CURVE.includes(nextChar)) connections.push('z.rs.alt');
    else if (VW_CURVE.includes(nextChar)) connections.push('z.vw.alt');
    else if (X_CURVE.includes(nextChar)) connections.push('z.x.alt');
    else if (Z_CURVE.includes(nextChar)) connections.push('z.z.alt');
    else if (O_CURVE.includes(nextChar)) connections.push('z.o.alt');
    else if (E_CURVE.includes(nextChar)) connections.push('z.e.alt');
    else if (S_HEIGHT_CURVE.includes(nextChar)) connections.push('z.s.height');
  } else if (char === 'q') {
    if (CAPS_CURVE.includes(nextChar)) connections.push('q.caps.alt');
    else if (nextChar === 'f') connections.push('q.f.alt');
    else if (ASC_CURVE.includes(nextChar)) connections.push('q.asc.alt');
    else if (HK_CURVE.includes(nextChar)) connections.push('q.hk.alt');
    else if (MN_CURVE.includes(nextChar)) connections.push('q.mn.alt');
    else if (RS_CURVE.includes(nextChar)) connections.push('q.rs.alt');
    else if (VW_CURVE.includes(nextChar)) connections.push('q.vw.alt');
    else if (X_CURVE.includes(nextChar)) connections.push('q.x.alt');
    else if (Z_CURVE.includes(nextChar)) connections.push('q.z.alt');
    else if (O_CURVE.includes(nextChar)) connections.push('q.o.alt');
    else if (E_CURVE.includes(nextChar)) connections.push('q.e.alt');
    else if (S_HEIGHT_CURVE.includes(nextChar)) connections.push('q.s.height');
  }

  return connections;
};

export const generateLetterToSVG = str => {
  const strArr = str.split('');
  const svgLetters = [];

  for (let i = 0; i < strArr.length; i++) {
    let char = strArr[i];
    let nextChar = strArr[i + 1];
    let prevChar = i > 0 ? strArr[i - 1] : null;

    let letterObj = {
      letter: char,
      svgs: [],
    };

    if (prevChar && !nextChar) {
      if (char === 'a' || char === 'd') {
        letterObj.svgs.push({type: `${char}.base`});
      } else {
        letterObj.svgs.push({type: `${char}.right`});
      }
    } else if (!prevChar && nextChar) {
      if (nextChar === 'e') {
        if (['g', 'j', 'y'].includes(char)) {
          letterObj.svgs.push({type: `${char}.e.left`});
        } else {
          letterObj.svgs.push({type: `${char}.left`});
        }
      } else {
        letterObj.svgs.push({type: `${char}.left`});
      }
      createConnections(char, nextChar).forEach(connection => {
        letterObj.svgs.push({type: connection});
      });
    } else if (prevChar && nextChar) {
      if (prevChar === 'f' && char === 'f') {
        letterObj.svgs.push({type: 'f.f.alt'});
      } else if (nextChar === 'e') {
        if (['g', 'j', 'y'].includes(char)) {
          letterObj.svgs.push({type: `${char}.e.alt`});
        } else {
          letterObj.svgs.push({type: `${char}.alt`});
        }
      } else {
        letterObj.svgs.push({type: `${char}.alt`});
      }
      createConnections(char, nextChar).forEach(connection => {
        letterObj.svgs.push({type: connection});
      });
    } else if (!prevChar && !nextChar) {
      letterObj.svgs.push({type: `${char}.base`});
    }

    svgLetters.push(letterObj);
  }

  return svgLetters;
};

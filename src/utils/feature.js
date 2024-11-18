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
  const specialSVGTypes = [
    'StandLine', 'Sleeping', 'RightSlant', 'LeftSlant', 'CCurve', 'ReverseCurve', 
    'UpwardCurve', 'DownWardCurve', 'MountainSlant', 'DownWardLoop', 
    'UpAndDownLoopJoining', 'Sconnection', 'CurlySlant', 'UpwardLoop', 
    'DownWardLoop', 'CurvedConnection', 'MountainConnection', 
    'UpwardCurveConnection', 'DownwardCurveConnection', 'UpwardLoopJoining'
  ];
  if (specialSVGTypes.includes(str)) {
    svgLetters.push({letter: str, svgs: [{type: str}]})
  }else {
    for (let i = 0; i < strArr.length; i++) {
      let char = strArr[i];
      let nextChar = strArr[i + 1];
      let prevChar = i > 0 ? strArr[i - 1] : null;
  
      let letterObj = {
        letter: char,
        svgs: [],
      };
      // if(specialSVGTypes.includes(char)){
      //   letterObj.svgs.push({type: `${char}.right`})
      // }else 
      if (prevChar && !nextChar) {
        if (char === 'a' || char === 'd') {
          letterObj.svgs.push({type: `${char}.right`});
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
  }

  return svgLetters;
};

export const audioData = {
  a: [
    {
      audio:
        'https://storage.googleapis.com/younglabs-uat.appspot.com/YLHCourses/EngPrint_HW/a/English/mainScriptSegment/Segment0/audioBlob',
    },
    {
      audio:
        'https://storage.googleapis.com/younglabs-uat.appspot.com/YLHCourses/EngPrint_HW/a/English/mainScriptSegment/Segment1/audioBlob',
    },
    {
      audio:
        'https://storage.googleapis.com/younglabs-uat.appspot.com/YLHCourses/EngPrint_HW/a/English/mainScriptSegment/Segment2/audioBlob',
    },
  ],
  b: [
    {
      audio:
        'https://storage.googleapis.com/younglabs-uat.appspot.com/YLHCourses/EngPrint_HW/b/English/mainScriptSegment/Segment0/audioBlob',
    },
    {
      audio:
        'https://storage.googleapis.com/younglabs-uat.appspot.com/YLHCourses/EngPrint_HW/b/English/mainScriptSegment/Segment1/audioBlob',
    },
  ],
  c: [
    {
      audio:
        'https://firebasestorage.googleapis.com/v0/b/younglabs-uat.appspot.com/o/voice%2Fc%2Fc_1.mp3?alt=media&token=23474fca-504f-446e-a8ae-288f94a52eb8',
    },
    {
      audio:
        'https://firebasestorage.googleapis.com/v0/b/younglabs-uat.appspot.com/o/voice%2Fc%2Fc_2.mp3?alt=media&token=cdaf2026-1987-4ce2-ba1b-8b2b08189c6b',
    },
    // {
    //   audio:
    //     'https://storage.googleapis.com/younglabs-uat.appspot.com/YLHCourses/EngPrint_HW/c/English/mainScriptSegment/Segment0/audioBlob',
    // },
    // {
    //   audio:
    //     'https://storage.googleapis.com/younglabs-uat.appspot.com/YLHCourses/EngPrint_HW/c/English/mainScriptSegment/Segment1/audioBlob',
    // },
  ],
  d: [
    {
      audio:
        'https://firebasestorage.googleapis.com/v0/b/younglabs-uat.appspot.com/o/voice%2Fd%2Fd_1.mp3?alt=media&token=36e6fed4-1f00-44e0-8d85-4d7fb47db896',
    },
    {
      audio:
        'https://firebasestorage.googleapis.com/v0/b/younglabs-uat.appspot.com/o/voice%2Fd%2Fd_2.mp3?alt=media&token=734dedbb-9b38-49f1-89e5-0c7476d66e38',
    },
    {
      audio:
        'https://firebasestorage.googleapis.com/v0/b/younglabs-uat.appspot.com/o/voice%2Fd%2Fd_3.mp3?alt=media&token=78960542-b49c-4bb8-a15f-ed3522bdce14',
    },
  ],
  e: [
    {
      audio:
        'https://firebasestorage.googleapis.com/v0/b/younglabs-uat.appspot.com/o/voice%2Fe%2Fe_1.mp3?alt=media&token=5c30b0ce-5fef-449e-aa85-f6e727193649',
    },
    {
      audio:
        'https://firebasestorage.googleapis.com/v0/b/younglabs-uat.appspot.com/o/voice%2Fe%2Fe_2.mp3?alt=media&token=211f51b4-41f7-4200-af43-4f9287a26551',
    },
  ],
  f: [
    {
      audio:
        'https://firebasestorage.googleapis.com/v0/b/younglabs-uat.appspot.com/o/voice%2Ff%2Ff_1.mp3?alt=media&token=8204dbfc-c9b5-4fb1-b332-ae85db94ac9f',
    },
    {
      audio:
        'https://firebasestorage.googleapis.com/v0/b/younglabs-uat.appspot.com/o/voice%2Ff%2Ff_2_1.mp3?alt=media&token=8f927459-3918-46ec-a6fd-f885b3f5781c',
    },
  ],
  g: [
    {
      audio:
        'https://firebasestorage.googleapis.com/v0/b/younglabs-uat.appspot.com/o/voice%2Fg%2Fg_1.mp3?alt=media&token=146e02e5-b736-4ca3-9a91-dc43bf13763f',
    },
    {
      audio:
        'https://firebasestorage.googleapis.com/v0/b/younglabs-uat.appspot.com/o/voice%2Fg%2Fg_2.mp3?alt=media&token=e9f11139-3999-434d-a859-209f236ed90a',
    },
  ],
  h: [
    {
      audio:
        'https://firebasestorage.googleapis.com/v0/b/younglabs-uat.appspot.com/o/voice%2Fh%2Fh_1.mp3?alt=media&token=cdd0159d-d256-4057-bfeb-0c24cade0526',
    },
    {
      audio:
        'https://firebasestorage.googleapis.com/v0/b/younglabs-uat.appspot.com/o/voice%2Fh%2Fh_2.mp3?alt=media&token=a7e49214-2f67-4200-ab9b-2656753124a8',
    },
    {
      audio:
        'https://firebasestorage.googleapis.com/v0/b/younglabs-uat.appspot.com/o/voice%2Fh%2Fh_3.mp3?alt=media&token=25c25178-fc24-4306-bbaf-290581d8e58e',
    },
  ],
  i: [
    {
      audio:
        'https://firebasestorage.googleapis.com/v0/b/younglabs-uat.appspot.com/o/voice%2Fi%2Fi_1.mp3?alt=media&token=2c76b4fc-0860-4c74-bfba-bbb056dd23a4',
    },
    {
      audio:
        'https://firebasestorage.googleapis.com/v0/b/younglabs-uat.appspot.com/o/voice%2Fi%2Fi_2.mp3?alt=media&token=7c25dce4-44c1-482c-b472-97382faa10ea',
    },
    {
      audio:
        'https://firebasestorage.googleapis.com/v0/b/younglabs-uat.appspot.com/o/voice%2Fj%2Fj_3.mp3?alt=media&token=7d3b2c04-7700-4095-8614-8520f054c218',
    },
  ],
  j: [
    {
      audio:
        'https://firebasestorage.googleapis.com/v0/b/younglabs-uat.appspot.com/o/voice%2Fj%2Fj_1.mp3?alt=media&token=a84efa1c-0381-42a9-8c0c-a498211e1f5b',
    },
    {
      audio:
        'https://firebasestorage.googleapis.com/v0/b/younglabs-uat.appspot.com/o/voice%2Fj%2Fj_2.mp3?alt=media&token=2fb9e02e-7afa-425a-a0b1-521a5dae7b69',
    },
    {
      audio:
        'https://firebasestorage.googleapis.com/v0/b/younglabs-uat.appspot.com/o/voice%2Fj%2Fj_3.mp3?alt=media&token=7d3b2c04-7700-4095-8614-8520f054c218',
    },
  ],
  k: [
    {
      audio:
        'https://storage.googleapis.com/younglabs-uat.appspot.com/YLHCourses/EngPrint_HW/f/English/mainScriptSegment/Segment0/audioBlob',
    },
    {
      audio:
        'https://storage.googleapis.com/younglabs-uat.appspot.com/YLHCourses/EngPrint_HW/f/English/mainScriptSegment/Segment1/audioBlob',
    },
  ],
  l: [
    {
      audio:
        'https://firebasestorage.googleapis.com/v0/b/younglabs-uat.appspot.com/o/voice%2Fl%2Fl_1.mp3?alt=media&token=43ffa3f5-b083-4443-9bd2-d6e4f8291ce1',
    },
    {
      audio:
        'https://firebasestorage.googleapis.com/v0/b/younglabs-uat.appspot.com/o/voice%2Fl%2Fl_2.mp3?alt=media&token=78f2fe9d-2d1d-480d-adb5-cb3392247675',
    },
  ],
  m: [
    {
      audio:
        'https://storage.googleapis.com/younglabs-uat.appspot.com/YLHCourses/EngPrint_HW/f/English/mainScriptSegment/Segment0/audioBlob',
    },
    {
      audio:
        'https://storage.googleapis.com/younglabs-uat.appspot.com/YLHCourses/EngPrint_HW/f/English/mainScriptSegment/Segment1/audioBlob',
    },
  ],
  n: [
    {
      audio:
        'https://firebasestorage.googleapis.com/v0/b/younglabs-uat.appspot.com/o/voice%2Fn%2Fn_1.mp3?alt=media&token=4b9c7402-cba4-4447-bc23-dfa77d7513e1',
    },
    {
      audio:
        'https://firebasestorage.googleapis.com/v0/b/younglabs-uat.appspot.com/o/voice%2Fn%2Fn_2.mp3?alt=media&token=ba0b7789-9371-4b5b-ab97-03c0e7e43827',
    },
  ],
  o: [
    {
      audio:
        'https://firebasestorage.googleapis.com/v0/b/younglabs-uat.appspot.com/o/voice%2Fo%2Fo_1.mp3?alt=media&token=b9d2ac51-ecc0-4627-92ad-6e223d7ad457',
    },
    {
      audio:
        'https://firebasestorage.googleapis.com/v0/b/younglabs-uat.appspot.com/o/voice%2Fo%2Fo_2.mp3?alt=media&token=bede47e4-b87e-4444-8441-b90980305366',
    },
  ],
  p: [
    {
      audio:
        'https://storage.googleapis.com/younglabs-uat.appspot.com/YLHCourses/EngPrint_HW/f/English/mainScriptSegment/Segment0/audioBlob',
    },
    {
      audio:
        'https://storage.googleapis.com/younglabs-uat.appspot.com/YLHCourses/EngPrint_HW/f/English/mainScriptSegment/Segment1/audioBlob',
    },
  ],
  q: [
    {
      audio:
        'https://storage.googleapis.com/younglabs-uat.appspot.com/YLHCourses/EngPrint_HW/f/English/mainScriptSegment/Segment0/audioBlob',
    },
    {
      audio:
        'https://storage.googleapis.com/younglabs-uat.appspot.com/YLHCourses/EngPrint_HW/f/English/mainScriptSegment/Segment1/audioBlob',
    },
  ],
  r: [
    {
      audio:
        'https://firebasestorage.googleapis.com/v0/b/younglabs-uat.appspot.com/o/voice%2Fr%2Fr_1.mp3?alt=media&token=cc4e7411-d8bc-4ad6-90c2-0c5254b52e18',
    },
    {
      audio:
        'https://firebasestorage.googleapis.com/v0/b/younglabs-uat.appspot.com/o/voice%2Fr%2Fr_2.mp3?alt=media&token=96d09a7c-24e2-4fb0-94dd-ee25bb6e4893',
    },
  ],
  s: [
    {
      audio:
        'https://firebasestorage.googleapis.com/v0/b/younglabs-uat.appspot.com/o/voice%2Fs%2Fs_1.mp3?alt=media&token=281eb108-9dcb-4e18-ac57-f152107fa224',
    },
    {
      audio:
        'https://firebasestorage.googleapis.com/v0/b/younglabs-uat.appspot.com/o/voice%2Fs%2Fs_2.mp3?alt=media&token=0a6f7c76-0576-4eb3-9992-e4ddfa0668c6',
    },
  ],
  t: [
    {
      audio:
        'https://firebasestorage.googleapis.com/v0/b/younglabs-uat.appspot.com/o/voice%2Ft%2Ft_1.mp3?alt=media&token=69cbe9de-4054-418f-aa52-294365cec861',
    },
    {
      audio:
        'https://firebasestorage.googleapis.com/v0/b/younglabs-uat.appspot.com/o/voice%2Ft%2Ft_2.mp3?alt=media&token=35b5db78-a40e-4189-8405-97c4e6ce2aa5',
    },
    {
      audio:
        'https://firebasestorage.googleapis.com/v0/b/younglabs-uat.appspot.com/o/voice%2Ft%2Ft_3.mp3?alt=media&token=fc50bb3b-21f7-48bd-94fd-c8b5d749aeff',
    },
  ],
  u: [
    {
      audio:
        'https://storage.googleapis.com/younglabs-uat.appspot.com/YLHCourses/EngPrint_HW/f/English/mainScriptSegment/Segment0/audioBlob',
    },
    {
      audio:
        'https://storage.googleapis.com/younglabs-uat.appspot.com/YLHCourses/EngPrint_HW/f/English/mainScriptSegment/Segment1/audioBlob',
    },
  ],
  v: [
    {
      audio:
        'https://firebasestorage.googleapis.com/v0/b/younglabs-uat.appspot.com/o/voice%2Fv%2Fv_1.mp3?alt=media&token=d089149e-3aa7-487a-9c1d-286c5f85a450',
    },
  ],
  w: [
    {
      audio:
        'https://storage.googleapis.com/younglabs-uat.appspot.com/YLHCourses/EngPrint_HW/f/English/mainScriptSegment/Segment0/audioBlob',
    },
    {
      audio:
        'https://storage.googleapis.com/younglabs-uat.appspot.com/YLHCourses/EngPrint_HW/f/English/mainScriptSegment/Segment1/audioBlob',
    },
  ],
  x: [
    {
      audio:
        'https://storage.googleapis.com/younglabs-uat.appspot.com/YLHCourses/EngPrint_HW/f/English/mainScriptSegment/Segment0/audioBlob',
    },
    {
      audio:
        'https://storage.googleapis.com/younglabs-uat.appspot.com/YLHCourses/EngPrint_HW/f/English/mainScriptSegment/Segment1/audioBlob',
    },
  ],
  y: [
    {
      audio:
        'https://firebasestorage.googleapis.com/v0/b/younglabs-uat.appspot.com/o/voice%2Fy%2Fy_1.mp3?alt=media&token=47979b60-1eb8-4ea1-ab03-7277554cadc5',
    },
    {
      audio:
        'https://firebasestorage.googleapis.com/v0/b/younglabs-uat.appspot.com/o/voice%2Fy%2Fy_2.mp3?alt=media&token=0423f97b-111c-43ef-854a-72ac3c8fefdd',
    },
  ],
  z: [
    {
      audio:
        'https://firebasestorage.googleapis.com/v0/b/younglabs-uat.appspot.com/o/voice%2Fz%2Fz_1.mp3?alt=media&token=b3bd0f0f-b237-4e6d-92a2-31c491769925',
    },
  ],
};

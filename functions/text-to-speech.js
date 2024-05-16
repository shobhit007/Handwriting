import base64 from 'react-native-base64';
import {OPENAI_KEY} from '@env';
import RNFS from 'react-native-fs';

//get audio url convert it to file
export const TextToSpeech = async ({setAudioSrc, audioUrl}) => {
  try {
    const audioBuffer = `data:audio/mpeg;base64,${audioUrl}`;
    const binary = base64.decode(audioBuffer.split(',')[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }

    // Write the base64 string to a file.
    const path = `${RNFS.DocumentDirectoryPath}/audio.mp3`;
    await RNFS.writeFile(path, audioUrl, 'base64');

    setAudioSrc(path);
  } catch (error) {
    console.error('Error fetching speech audio:', error);
  }
};

//generate audio using openai
// export const TextToSpeech = async ({setAudioSrc, audioUrl}) => {
//   try {
//     const response = await fetch('https://api.openai.com/v1/audio/speech', {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${OPENAI_KEY.replaceAll("'", '')}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         model: 'tts-1',
//         voice: 'shimmer',
//         input: textScript,
//       }),
//     });

//     console.log('check whats in response openai function', response);
//     if (!response.ok) {
//       throw new Error('Failed to fetch audio response not ok');
//     }

//     const arrayBuffer = await response.arrayBuffer();
//     // console.log('check whats in arrayBuffer openai function', arrayBuffer);
//     const base64Audio = base64.encode(
//       new Uint8Array(arrayBuffer).reduce(
//         (data, byte) => data + String.fromCharCode(byte),
//         '',
//       ),
//     );
//     console.log('check whats in base64Audio openai function', base64Audio);
//     const audioBuffer = `data:audio/mpeg;base64,${base64Audio}`;
//     // console.log('check whats in audioBuffer openai function', audioBuffer);
//     const binary = base64.decode(audioBuffer.split(',')[1]);
//     // console.log('check whats in binary openai function', binary);
//     const array = [];
//     for (let i = 0; i < binary.length; i++) {
//       array.push(binary.charCodeAt(i));
//     }
//     // console.log('check whats in array openai function', array);

//     // Write the base64 string to a file.
//     const path = `${RNFS.DocumentDirectoryPath}/audio.mp3`;
//     // console.log('check whats in path openai function', path);
//     await RNFS.writeFile(path, base64Audio, 'base64');

//     setAudioSrc(path);
//   } catch (error) {
//     console.error('Error fetching speech audio:', error);
//   }
// };

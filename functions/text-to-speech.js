import base64 from 'react-native-base64';
import {OPENAI_KEY} from '@env';


export const TextToSpeech = async ({setAudioSrc}) => {
  try {
    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_KEY.replaceAll("'", '')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'tts-1',
        voice: 'alloy',
        input: 'Hello, this is a test message.',
      }),
    });

    // console.log('check response of audio', response);
    if (!response.ok) {
      throw new Error('Failed to fetch audio response not ok');
    }

    const arrayBuffer = await response.arrayBuffer();
    const base64Audio = base64.encode(
      new Uint8Array(arrayBuffer).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        '',
      ),
    );
    const audioUrl = `data:audio/mpeg;base64,${base64Audio}`;
    // console.log('check audioUrl in function', audioUrl);
    setAudioSrc(audioUrl);
  } catch (error) {
    console.error('Error fetching speech audio:', error);
  }
};

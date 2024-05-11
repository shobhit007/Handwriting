import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Svg, Path, Line, Circle, Text} from 'react-native-svg';
import Notebook from './components/Notebook';
import LetterA from './components/LetterA';

const viewPortWidth = 300;
const viewPortHeight = 120;
const strokeWidth = 3;

const App = () => {
  const pathRef = useRef();
  const svgRef = useRef();
  const [pathScale, setPathScale] = useState(null);

  useEffect(() => {
    if (svgRef.current) {
      const dimensions = getPathDimensions();
      console.log('dimensions', dimensions);
      const scaleX = viewPortWidth / dimensions.width;
      const scaleY = viewPortHeight / dimensions.height;
      console.log(scaleX, scaleY);
      const scale = Math.min(scaleX, scaleY);
      setPathScale({x: scaleX, y: scaleY});
    }
  }, [svgRef.current]);

  const getPathDimensions = () => {
    if (pathRef.current) {
      const pathLength = pathRef.current.getTotalLength();
      const pathCoordinates = Array.from({length: pathLength}, (_, i) =>
        pathRef.current.getPointAtLength(i),
      );
      const minX = Math.min(...pathCoordinates.map(point => point.x));
      const minY = Math.min(...pathCoordinates.map(point => point.y));
      const maxX = Math.max(...pathCoordinates.map(point => point.x));
      const maxY = Math.max(...pathCoordinates.map(point => point.y));
      const width = maxX - minX;
      const height = maxY - minY;
      return {width, height};
    }
  };

  return (
    <View style={styles.container}>
      {/* <Notebook lines={2} gap={50}>
      </Notebook> */}
      <LetterA />
    </View>
  );
};

// tree
{
  /* <svg width="91" height="42" viewBox="0 0 91 42" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.368 40.48C6.384 40.48 4.976 39.808 4.144 38.464C3.312 37.12 2.896 35.456 2.896 33.472C2.896 31.04 3.312 28.512 4.144 25.888C4.976 23.2 5.872 20.992 6.832 19.264H6.256C4.016 19.264 2.512 19.104 1.744 18.784C1.04 18.4 0.688 17.792 0.688 16.96C0.688 16.512 1.04 16.288 1.744 16.288L7.888 16.672C9.488 13.472 11.088 10.496 12.688 7.744C14.352 4.992 15.728 3.072 16.816 1.984C17.712 1.088 18.96 0.639997 20.56 0.639997C21.968 0.639997 22.672 0.927998 22.672 1.504C22.672 1.632 22.64 1.728 22.576 1.792L18.448 6.688C17.488 7.84 16.432 9.312 15.28 11.104C14.128 12.896 12.976 14.816 11.824 16.864C12.528 16.928 13.168 16.96 13.744 16.96C14.384 16.96 14.928 16.96 15.376 16.96C15.632 16.96 15.92 16.96 16.24 16.96C16.56 16.896 16.944 16.864 17.392 16.864H19.408C20.176 16.864 20.56 17.056 20.56 17.44C20.56 18.4 17.264 18.976 10.672 19.168C9.968 20.512 9.264 22.08 8.56 23.872C7.856 25.6 7.28 27.328 6.832 29.056C6.448 30.784 6.256 32.352 6.256 33.76C6.256 36.704 7.504 38.176 10 38.176C12.048 38.176 14.448 36.928 17.2 34.432C18.288 33.408 19.216 32.384 19.984 31.36C20.816 30.272 21.616 29.184 22.384 28.096C22.768 27.52 23.12 27.232 23.44 27.232C23.76 27.232 23.92 27.424 23.92 27.808C23.92 28.064 23.856 28.32 23.728 28.576C23.664 28.768 23.6 28.928 23.536 29.056C22.704 30.144 21.776 31.328 20.752 32.608C19.792 33.888 18.64 35.136 17.296 36.352C14.16 39.104 11.184 40.48 8.368 40.48ZM36.7068 41.536C34.5308 41.536 32.9948 40.96 32.0988 39.808C31.2668 38.656 30.8508 37.184 30.8508 35.392C30.8508 33.92 31.0748 32.384 31.5228 30.784C32.0348 29.12 32.6428 27.584 33.3468 26.176C34.0508 24.768 34.6588 23.648 35.1708 22.816C34.9788 22.88 34.7868 22.944 34.5948 23.008C34.4028 23.008 34.1788 23.008 33.9228 23.008C33.0268 23.008 32.0348 22.688 30.9468 22.048C29.7948 21.28 29.2188 20.48 29.2188 19.648C28.8348 20.544 28.2908 21.568 27.5868 22.72C26.9468 23.872 26.1788 25.12 25.2828 26.464C22.9148 30.176 21.3468 32.032 20.5788 32.032C20.3228 32.032 20.1948 31.904 20.1948 31.648C20.1948 31.392 20.3868 31.008 20.7708 30.496C21.9868 28.832 23.2028 26.912 24.4188 24.736C25.6988 22.56 26.9788 20.128 28.2588 17.44C28.1948 17.12 28.1308 16.8 28.0668 16.48C28.0668 16.16 28.0668 15.776 28.0668 15.328C28.0668 13.856 28.3548 12.16 28.9308 10.24C29.6348 7.808 30.4988 6.592 31.5228 6.592C32.1628 6.592 32.7708 7.168 33.3468 8.32C33.5388 8.768 33.6988 9.216 33.8268 9.664C33.9548 10.048 34.0188 10.464 34.0188 10.912C34.0188 12.448 32.7068 14.784 30.0828 17.92C30.6588 19.904 31.7788 20.896 33.4428 20.896C34.6588 20.896 35.7788 20.288 36.8028 19.072C37.8908 17.792 38.6588 17.152 39.1068 17.152C39.6828 17.152 40.1948 17.376 40.6428 17.824C41.0908 18.272 41.3148 18.848 41.3148 19.552C41.3148 19.488 40.8988 20.064 40.0668 21.28C39.2988 22.496 38.4028 24.192 37.3788 26.368C36.3548 28.544 35.6188 30.4 35.1708 31.936C34.7868 33.472 34.5948 34.848 34.5948 36.064C34.5948 38.304 35.6508 39.424 37.7628 39.424C39.8108 39.424 42.4028 37.856 45.5388 34.72C46.5628 33.632 47.7468 32.256 49.0908 30.592C50.7548 28.544 51.5868 27.52 51.5868 27.52C51.8428 27.52 51.9708 27.712 51.9708 28.096C51.9708 28.608 51.7788 29.152 51.3948 29.728C50.4988 31.136 49.5068 32.544 48.4188 33.952C47.3948 35.296 46.4348 36.384 45.5388 37.216C42.5948 40.096 39.6508 41.536 36.7068 41.536ZM56.2833 40.576C54.1713 40.576 52.3153 39.968 50.7153 38.752C49.1153 37.536 48.3153 35.488 48.3153 32.608C48.3153 30.88 48.6993 29.024 49.4673 27.04C50.2353 24.992 51.2593 23.072 52.5393 21.28C53.8833 19.488 55.3553 18.016 56.9553 16.864C58.5553 15.712 60.1873 15.136 61.8513 15.136C62.4913 15.136 63.0353 15.36 63.4833 15.808C63.9953 16.256 64.2513 16.928 64.2513 17.824C64.2513 19.808 62.7473 22.208 59.7393 25.024C58.5233 26.176 57.2433 27.2 55.8993 28.096C54.6193 28.992 53.4353 29.632 52.3473 30.016C52.0913 30.848 51.9633 31.808 51.9633 32.896C51.9633 34.368 52.3153 35.712 53.0193 36.928C53.7233 38.144 54.8433 38.752 56.3793 38.752C58.2993 38.752 60.0593 38.208 61.6593 37.12C63.2593 36.032 64.7313 34.72 66.0753 33.184C67.4193 31.584 68.6033 30.112 69.6273 28.768C70.0753 28.128 70.5233 27.808 70.9713 27.808C71.2273 27.808 71.3553 27.936 71.3553 28.192C71.3553 28.32 71.3233 28.48 71.2593 28.672C71.1953 28.8 71.1313 28.928 71.0673 29.056C69.9793 30.592 68.7313 32.256 67.3233 34.048C65.9153 35.84 64.3153 37.376 62.5233 38.656C60.7313 39.936 58.6513 40.576 56.2833 40.576ZM53.0193 28.096C54.6833 27.392 56.4113 26.144 58.2032 24.352C60.3153 22.304 61.3713 20.512 61.3713 18.976C61.3713 18.208 60.9873 17.824 60.2193 17.824C59.1953 17.824 57.7873 19.296 55.9953 22.24C54.3953 24.672 53.4033 26.624 53.0193 28.096ZM75.502 40.576C73.39 40.576 71.534 39.968 69.934 38.752C68.334 37.536 67.534 35.488 67.534 32.608C67.534 30.88 67.918 29.024 68.686 27.04C69.454 24.992 70.478 23.072 71.758 21.28C73.102 19.488 74.574 18.016 76.174 16.864C77.774 15.712 79.406 15.136 81.07 15.136C81.71 15.136 82.254 15.36 82.702 15.808C83.214 16.256 83.47 16.928 83.47 17.824C83.47 19.808 81.966 22.208 78.958 25.024C77.742 26.176 76.462 27.2 75.118 28.096C73.838 28.992 72.654 29.632 71.566 30.016C71.31 30.848 71.182 31.808 71.182 32.896C71.182 34.368 71.534 35.712 72.238 36.928C72.942 38.144 74.062 38.752 75.598 38.752C77.518 38.752 79.278 38.208 80.878 37.12C82.478 36.032 83.95 34.72 85.294 33.184C86.638 31.584 87.822 30.112 88.846 28.768C89.294 28.128 89.742 27.808 90.19 27.808C90.446 27.808 90.574 27.936 90.574 28.192C90.574 28.32 90.542 28.48 90.478 28.672C90.414 28.8 90.35 28.928 90.286 29.056C89.198 30.592 87.95 32.256 86.542 34.048C85.134 35.84 83.534 37.376 81.742 38.656C79.95 39.936 77.87 40.576 75.502 40.576ZM72.238 28.096C73.902 27.392 75.63 26.144 77.422 24.352C79.534 22.304 80.59 20.512 80.59 18.976C80.59 18.208 80.206 17.824 79.438 17.824C78.414 17.824 77.006 19.296 75.214 22.24C73.614 24.672 72.622 26.624 72.238 28.096Z" fill="black"/>
</svg> */
}

//Tyhgat
{
  /* <svg width="221" height="96" viewBox="0 0 221 96" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.16 73.416C6.408 73.416 4.296 72.616 2.824 71.016C1.352 69.416 0.616 67.048 0.616 63.912C0.616 61.096 1.128 57.64 2.152 53.544C3.24 49.384 4.584 45.128 6.184 40.776C5.544 40.648 4.936 40.552 4.36 40.488C3.784 40.36 3.24 40.2 2.728 40.008V38.28C3.24 38.344 3.848 38.408 4.552 38.472C5.256 38.536 6.056 38.6 6.952 38.664C8.296 35.208 9.736 31.88 11.272 28.68C12.808 25.416 14.312 22.536 15.784 20.04C17.32 17.48 18.76 15.464 20.104 13.992C21.512 12.456 22.696 11.688 23.656 11.688C24.168 11.688 24.616 11.88 25 12.264C25.448 12.584 25.672 13.096 25.672 13.8C25.672 14.888 25 16.68 23.656 19.176C22.312 21.608 20.648 24.52 18.664 27.912C16.68 31.304 14.76 34.984 12.904 38.952C13.48 38.952 14.056 38.952 14.632 38.952C15.272 38.952 15.88 38.952 16.456 38.952C18.568 38.952 20.776 38.92 23.08 38.856C25.448 38.792 27.816 38.632 30.184 38.376V40.104C26.664 40.488 23.496 40.776 20.68 40.968C17.928 41.16 15.464 41.256 13.288 41.256C13.032 41.256 12.776 41.256 12.52 41.256C12.328 41.256 12.104 41.256 11.848 41.256C10.376 44.648 9.128 48.136 8.104 51.72C7.08 55.304 6.568 58.792 6.568 62.184C6.568 64.936 6.984 66.92 7.816 68.136C8.648 69.288 10.024 69.864 11.944 69.864C15.272 69.864 18.536 68.392 21.736 65.448C24.936 62.504 27.752 58.504 30.184 53.448L31.432 54.408C29.896 57.992 27.944 61.224 25.576 64.104C23.272 66.984 20.712 69.256 17.896 70.92C15.08 72.584 12.168 73.416 9.16 73.416ZM32.503 95.88C30.903 95.88 29.495 95.432 28.279 94.536C27.063 93.704 26.455 92.456 26.455 90.792C26.455 88.744 26.967 86.92 27.991 85.32C29.015 83.72 30.391 82.248 32.119 80.904C33.847 79.56 35.831 78.28 38.071 77.064C40.311 75.848 42.647 74.632 45.079 73.416C45.975 71.048 46.871 68.424 47.767 65.544C48.727 62.6 49.623 59.368 50.455 55.848C48.407 59.176 46.199 62.056 43.831 64.488C41.527 66.856 39.063 68.04 36.439 68.04C35.223 68.04 34.007 67.784 32.791 67.272C31.639 66.696 30.679 65.832 29.911 64.68C29.143 63.528 28.759 62.056 28.759 60.264C28.759 58.472 29.047 56.392 29.623 54.024C30.263 51.656 31.031 49.352 31.927 47.112C32.823 44.872 33.751 43.016 34.711 41.544C35.671 40.072 36.503 39.336 37.207 39.336C37.463 39.336 37.911 39.432 38.551 39.624C39.255 39.816 39.895 40.104 40.471 40.488C41.111 40.808 41.431 41.16 41.431 41.544C40.855 42.376 40.215 43.56 39.511 45.096C38.807 46.632 38.103 48.36 37.399 50.28C36.759 52.136 36.215 53.96 35.767 55.752C35.319 57.544 35.095 59.08 35.095 60.36C35.095 61.512 35.351 62.44 35.863 63.144C36.375 63.848 37.271 64.2 38.551 64.2C39.767 64.2 41.111 63.624 42.583 62.472C44.119 61.256 45.623 59.72 47.095 57.864C48.631 56.008 50.039 54.024 51.319 51.912C51.511 51.208 51.671 50.504 51.799 49.8C51.991 49.032 52.151 48.264 52.279 47.496C52.471 46.6 52.919 45.576 53.623 44.424C54.391 43.208 55.575 42.6 57.175 42.6C57.495 42.6 57.815 42.632 58.135 42.696C58.455 42.696 58.807 42.76 59.191 42.888C59.191 43.912 58.871 45.832 58.231 48.648C57.655 51.4 56.791 54.632 55.639 58.344C54.551 62.056 53.239 65.864 51.703 69.768C54.711 68.616 57.655 66.728 60.535 64.104C63.415 61.416 65.751 57.864 67.543 53.448L68.791 54.408C67.831 57.48 66.359 60.168 64.375 62.472C62.455 64.712 60.279 66.664 57.847 68.328C55.415 69.928 53.015 71.272 50.647 72.36C48.983 76.456 47.159 80.296 45.175 83.88C43.255 87.464 41.207 90.344 39.031 92.52C36.919 94.76 34.743 95.88 32.503 95.88ZM32.023 92.808C32.983 92.808 34.583 91.528 36.823 88.968C39.127 86.472 41.559 82.056 44.119 75.72C41.495 77.128 39.063 78.504 36.823 79.848C34.583 81.256 32.791 82.76 31.447 84.36C30.103 85.96 29.431 87.816 29.431 89.928C29.431 90.44 29.623 91.048 30.007 91.752C30.391 92.456 31.063 92.808 32.023 92.808ZM70.1995 72.648C68.9835 72.648 68.0235 71.624 67.3195 69.576C66.6155 67.528 66.2635 65.224 66.2635 62.664C66.2635 59.592 66.7755 55.944 67.7995 51.72C68.8235 47.496 70.1675 43.048 71.8315 38.376C73.4955 33.704 75.3515 29.128 77.3995 24.648C79.5115 20.168 81.6555 16.104 83.8315 12.456C86.0075 8.808 88.0555 5.896 89.9755 3.72C91.8955 1.544 93.5595 0.455996 94.9675 0.455996C96.1195 0.455996 96.9195 1.16 97.3675 2.568C97.8795 3.912 98.1355 5.224 98.1355 6.504C98.1355 8.296 97.7195 10.472 96.8875 13.032C96.1195 15.592 95.0315 18.344 93.6235 21.288C92.2155 24.168 90.5835 27.016 88.7275 29.832C86.8715 32.648 84.8555 35.24 82.6795 37.608C80.5035 39.912 78.2955 41.736 76.0555 43.08C75.2875 44.936 74.6155 47.016 74.0395 49.32C73.5275 51.624 73.1435 53.896 72.8875 56.136C72.6315 58.312 72.5035 60.264 72.5035 61.992C72.5035 62.696 72.5035 63.304 72.5035 63.816C72.5675 64.328 72.6315 64.808 72.6955 65.256C73.5915 62.632 74.5515 60.104 75.5755 57.672C76.6635 55.176 77.8155 52.904 79.0315 50.856C80.2475 48.744 81.5275 46.92 82.8715 45.384C84.2795 43.784 85.7515 42.568 87.2875 41.736C88.8235 40.84 90.4555 40.392 92.1835 40.392C93.9755 40.392 95.3835 40.84 96.4075 41.736C97.4955 42.568 98.2635 43.656 98.7115 45C99.2235 46.28 99.4795 47.624 99.4795 49.032C99.4795 51.016 99.1275 52.936 98.4235 54.792C97.7835 56.648 97.1115 58.44 96.4075 60.168C95.7035 61.896 95.3515 63.56 95.3515 65.16C95.3515 66.44 95.6075 67.368 96.1195 67.944C96.6955 68.52 97.3995 68.808 98.2315 68.808C99.7035 68.808 101.336 68.104 103.128 66.696C104.984 65.288 106.808 63.432 108.6 61.128C110.392 58.76 111.928 56.2 113.208 53.448L114.456 54.6C113.112 57.736 111.48 60.584 109.56 63.144C107.64 65.64 105.528 67.624 103.224 69.096C100.92 70.568 98.5195 71.304 96.0235 71.304C93.8475 71.304 92.1835 70.728 91.0315 69.576C89.9435 68.424 89.3995 66.984 89.3995 65.256C89.3995 63.912 89.6555 62.408 90.1675 60.744C90.6795 59.08 91.1595 57.384 91.6075 55.656C92.1195 53.928 92.3755 52.296 92.3755 50.76C92.3755 49.096 92.0235 47.912 91.3195 47.208C90.6155 46.504 89.7515 46.152 88.7275 46.152C87.1275 46.152 85.6875 46.792 84.4075 48.072C83.1275 49.352 81.9435 51.016 80.8555 53.064C79.8315 55.048 78.8395 57.16 77.8795 59.4C76.9835 61.64 76.1195 63.784 75.2875 65.832C74.4555 67.816 73.6235 69.448 72.7915 70.728C71.9595 72.008 71.0955 72.648 70.1995 72.648ZM77.3035 39.336C79.0955 37.928 80.8235 36.136 82.4875 33.96C84.2155 31.784 85.8155 29.48 87.2875 27.048C88.7595 24.552 90.0715 22.12 91.2235 19.752C92.3755 17.384 93.2715 15.24 93.9115 13.32C94.5515 11.4 94.8715 9.96 94.8715 9C94.8715 8.68 94.8395 8.488 94.7755 8.424C94.7115 8.296 94.6155 8.232 94.4875 8.232C94.0395 8.232 93.1115 9.128 91.7035 10.92C90.3595 12.648 88.7915 14.984 86.9995 17.928C85.2075 20.872 83.4475 24.2 81.7195 27.912C79.9915 31.624 78.5195 35.432 77.3035 39.336ZM114.992 95.88C113.584 95.88 112.304 95.432 111.152 94.536C110 93.704 109.424 92.296 109.424 90.312C109.424 88.392 110.032 86.6 111.248 84.936C112.4 83.336 113.904 81.832 115.76 80.424C117.616 79.08 119.632 77.832 121.808 76.68C124.048 75.528 126.16 74.44 128.144 73.416C129.04 71.176 129.872 68.776 130.64 66.216C131.472 63.592 132.272 60.712 133.04 57.576C130.608 61.096 128.048 64.04 125.36 66.408C122.736 68.712 120.08 69.864 117.392 69.864C115.088 69.864 113.296 69 112.016 67.272C110.8 65.544 110.192 63.304 110.192 60.552C110.192 57.224 110.992 54.056 112.592 51.048C114.256 48.04 116.4 45.384 119.024 43.08C121.648 40.776 124.432 38.984 127.376 37.704C130.32 36.36 133.072 35.688 135.632 35.688C137.488 35.688 138.8 36.008 139.568 36.648C140.4 37.224 140.816 37.928 140.816 38.76C140.816 39.336 140.656 39.784 140.336 40.104C140.016 40.424 139.792 40.616 139.664 40.68C139.344 40.168 138.864 39.816 138.224 39.624C137.584 39.368 136.784 39.24 135.824 39.24C133.328 39.24 130.896 39.976 128.528 41.448C126.224 42.92 124.176 44.808 122.384 47.112C120.592 49.416 119.152 51.816 118.064 54.312C117.04 56.744 116.528 58.984 116.528 61.032C116.528 62.568 116.816 63.752 117.392 64.584C118.032 65.352 118.864 65.736 119.888 65.736C121.744 65.736 123.952 64.52 126.512 62.088C129.136 59.592 131.664 56.584 134.096 53.064C134.288 52.168 134.448 51.368 134.576 50.664C134.768 49.96 134.992 49.064 135.248 47.976C135.44 47.08 135.888 46.056 136.592 44.904C137.36 43.688 138.544 43.08 140.144 43.08C140.464 43.08 140.784 43.112 141.104 43.176C141.424 43.176 141.776 43.24 142.16 43.368C142.16 44.392 141.84 46.28 141.2 49.032C140.624 51.72 139.76 54.888 138.608 58.536C137.52 62.12 136.24 65.832 134.768 69.672C136.88 68.648 138.928 67.336 140.912 65.736C142.96 64.136 144.816 62.312 146.48 60.264C148.144 58.152 149.456 55.88 150.416 53.448L151.664 54.408C150.704 57.288 149.168 59.912 147.056 62.28C144.944 64.648 142.672 66.696 140.24 68.424C137.872 70.152 135.696 71.496 133.712 72.456C131.92 76.744 130.032 80.648 128.048 84.168C126.064 87.752 123.984 90.6 121.808 92.712C119.696 94.824 117.424 95.88 114.992 95.88ZM114.704 92.808C115.984 92.808 117.712 91.528 119.888 88.968C122.128 86.472 124.528 82.152 127.088 76.008C124.528 77.288 122.128 78.6 119.888 79.944C117.712 81.352 115.92 82.824 114.512 84.36C113.104 85.896 112.4 87.592 112.4 89.448C112.4 90.472 112.624 91.272 113.072 91.848C113.52 92.488 114.064 92.808 114.704 92.808ZM153.264 73.512C151.28 73.512 149.616 72.84 148.272 71.496C146.864 70.216 146.16 68.232 146.16 65.544C146.16 63.24 146.672 60.776 147.696 58.152C148.72 55.464 150.128 52.84 151.92 50.28C153.712 47.656 155.728 45.288 157.968 43.176C160.272 41 162.672 39.272 165.168 37.992C167.728 36.712 170.256 36.072 172.752 36.072C175.248 36.072 177.328 36.744 178.992 38.088C180.656 39.368 181.488 41.096 181.488 43.272C181.488 44.872 181.04 45.96 180.144 46.536C179.312 47.112 178.192 47.4 176.784 47.4C176.912 46.888 177.008 46.344 177.072 45.768C177.2 45.128 177.264 44.552 177.264 44.04C177.264 42.568 176.912 41.32 176.208 40.296C175.504 39.208 174.288 38.664 172.56 38.664C170.768 38.664 168.944 39.304 167.088 40.584C165.232 41.8 163.44 43.464 161.712 45.576C159.984 47.624 158.448 49.864 157.104 52.296C155.76 54.728 154.704 57.128 153.936 59.496C153.168 61.864 152.784 63.976 152.784 65.832C152.784 68.328 153.648 69.576 155.376 69.576C156.848 69.576 158.448 68.904 160.176 67.56C161.904 66.152 163.664 64.392 165.456 62.28C167.312 60.104 169.072 57.864 170.736 55.56C172.4 53.256 173.872 51.144 175.152 49.224C175.408 48.84 175.568 48.648 175.632 48.648C176.016 48.712 176.496 48.84 177.072 49.032C177.712 49.224 178.256 49.48 178.704 49.8C179.152 50.12 179.376 50.536 179.376 51.048C179.376 51.624 179.088 52.424 178.512 53.448C177.936 54.408 177.296 55.528 176.592 56.808C175.888 58.088 175.248 59.4 174.672 60.744C174.096 62.024 173.808 63.24 173.808 64.392C173.808 65.352 174.064 66.312 174.576 67.272C175.088 68.168 175.92 68.616 177.072 68.616C178.8 68.616 181.072 67.368 183.888 64.872C186.704 62.312 189.552 58.504 192.432 53.448L193.392 54.408C192.048 57.864 190.32 60.904 188.208 63.528C186.096 66.152 183.824 68.2 181.392 69.672C179.024 71.144 176.688 71.88 174.384 71.88C172.016 71.88 170.256 71.176 169.104 69.768C168.016 68.36 167.472 66.824 167.472 65.16C167.472 64.776 167.504 64.36 167.568 63.912C167.632 63.4 167.696 62.888 167.76 62.376C165.008 66.088 162.48 68.872 160.176 70.728C157.936 72.584 155.632 73.512 153.264 73.512ZM198.629 73.416C195.877 73.416 193.765 72.616 192.293 71.016C190.821 69.416 190.085 67.048 190.085 63.912C190.085 61.096 190.597 57.64 191.621 53.544C192.709 49.384 194.053 45.128 195.653 40.776C195.013 40.648 194.405 40.552 193.829 40.488C193.253 40.36 192.709 40.2 192.197 40.008V38.28C192.709 38.344 193.317 38.408 194.021 38.472C194.725 38.536 195.525 38.6 196.421 38.664C197.765 35.208 199.205 31.88 200.741 28.68C202.277 25.416 203.781 22.536 205.253 20.04C206.789 17.48 208.229 15.464 209.573 13.992C210.981 12.456 212.165 11.688 213.125 11.688C213.637 11.688 214.085 11.88 214.469 12.264C214.917 12.584 215.141 13.096 215.141 13.8C215.141 14.888 214.469 16.68 213.125 19.176C211.781 21.608 210.117 24.52 208.133 27.912C206.149 31.304 204.229 34.984 202.373 38.952C202.949 38.952 203.525 38.952 204.101 38.952C204.741 38.952 205.349 38.952 205.925 38.952C208.037 38.952 210.245 38.92 212.549 38.856C214.917 38.792 217.285 38.632 219.653 38.376V40.104C216.133 40.488 212.965 40.776 210.149 40.968C207.397 41.16 204.933 41.256 202.757 41.256C202.501 41.256 202.245 41.256 201.989 41.256C201.797 41.256 201.573 41.256 201.317 41.256C199.845 44.648 198.597 48.136 197.573 51.72C196.549 55.304 196.037 58.792 196.037 62.184C196.037 64.936 196.453 66.92 197.285 68.136C198.117 69.288 199.493 69.864 201.413 69.864C204.741 69.864 208.005 68.392 211.205 65.448C214.405 62.504 217.221 58.504 219.653 53.448L220.901 54.408C219.365 57.992 217.413 61.224 215.045 64.104C212.741 66.984 210.181 69.256 207.365 70.92C204.549 72.584 201.637 73.416 198.629 73.416Z" fill="black"/>
</svg> */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;

import React from 'react';
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  G,
  Path,
  Polygon,
  Rect,
} from 'react-native-svg';

const Pencil = props => (
  <Svg viewBox="0 0 48 48" {...props}>
    <Defs>
      <LinearGradient
        id="linear-gradient"
        x1="22.98"
        y1="23.9"
        x2="26.48"
        y2="28.27"
        gradientUnits="userSpaceOnUse">
        <Stop offset="0.04" stopColor="#fbb480" />
        <Stop offset="1" stopColor="#c27c4a" />
      </LinearGradient>

      <LinearGradient
        id="linear-gradient-2"
        x1="7.85"
        y1="35.07"
        x2="11.63"
        y2="39.53"
        href="#linear-gradient"
      />

      <LinearGradient
        id="linear-gradient-3"
        x1="7.26"
        y1="33.38"
        x2="12.14"
        y2="38.26"
        href="#linear-gradient"
      />

      <LinearGradient
        id="linear-gradient-4"
        x1="35.06"
        y1="9.61"
        x2="41.75"
        y2="16.3"
        href="#linear-gradient"
      />

      <LinearGradient
        id="linear-gradient-5"
        x1="32.45"
        y1="6.23"
        x2="41.29"
        y2="17.91"
        href="#linear-gradient"
      />

      <LinearGradient
        id="linear-gradient-6"
        x1="17.07"
        y1="22.56"
        x2="22.48"
        y2="27.98"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(21.95 -5.88) rotate(44.99)">
        <Stop offset="0.01" stopColor="#ffdc2e" />
        <Stop offset="1" stopColor="#f79139" />
      </LinearGradient>

      <LinearGradient
        id="linear-gradient-7"
        x1="22.57"
        y1="28.06"
        x2="26.35"
        y2="31.84"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(28.21 -8.47) rotate(45)">
        <Stop offset="0.01" stopColor="#f46000" />
        <Stop offset="1" stopColor="#de722c" />
      </LinearGradient>

      <LinearGradient
        id="linear-gradient-8"
        x1="20.21"
        y1="25.7"
        x2="24.85"
        y2="30.35"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(25.08 -7.17) rotate(45)">
        <Stop offset="0.01" stopColor="#f99d46" />
        <Stop offset="1" stopColor="#f46000" />
      </LinearGradient>

      <LinearGradient
        id="linear-gradient-9"
        x1="34.09"
        y1="17.69"
        x2="36.35"
        y2="19.95"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(23.66 -19.41) rotate(44.98)">
        <Stop offset="0.01" stopColor="#a1a1a1" />
        <Stop offset="1" stopColor="#828282" />
      </LinearGradient>

      <LinearGradient
        id="linear-gradient-10"
        x1="27.79"
        y1="11.39"
        x2="30.61"
        y2="14.22"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(17.4 -16.81) rotate(44.98)">
        <Stop offset="0.01" stopColor="#fafafa" />
        <Stop offset="1" stopColor="#dedede" />
      </LinearGradient>

      <LinearGradient
        id="linear-gradient-11"
        x1="30.43"
        y1="14.03"
        x2="34.61"
        y2="18.21"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(20.55 -18.12) rotate(45)">
        <Stop offset="0.01" stopColor="#d4d4d4" />
        <Stop offset="1" stopColor="#a6a6a6" />
      </LinearGradient>

      <LinearGradient
        id="linear-gradient-12"
        x1="33.9"
        y1="17.5"
        x2="36.13"
        y2="19.73"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(23.67 -19.41) rotate(44.99)">
        <Stop offset="0.01" stopColor="#b2b2b2" />
        <Stop offset="1" stopColor="#939393" />
      </LinearGradient>

      <LinearGradient
        id="linear-gradient-13"
        x1="28.07"
        y1="11.67"
        x2="30.21"
        y2="13.81"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(17.41 -16.82) rotate(44.99)">
        <Stop offset="0.01" stopColor="#fafafa" />
        <Stop offset="1" stopColor="#efefef" />
      </LinearGradient>

      <LinearGradient
        id="linear-gradient-14"
        x1="30.39"
        y1="14"
        x2="34.73"
        y2="18.34"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(20.55 -18.12) rotate(45)">
        <Stop offset="0.01" stopColor="#e5e5e5" />
        <Stop offset="1" stopColor="#b7b7b7" />
      </LinearGradient>
    </Defs>

    <G id="icons">
      <G id="Layer_3" data-name="Layer 3">
        <Path
          fill="url(#linear-gradient)"
          d="M41.43,11.27,36.61,6.46a2.8,2.8,0,0,0-4,0L8,31.06,6.27,38.73l3.06,3.06,7.49-1.94,24.61-24.6A2.83,2.83,0,0,0,41.43,11.27Z"
        />
        <Polygon
          fill="url(#linear-gradient-2)"
          points="7.24 39.7 10.56 33.59 14.29 37.32 8.19 40.65 7.24 39.7"
        />
        <Polygon
          fill="url(#linear-gradient-3)"
          points="9.33 41.78 16.82 39.85 18.45 38.23 14.29 37.32 8.19 40.65 9.33 41.78"
        />
        <Path
          fill="#666"
          d="M7.33,42.3l2-.51L6.27,38.73s-.21.91-.46,2S6.23,42.58,7.33,42.3Z"
        />
        <Path
          fill="url(#linear-gradient-4)"
          d="M41.43,11.27,36.61,6.46a2.8,2.8,0,0,0-4,0L29.92,9.17l2.53,2.53,3.73,3.73L38.71,18l2.72-2.71A2.83,2.83,0,0,0,41.43,11.27Z"
        />
        <Path
          fill="url(#linear-gradient-5)"
          d="M41.46,11.87,37.62,8a2.25,2.25,0,0,0-3.17,0l-3.07,3.08,2,2,3,3,2,2L41.46,15A2.24,2.24,0,0,0,41.46,11.87Z"
        />
        <Rect
          fill="url(#linear-gradient-6)"
          x="5.67"
          y="21.77"
          width="24.8"
          height="3.58"
          transform="translate(-11.37 19.67) rotate(-44.99)"
        />
        <Rect
          fill="url(#linear-gradient-7)"
          x="11.92"
          y="28.03"
          width="24.8"
          height="3.58"
          transform="translate(-13.96 25.93) rotate(-45)"
        />
        <Rect
          fill="url(#linear-gradient-8)"
          x="8.79"
          y="24.05"
          width="24.8"
          height="5.27"
          transform="translate(-12.66 22.8) rotate(-45)"
        />
        <Rect
          fill="url(#linear-gradient-9)"
          x="31.46"
          y="17.08"
          width="7.63"
          height="3.58"
          transform="translate(-3.02 30.45) rotate(-44.98)"
        />
        <Rect
          fill="url(#linear-gradient-10)"
          x="25.2"
          y="10.83"
          width="7.62"
          height="3.58"
          transform="translate(-0.43 24.2) rotate(-44.98)"
        />
        <Rect
          fill="url(#linear-gradient-11)"
          x="28.33"
          y="13.11"
          width="7.62"
          height="5.27"
          transform="translate(-1.72 27.34) rotate(-45)"
        />
        <Rect
          fill="url(#linear-gradient-12)"
          x="32.19"
          y="17.08"
          width="6.15"
          height="3.58"
          transform="translate(-3.02 30.46) rotate(-44.99)"
        />
        <Rect
          fill="url(#linear-gradient-13)"
          x="25.94"
          y="10.83"
          width="6.15"
          height="3.58"
          transform="translate(-0.43 24.2) rotate(-44.99)"
        />
        <Rect
          fill="url(#linear-gradient-14)"
          x="29.06"
          y="13.11"
          width="6.15"
          height="5.27"
          transform="translate(-1.72 27.34) rotate(-45)"
        />
      </G>
    </G>
  </Svg>
);

export default Pencil;

import React from 'react';

const LetterPathViewLines = () => {
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
      console.log('maxY', maxY);
      console.log('minY', minY);
      const width = maxX - minX;
      const height = maxY - minY;
      console.log('minY+height', maxY + height);
      return {width, height, maxY, minY};
    }
  };
  return <div></div>;
};

export default LetterPathViewLines;

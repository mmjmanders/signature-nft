import { curveBasis as curve, line } from 'd3-shape';

const validateWalletAddress: (wallet: string) => boolean = (wallet) => {
  return (
    /^0x[0-9A-Fa-f]{40,}$/gi.test(wallet) &&
    wallet.slice(2).length % 2 === 0 &&
    wallet.slice(2).length % 4 === 0
  );
};

const hexToPoint: (hex: string) => number = (hex) =>
  Math.floor((parseInt(hex, 16) / 255) * 450);

const invertColor: (color: string) => string = (color) =>
  (0xffffff ^ parseInt(color, 16)).toString(16).padStart(6, '0').toUpperCase();

export const generateSignatureSvg: (wallet: string) => string = (wallet) => {
  if (!validateWalletAddress(wallet)) {
    throw new Error('Invalid wallet address');
  }

  const stripped = wallet.slice(2);
  const backgroundColor = `${stripped.slice(0, 6).toUpperCase()}`;
  const strokeColor = invertColor(backgroundColor);
  const match = stripped.match(/.{2}/g);
  if (!match) {
    throw new Error('Something went wrong');
  }

  const coordinates: [number, number][] = match.reduce(
    (previousValue, currentValue, currentIndex, array) => {
      if (currentIndex % 2 === 0) {
        return [
          ...previousValue,
          [hexToPoint(currentValue), hexToPoint(array[currentIndex + 1])],
        ];
      }
      return previousValue;
    },
    [] as [number, number][]
  );

  const path = line(
    (d) => d[0],
    (d) => d[1]
  ).curve(curve);

  return `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
    <g id="background" fill="#${backgroundColor}">
      <rect x="0" y="0" width="500" height="500"/>
    </g>
    <g id="signature" stroke="#${strokeColor}" stroke-width="3" transform="translate(25,25)">
      <path d="${path(coordinates)}" fill="transparent"/>
    </g>
    <g id="shadow" stroke="#${strokeColor}" stroke-width="4" opacity=".3" transform="translate(26,26)">
      <path d="${path(coordinates)}" fill="transparent"/>
    </g>
  </svg>
  `;
};

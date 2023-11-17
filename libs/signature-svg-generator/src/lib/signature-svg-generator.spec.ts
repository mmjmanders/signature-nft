import { generateSignatureSvg } from './signature-svg-generator';
import { JSDOM } from 'jsdom';

describe('signatureSvgGenerator', () => {
  it.each([
    {
      input: '0x37BDE89C5019A8C3D2F67B1A8FDE4C6B7A839D2F',
      backgroundColor: '#37BDE8',
      strokeColor: '#C84217',
    },
    {
      input: '0xE5F67890ABCDEF1234567890FEDCBA9876543210',
      backgroundColor: '#E5F678',
      strokeColor: '#1A0987',
    },
    {
      input: '0x5B6A7890ABCD1234EF567890E4A6C8F2D1B3E597',
      backgroundColor: '#5B6A78',
      strokeColor: '#A49587',
    },
    {
      input: '0x76543210ABCDEF12345678901A2B3C4D5E6F7089',
      backgroundColor: '#765432',
      strokeColor: '#89ABCD',
    },
    {
      input: '0x90ABCDEF1234567890ABCDEFEDCBA98765432109',
      backgroundColor: '#90ABCD',
      strokeColor: '#6F5432',
    },
    {
      input: '0x4E5F6A7B8C9D0E1F2A3B4C5D6E7F8091A2B3C4DC',
      backgroundColor: '#4E5F6A',
      strokeColor: '#B1A095',
    },
    {
      input: '0x34567890ABCDEF12345678909F8E7D6C5B4A3210',
      backgroundColor: '#345678',
      strokeColor: '#CBA987',
    },
    {
      input: '0x30BA4098A7F6E5D4C3B2A190B1C2D3E4F5A69788',
      backgroundColor: '#30BA40',
      strokeColor: '#CF45BF',
    },
    {
      input: '0xB5A6978890ABCD1234567890C3D4E5F1A2B69788',
      backgroundColor: '#B5A697',
      strokeColor: '#4A5968',
    },
    {
      input: '0x10FEDCBA9876543210FEDCBA1A2B3C4D5E6F7089',
      backgroundColor: '#10FEDC',
      strokeColor: '#EF0123',
    },
  ])(
    'Should have background color $backgroundColor and stroke color $strokeColor when input is $input',
    ({ input, backgroundColor, strokeColor }) => {
      const result = generateSignatureSvg(input);
      const dom = new JSDOM(result);
      const document = dom.window.document;
      expect(document.querySelector('#background').getAttribute('fill')).toBe(
        backgroundColor
      );
      expect(document.querySelector('#signature').getAttribute('stroke')).toBe(
        strokeColor
      );
    }
  );
});

import type { Config } from 'tailwindcss';

export default {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontSize: {
        '3xl': ['32px', { lineHeight: '42px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        xl: ['20px', { lineHeight: '32px' }],
        '2lg': ['18px', { lineHeight: '26px' }],
        lg: ['16px', { lineHeight: '26px' }],
        md: ['14px', { lineHeight: '24px' }],
        sm: ['13px', { lineHeight: '22px' }],
        xs: ['12px', { lineHeight: '20px' }],
      },
      colors: {
        gray: {
          10: '#FAFAFA',
          20: '#EEEEEE',
          30: '#D9D9D9',
          40: '#9FA6B2',
          50: '#787486',
          60: '#4B4B4B',
          70: '#333236',
          80: '#171717',
        },
        violet: {
          10: '#F1EFFD',
          20: '#5534DA',
          30: '#623FEE',
        },
        red: '#D6173A',
        green: {
          10: '#E7F7DB', //badge bg-color
          20: '#86D549', //badge text-color
          30: '#7AC555',
        },
        purple: '#760DDE',
        orange: {
          10: '#F9EEE3', //badge bg-color
          20: '#FFA500',
          30: '#D58D49', //badge text-color
        },
        blue: {
          10: '#DBE6F7', //badge bg-color
          20: '#76A5EA',
          30: '#4981D5', //badge text-color
        },
        pink: {
          10: '#F7DBF0', //badge bg-color
          20: '#E876EA',
          30: '#D549B6', //badge text-color
        },
      },
      fontFamily: {
        mont: ['var(--font-montserrat)'],
      },
    },
  },
  plugins: [],
} satisfies Config;

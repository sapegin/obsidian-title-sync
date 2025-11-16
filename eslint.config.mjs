import tamiaTypeScript from 'eslint-config-tamia/typescript';

const config = [
  ...tamiaTypeScript,
  {
    ignores: ['main.js'],
  },
];

export default config;

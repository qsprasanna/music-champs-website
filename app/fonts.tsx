import localFont from 'next/font/local';

// ✅ Each font must use `variable` property so CSS vars are available in globals.css
// Then apply .variable (not .className) on <html> in layout.tsx

export const sequelDisplay = localFont({
  src: [
    { path: '../public/fonts/Sequel-Sans-Book-Disp.otf', weight: '400' },
    { path: '../public/fonts/Sequel-Sans-Medium-Disp.otf', weight: '500' },
  ],
  variable: '--font-sequel-display', // → font-sequel-display utility in Tailwind
  display: 'swap',
});

export const sequelBody = localFont({
  src: [
    { path: '../public/fonts/Sequel-Sans-Book-Body.otf', weight: '400' },
    { path: '../public/fonts/Sequel-Sans-Medium-Body.otf', weight: '500' },
    { path: '../public/fonts/Sequel-Sans-Roman-Body.otf', weight: '600' },
  ],
  variable: '--font-sequel-body', // → font-sequel-body utility in Tailwind
  display: 'swap',
});

export const sequelHead = localFont({
  src: [{ path: '../public/fonts/Sequel-Sans-Roman-Head.otf', weight: '500' }],
  variable: '--font-sequel-head', // → font-sequel-head utility in Tailwind
  display: 'swap',
});

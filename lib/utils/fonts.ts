
const fallback = { variable: '--font-sans', className: 'font-sans' };



export const inter = fallback;

export const poppins = fallback;

export const jakarta = fallback;

export const geistSans = fallback;

export const geistMono = fallback;

export const ibmPlexSerif = fallback;

export const ibmPlexMono = fallback;

export const roboto = fallback;

export const rubik = fallback;

export const syne = fallback;

export const bricolage = fallback;

export const spaceGrotesk = fallback;



export function getFontClass() { return 'font-sans'; }

export function getBodyClass() { return 'font-sans'; }

export function getHeadingClass() { return 'font-sans'; }

export function getFontVariable() { return '--font-sans'; }



const fontExports = {

  inter, poppins, jakarta, geistSans, geistMono, 

  ibmPlexSerif, ibmPlexMono, roboto, rubik, syne, bricolage, spaceGrotesk,

  getFontClass, getBodyClass, getHeadingClass, getFontVariable

};



export default new Proxy(fontExports, {

  get: function(target, prop) {

    if (prop in target) return target[prop as keyof typeof target];

    return fallback; // Catch-all for any other weird font the theme requests

  }

});


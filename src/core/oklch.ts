export type SRGB = { red: number; green: number; blue: number };
export type OKLab = { lightness: number; greenRed: number; blueYellow: number };
export type OKLCH = { lightness: number; chroma: number; hue: number };

const SRGB_GAMMA = 2.4;
const SRGB_INVERSE_GAMMA = 1 / SRGB_GAMMA;
const SRGB_GAMMA_SCALE = 1.055;
const SRGB_GAMMA_OFFSET = 0.055;
const SRGB_LINEAR_SLOPE = 12.92;
const SRGB_COMPAND_BREAKPOINT_LINEAR = 0.0031308;
const SRGB_COMPAND_BREAKPOINT_COMPANDED = 0.04045;

const FULL_CIRCLE_DEGREES = 360;
const HALF_CIRCLE_DEGREES = 180;
const DEGREES_PER_RADIAN = HALF_CIRCLE_DEGREES / Math.PI;
const RADIANS_PER_DEGREE = Math.PI / HALF_CIRCLE_DEGREES;

const LMS_FROM_LINEAR_RGB = {
  long: { red: 0.4122214708, green: 0.5363325363, blue: 0.0514459929 },
  medium: { red: 0.2119034982, green: 0.6806995451, blue: 0.1073969566 },
  short: { red: 0.0883024619, green: 0.2817188376, blue: 0.6299787005 },
};

const OKLAB_FROM_LMS_ROOTS = {
  lightness: { long: 0.2104542553, medium: 0.793617785, short: -0.0040720468 },
  greenRed: { long: 1.9779984951, medium: -2.428592205, short: 0.4505937099 },
  blueYellow: { long: 0.0259040371, medium: 0.7827717662, short: -0.808675766 },
};

const LMS_ROOTS_FROM_OKLAB = {
  long: { lightness: 1, greenRed: 0.3963377774, blueYellow: 0.2158037573 },
  medium: { lightness: 1, greenRed: -0.1055613458, blueYellow: -0.0638541728 },
  short: { lightness: 1, greenRed: -0.0894841775, blueYellow: -1.291485548 },
};

const LINEAR_RGB_FROM_LMS = {
  red: { long: 4.0767416621, medium: -3.3077115913, short: 0.2309699292 },
  green: { long: -1.2684380046, medium: 2.6097574011, short: -0.3413193965 },
  blue: { long: -0.0041960863, medium: -0.7034186147, short: 1.707614701 },
};

function srgbToOklch(srgb: SRGB): OKLCH {
  const linear: SRGB = {
    red: srgbInverseCompand(srgb.red),
    green: srgbInverseCompand(srgb.green),
    blue: srgbInverseCompand(srgb.blue),
  };

  const oklab = linearRgbToOklab(linear);
  const oklchValue = oklabToOklch(oklab);
  
  return oklchValue;
}

function oklchToSrgb(color: OKLCH): SRGB {
  const oklab = oklchToOklab(color);
  const linear = oklabToLinearRgb(oklab);
  const srgb: SRGB = {
    red: srgbCompand(linear.red),
    green: srgbCompand(linear.green),
    blue: srgbCompand(linear.blue),
  };
  return srgb;
}

function linearRgbToOklab(linear: SRGB): OKLab {

  const longCone =
    LMS_FROM_LINEAR_RGB.long.red * linear.red +
    LMS_FROM_LINEAR_RGB.long.green * linear.green +
    LMS_FROM_LINEAR_RGB.long.blue * linear.blue;

  const mediumCone =
    LMS_FROM_LINEAR_RGB.medium.red * linear.red +
    LMS_FROM_LINEAR_RGB.medium.green * linear.green +
    LMS_FROM_LINEAR_RGB.medium.blue * linear.blue;

  const shortCone =
    LMS_FROM_LINEAR_RGB.short.red * linear.red +
    LMS_FROM_LINEAR_RGB.short.green * linear.green +
    LMS_FROM_LINEAR_RGB.short.blue * linear.blue;

  const longRoot = Math.cbrt(longCone);
  const mediumRoot = Math.cbrt(mediumCone);
  const shortRoot = Math.cbrt(shortCone);

  const oklab: OKLab = {
    lightness:
      OKLAB_FROM_LMS_ROOTS.lightness.long * longRoot +
      OKLAB_FROM_LMS_ROOTS.lightness.medium * mediumRoot +
      OKLAB_FROM_LMS_ROOTS.lightness.short * shortRoot,
    greenRed:
      OKLAB_FROM_LMS_ROOTS.greenRed.long * longRoot +
      OKLAB_FROM_LMS_ROOTS.greenRed.medium * mediumRoot +
      OKLAB_FROM_LMS_ROOTS.greenRed.short * shortRoot,
    blueYellow:
      OKLAB_FROM_LMS_ROOTS.blueYellow.long * longRoot +
      OKLAB_FROM_LMS_ROOTS.blueYellow.medium * mediumRoot +
      OKLAB_FROM_LMS_ROOTS.blueYellow.short * shortRoot,
  };

  return oklab;
}

function oklabToLinearRgb(oklab: OKLab): SRGB {

  const longRoot =
    LMS_ROOTS_FROM_OKLAB.long.lightness * oklab.lightness +
    LMS_ROOTS_FROM_OKLAB.long.greenRed * oklab.greenRed +
    LMS_ROOTS_FROM_OKLAB.long.blueYellow * oklab.blueYellow;

  const mediumRoot =
    LMS_ROOTS_FROM_OKLAB.medium.lightness * oklab.lightness +
    LMS_ROOTS_FROM_OKLAB.medium.greenRed * oklab.greenRed +
    LMS_ROOTS_FROM_OKLAB.medium.blueYellow * oklab.blueYellow;

  const shortRoot =
    LMS_ROOTS_FROM_OKLAB.short.lightness * oklab.lightness +
    LMS_ROOTS_FROM_OKLAB.short.greenRed * oklab.greenRed +
    LMS_ROOTS_FROM_OKLAB.short.blueYellow * oklab.blueYellow;

  const longCone = cube(longRoot);
  const mediumCone = cube(mediumRoot);
  const shortCone = cube(shortRoot);

  const linear: SRGB = {
    red:
      LINEAR_RGB_FROM_LMS.red.long * longCone +
      LINEAR_RGB_FROM_LMS.red.medium * mediumCone +
      LINEAR_RGB_FROM_LMS.red.short * shortCone,
    green:
      LINEAR_RGB_FROM_LMS.green.long * longCone +
      LINEAR_RGB_FROM_LMS.green.medium * mediumCone +
      LINEAR_RGB_FROM_LMS.green.short * shortCone,
    blue:
      LINEAR_RGB_FROM_LMS.blue.long * longCone +
      LINEAR_RGB_FROM_LMS.blue.medium * mediumCone +
      LINEAR_RGB_FROM_LMS.blue.short * shortCone,
  };
  return linear;
}

function oklabToOklch(oklab: OKLab): OKLCH {
  const chroma = Math.sqrt(square(oklab.greenRed) + square(oklab.blueYellow));
  const hueRadians = Math.atan2(oklab.blueYellow, oklab.greenRed);
  const hueDegreesRaw = hueRadians * DEGREES_PER_RADIAN;
  const hue = (hueDegreesRaw + FULL_CIRCLE_DEGREES) % FULL_CIRCLE_DEGREES;
  const oklchValue: OKLCH = { lightness: oklab.lightness, chroma, hue };
  return oklchValue;
}

function oklchToOklab(color: OKLCH): OKLab {
  const hueRadians = color.hue * RADIANS_PER_DEGREE;
  const oklab: OKLab = {
    lightness: color.lightness,
    greenRed: color.chroma * Math.cos(hueRadians),
    blueYellow: color.chroma * Math.sin(hueRadians),
  };
  return oklab;
}

function srgbCompand(linearValue: number): number {
  if (linearValue >= SRGB_COMPAND_BREAKPOINT_LINEAR) {
    const companded =
      SRGB_GAMMA_SCALE * Math.pow(linearValue, SRGB_INVERSE_GAMMA) - SRGB_GAMMA_OFFSET;
    return companded;
  }
  const companded = SRGB_LINEAR_SLOPE * linearValue;
  return companded;
}

function srgbInverseCompand(companded: number): number {
  if (companded >= SRGB_COMPAND_BREAKPOINT_COMPANDED) {
    const linearValue = Math.pow((companded + SRGB_GAMMA_OFFSET) / SRGB_GAMMA_SCALE, SRGB_GAMMA);
    return linearValue;
  }
  const linearValue = companded / SRGB_LINEAR_SLOPE;
  return linearValue;
}

function square(value: number): number {
  const squared = value * value;
  return squared;
}

function cube(value: number): number {
  const cubed = value * value * value;
  return cubed;
}

export const oklch = {
  srgbToOklch,
  oklchToSrgb,
  linearRgbToOklab,
  oklabToLinearRgb,
  oklabToOklch,
  oklchToOklab,
  srgbCompand,
  srgbInverseCompand,
};

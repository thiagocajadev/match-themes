export type Locale = 'en' | 'pt-BR';

export type HarmonyTranslations = {
  complementary: string;
  analogous: string;
  triadic: string;
  splitComplementary: string;
  tetradic: string;
  square: string;
  neutrals: string;
};

export type Translations = {
  nav: {
    brand: string;
    export: string;
    github: string;
    theoryLink: string;
    backToHome: string;
    primaryNav: string;
  };
  hero: {
    matchWord: string;
    headlineMiddle: string;
    themesWord: string;
    headlineEnd: string;
    lede: string;
    cta: string;
  };
  colors: {
    heading: string;
    description: string;
    baseLabel: string;
    formatLabel: string;
    harmonyLabel: string;
    invalidHex: string;
    pickBaseColor: string;
    baseColorHex: string;
    harmony: HarmonyTranslations;
  };
  showcase: {
    heading: string;
    description: string;
    radiusLabel: string;
    accordionLabel: string;
    themeRadiusAria: string;
    lightLabel: string;
    darkLabel: string;
    lightBadge: string;
    darkBadge: string;
    productCardTitle: string;
    productCardDescription: string;
    emailLabel: string;
    emailPlaceholder: string;
    maybeButton: string;
    requestButton: string;
    teamActivityTitle: string;
    teamActivityDescription: string;
    markAllRead: string;
    viewAll: string;
    deployTitle: string;
    deployMessage: string;
    deployTimestamp: string;
    reviewTitle: string;
    reviewMessage: string;
    reviewTimestamp: string;
    alertTitle: string;
    alertMessage: string;
    alertTimestamp: string;
  };
  export: {
    dialogTitle: string;
    dialogDescription: string;
    previewAriaLabel: string;
    copyIdle: string;
    copyCopied: string;
    downloadButton: string;
  };
  footer: {
    techCredit: string;
    github: string;
    theoryLink: string;
    siteFooter: string;
  };
  theory: {
    pageTitle: string;
    pageSubtitle: string;
    intro1: string;
    intro2: string;
    intro3: string;
  };
};

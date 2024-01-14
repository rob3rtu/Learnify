import { Global } from "@emotion/react";

export const Fonts = () => (
  <Global
    styles={`
    @font-face {
  font-family: 'WorkSans-Italic';
  src: local('WorkSans-Italic'),
  url('../../public/fonts/WorkSans-Italic.ttf') format('truetype')
}

@font-face {
  font-family: 'WorkSans-Light';
  src: local('WorkSans-Light'),
  url('../../public/fonts/WorkSans-Light.ttf') format('truetype')
}

@font-face {
  font-family: 'WorkSans-LightItalic';
  src: local('WorkSans-LightItalic'),
  url('../../public/fonts/WorkSans-LightItalic.ttf') format('truetype')
}

@font-face {
  font-family: 'WorkSans-Medium';
  src: local('WorkSans-Medium'),
  url('../../public/fonts/WorkSans-Medium.ttf') format('truetype')
}

@font-face {
  font-family: 'WorkSans-MediumItalic';
  src: local('WorkSans-MediumItalic'),
  url('../../public/fonts/WorkSans-MediumItalic.ttf') format('truetype')
}

@font-face {
  font-family: 'WorkSans-Regular';
  src: local('WorkSans-Regular'),
  url('../../public/fonts/WorkSans-Regular.ttf') format('truetype')
}

@font-face {
  font-family: 'SemiBold';
  src: local('WorkSans-SemiBold'),
  url('../../public/fonts/WorkSans-SemiBold.ttf') format('truetype')
}

@font-face {
  font-family: 'WorkSans-SemiBoldItalic';
  src: local('WorkSans-SemiBoldItalic'),
  url('../../public/fonts/WorkSans-SemiBoldItalic.ttf') format('truetype')
}

@font-face {
  font-family: 'WorkSans-Thin';
  src: local('WorkSans-Thin'),
  url('../../public/fonts/WorkSans-Thin.ttf') format('truetype')
}

@font-face {
  font-family: 'WorkSans-ThinItalic';
  src: local('WorkSans-ThinItalic'),
  url('../../public/fonts/WorkSans-ThinItalic.ttf') format('truetype')
}
    `}
  />
);

import { tailwind } from '@theme-ui/presets';

const theme = {
  ...tailwind,
  useCustomProperties: true,
  useColorSchemeMediaQuery: true,
  colors: {
    ...tailwind.colors,
    // refactoring UI palette 3
    blue: [
      'hsl(195, 100%, 95%)',
      'hsl(195, 100%, 85%)',
      'hsl(195, 97%, 75%)',
      'hsl(196, 94%, 67%)',
      'hsl(197, 92%, 61%)',
      'hsl(199, 84%, 55%)',
      'hsl(201, 79%, 46%)',
      'hsl(202, 83%, 41%)',
      'hsl(203, 87%, 34%)',
      'hsl(204, 96%, 27%)',
    ],
    gray: [
      'hsl(210, 36%, 96%)',
      'hsl(212, 33%, 89%)',
      'hsl(210, 31%, 80%)',
      'hsl(211, 27%, 70%)',
      'hsl(209, 23%, 60%)',
      'hsl(210, 22%, 49%)',
      'hsl(209, 28%, 39%)',
      'hsl(209, 34%, 30%)',
      'hsl(211, 39%, 23%)',
      'hsl(209, 61%, 16%)',
    ],
    purple: [
      'hsl(240, 100%, 95%)',
      'hsl(238, 100%, 88%)',
      'hsl(238, 94%, 81%)',
      'hsl(240, 95%, 76%)',
      'hsl(243, 94%, 70%)',
      'hsl(243, 94%, 66%)',
      'hsl(245, 92%, 60%)',
      'hsl(245, 79%, 52%)',
      'hsl(245, 86%, 40%)',
      'hsl(245, 100%, 27%)',
    ],
    red: [
      'hsl(360, 100%, 95%)',
      'hsl(360, 100%, 87%)',
      'hsl(360, 100%, 80%)',
      'hsl(360, 91%, 69%)',
      'hsl(360, 83%, 62%)',
      'hsl(356, 75%, 53%)',
      'hsl(354, 85%, 44%)',
      'hsl(352, 90%, 35%)',
      'hsl(350, 94%, 28%)',
      'hsl(348, 94%, 20%)',
    ],
    teal: [
      'hsl(152, 68%, 96%)',
      'hsl(154, 75%, 87%)',
      'hsl(156, 73%, 74%)',
      'hsl(158, 58%, 62%)',
      'hsl(160, 51%, 49%)',
      'hsl(162, 63%, 41%)',
      'hsl(164, 71%, 34%)',
      'hsl(166, 72%, 28%)',
      'hsl(168, 80%, 23%)',
      'hsl(170, 97%, 15%)',
    ],
    yellow: [
      'hsl(49, 100%, 96%)',
      'hsl(48, 100%, 88%)',
      'hsl(48, 95%, 76%)',
      'hsl(48, 94%, 68%)',
      'hsl(44, 92%, 63%)',
      'hsl(42, 87%, 55%)',
      'hsl(36, 77%, 49%)',
      'hsl(29, 80%, 44%)',
      'hsl(22, 82%, 39%)',
      'hsl(15, 86%, 30%)',
    ],
    modes: {
      dark: {},
    },
  },
  layout: {
    container: {
      maxWidth: 1024,
      mx: 'auto',
      py: 3,
      px: 4,
    },
  },
  buttons: {
    primary: {
      cursor: 'pointer',
      '&:hover': {
        bg: 'primaryHover',
        boxShadow: 'default',
      },
    },
    form: {},
    secondary: {
      cursor: 'pointer',
      bg: 'secondary',
      '&:hover': {
        bg: 'secondaryHover',
        boxShadow: 'default',
      },
    },
  },
  links: {
    nav: {
      fontFamily: 'body',
    },
  },
};

theme.colors = {
  ...theme.colors,
  primary: theme.colors.purple[4],
  primaryHover: theme.colors.purple[6],
  secondary: theme.colors.teal[3],
  secondaryHover: theme.colors.teal[5],
  dark: theme.colors.gray[9],
  grayDark: theme.colors.gray[9],
  background: theme.colors.gray[0],
  text: theme.colors.gray[8],
  textMuted: theme.colors.gray[5],
  danger: theme.colors.red[4],
  warning: theme.colors.yellow[3],
  info: theme.colors.blue[4],
  success: theme.colors.teal[2],
  muted: theme.colors.gray[1],
  modes: {
    dark: {
      background: theme.colors.gray[9],
      text: theme.colors.gray[0],
      textMuted: theme.colors.gray[5],
    },
  },
};

theme.buttons.form = {
  ...theme.buttons.primary,
  mr: 2,
};

export default theme;

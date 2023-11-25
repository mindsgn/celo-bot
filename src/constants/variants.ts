const variants = {
  loading: {
    open: { opacity: 1, y: 0, scale: 1 },
    close: { opacity: 0, y: -200, scale: 0 },
  },
  footer: {
    open: { opacity: 1 },
    close: { opacity: 0 },
  },
  navigation: {
    open: { y: 0, opacity: 1 },
    close: { y: -100, opacity: 0 },
  },
  button: {
    hover: { scale: 1.1 },
    click: { scale: 0.9 },
  },
  links: {
    hover: { scale: 1.1 },
    click: { scale: 0.8 },
  },
  hero: {
    open: { y: 0, opacity: 1 },
    close: { y: -100, opacity: 0 },
  },
};

export { variants };

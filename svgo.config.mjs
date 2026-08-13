export default {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeUnknownsAndDefaults: {
            unknownAttrs: false, // breaks some ProductIcons
          },
          cleanupIds: false, // breaks some Logos
        },
      },
    },
  ],
}

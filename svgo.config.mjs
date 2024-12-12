export default {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          // this will ensure we keep className essential for theme switch
          removeUnknownsAndDefaults: {
            unknownContent: true,
            unknownAttrs: false,
            defaultAttrs: true,
            defaultMarkupDeclarations: true,
            uselessOverrides: true,
            keepDataAttrs: true,
            keepAriaAttrs: true,
            keepRoleAttr: false,
          },
          removeViewBox: false,
        },
      },
    },
  ],
}

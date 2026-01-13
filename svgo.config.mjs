export default {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          // this will ensure we keep className essential for theme switch
          removeUnknownsAndDefaults: {
            defaultAttrs: true,
            defaultMarkupDeclarations: true,
            keepAriaAttrs: true,
            keepDataAttrs: true,
            keepRoleAttr: false,
            unknownAttrs: false,
            unknownContent: true,
            uselessOverrides: true,
          },
          removeViewBox: false,
        },
      },
    },
  ],
}

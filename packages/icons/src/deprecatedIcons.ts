type DeprecatedIconsType = {
  name: string
  deprecated: boolean
  deprecatedReason: string
}[]

/**
 * If an icon becomes deprecated add it in this array. You will need to run `pnpm run icons:update`.
 * It will automatically add JSDoc comments to the icon file and update the icon list in the story.
 * In the next major consider all icons in this array to be removed
 */
export const DEPRECATED_ICONS: DeprecatedIconsType = [
  {
    name: 'DocumentDbProductIcon',
    deprecated: true,
    deprecatedReason: 'Use MongoDbProductIcon instead.',
  },
  {
    name: 'AsteriskIcon',
    deprecated: true,
    deprecatedReason: 'Use * from the font instead.',
  },
  {
    name: 'CrossCircleIcon',
    deprecated: true,
    deprecatedReason: 'Use CloseCircleOutlineIcon instead.',
  },
  {
    name: 'CrossCircleOutlineIcon',
    deprecated: true,
    deprecatedReason: 'Use CloseCircleOutlineIcon instead.',
  },
  {
    name: 'DragVariantIcon',
    deprecated: true,
    deprecatedReason: 'Use DragIcon instead.',
  },
]

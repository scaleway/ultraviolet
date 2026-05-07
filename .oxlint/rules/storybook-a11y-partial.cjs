/**
 * @fileoverview Rule to check for a11y: partial in Storybook stories
 */

const STORYBOOK_A11Y_PARTIAL = {
  meta: {
    name: 'a11y-partial',
    type: 'suggestion',
    docs: {
      description:
        'Report components with a11y: partial in index.stories.tsx files',
      category: 'Accessibility',
      recommended: false,
    },
    fixable: null,
    schema: [],
    messages: {
      a11yPartialFound:
        'Found a11y: partial for this component. Ensure accessibility improvements are tracked and documented.',
    },
  },

  create(context) {
    const fileName = context.getFilename()

    if (
      !fileName.endsWith('index.stories.tsx') &&
      !fileName.endsWith('index.stories.ts')
    ) {
      return {}
    }

    return {
      Property(node) {
        if (
          node.key.type === 'Identifier' &&
          node.key.name === 'a11y' &&
          node.value.type === 'Literal' &&
          node.value.value === 'partial'
        ) {
          context.report({
            node,
            messageId: 'a11yPartialFound',
          })
        }
      },
    }
  },
}

module.exports = {
  meta: {
    name: '@ultraviolet',
  },
  rules: {
    'a11y-partial': STORYBOOK_A11Y_PARTIAL,
  },
}

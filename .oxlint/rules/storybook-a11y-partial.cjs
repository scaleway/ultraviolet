/**
 * @fileoverview Rule to check for failed accessibility principles in Storybook stories
 */

const STORYBOOK_A11Y_PARTIAL = {
  meta: {
    name: 'a11y-partial',
    type: 'suggestion',
    docs: {
      description: 'Report components with failed accessibility principles in index.stories.tsx files',
      category: 'Accessibility',
      recommended: false,
    },
    fixable: null,
    schema: [],
    messages: {
      a11yPartialFound:
        'Found a failed accessibility principle for this component. Ensure accessibility improvements are tracked and documented.',
    },
  },

  create(context) {
    const fileName = context.getFilename()

    if (!fileName.endsWith('index.stories.tsx') && !fileName.endsWith('index.stories.ts')) {
      return {}
    }

    return {
      Property(node) {
        if (
          node.key.type === 'Identifier' &&
          ['perceivable', 'operable', 'understandable', 'robust'].includes(node.key.name) &&
          node.value.value === false
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

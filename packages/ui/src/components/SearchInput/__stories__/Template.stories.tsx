import type { StoryFn } from '@storybook/react-vite'
import { SearchInput } from '..'
import { Text } from '../../Text'

export const Template: StoryFn<typeof SearchInput> = ({ ...args }) => (
  <div style={{ height: '120px' }}>
    <SearchInput
      {...args}
      placeholder="Type something"
      onSearch={() => {}}
      onClose={() => {}}
    >
      {({ searchTerms }) => (
        <Text as="p" variant="body" sentiment="neutral">
          You are currently searching for:&nbsp;
          <Text as="span" variant="bodyStrong" sentiment="neutral">
            {searchTerms}
          </Text>
        </Text>
      )}
    </SearchInput>
  </div>
)

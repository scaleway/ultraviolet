import type { StoryFn } from '@storybook/react-vite'
import { Text } from '../../Text'
import { SearchInput } from '..'

export const Template: StoryFn<typeof SearchInput> = ({ ...args }) => (
  <div style={{ height: '120px' }}>
    <SearchInput
      {...args}
      onClose={() => {}}
      onSearch={() => {}}
      placeholder="Type something"
    >
      {({ searchTerms }) => (
        <Text as="p" sentiment="neutral" variant="body">
          You are currently searching for:&nbsp;
          <Text as="span" sentiment="neutral" variant="bodyStrong">
            {searchTerms}
          </Text>
        </Text>
      )}
    </SearchInput>
  </div>
)

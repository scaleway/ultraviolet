import type { DecoratorFunction } from '@storybook/addons'
import type { ComponentProps } from 'react'
import { Tooltip } from '..'

export const TestComp = (props: ComponentProps<typeof Tooltip>) => (
  <div>
    <p>Test&nbsp;</p>
    <div>
      <p>Test 2&nbsp;</p>
      <Tooltip {...props} text="Hello world">
        Test 3&nbsp;
      </Tooltip>
    </div>
  </div>
)

export const Nested = (props: ComponentProps<typeof Tooltip>) => (
  <Tooltip {...props} text="Great-grand parents">
    Great-grand parents&nbsp;
    <Tooltip {...props} text="Grand parents">
      Grand parents&nbsp;
      <Tooltip {...props} text="Parents">
        Parents&nbsp;
        <Tooltip {...props} text="Children">
          Children&nbsp;
          <TestComp {...props} />
        </Tooltip>
      </Tooltip>
    </Tooltip>
  </Tooltip>
)

Nested.decorators = [
  Story => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Story />
    </div>
  ),
] as DecoratorFunction<JSX.Element>[]

import { Meta, Story } from '@storybook/react'
import React, { ComponentProps, useState } from 'react'
import Counter from '..'
import { Button, Icon } from '../../index'

export default {
  component: Counter,
  title: 'Components/Data Display/Counter',
} as Meta

const Template: Story<ComponentProps<typeof Counter>> = ({
  end = 20,
  ...props
}) => <Counter end={end} {...props} />

export const Default = Template.bind({})

export const End = Template.bind({})
End.parameters = {
  docs: {
    storyDescription:
      '`end` properties define until what value counter is gonna go. It can be positive as much as negative value.',
  },
}
End.decorators = [
  () => (
    <>
      <Counter end={100} />
      <Counter end={-100} />
    </>
  ),
]

export const OnEnd = Template.bind({})
OnEnd.parameters = {
  docs: {
    storyDescription:
      '`onEnd` properties will trigger associated function at the end of counter animation. In this example we show `check` icon at the end of counter.',
  },
}
OnEnd.decorators = [
  () => {
    const [isShown, setIsShown] = useState(false)
    const [reset, setReset] = useState(true)

    return (
      <div style={{ alignItems: 'center', display: 'flex', gap: 16 }}>
        {reset && (
          <>
            <Counter end={1000} onEnd={() => setIsShown(true)} />
            {isShown && <Icon name="check" />}
            <Button
              size="xxsmall"
              onClick={() => {
                setIsShown(false)
                setReset(false)
                setTimeout(() => {
                  setReset(true)
                })
              }}
            >
              Rerender
            </Button>
          </>
        )}
      </div>
    )
  },
]

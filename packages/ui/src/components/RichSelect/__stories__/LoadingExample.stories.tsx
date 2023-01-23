import type { ComponentStory } from '@storybook/react'
import { useEffect, useState } from 'react'
import { RichSelect } from '..'
import { Button, Loader } from '../..'

export const LoadingExample: ComponentStory<typeof RichSelect> = ({
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    let timeout: number

    if (isLoading) {
      timeout = setTimeout(() => {
        setIsLoading(false)
      }, 3000) as unknown as number
    }

    return () => clearTimeout(timeout)
  }, [isLoading])

  return (
    <>
      <Button size="small" onClick={() => setIsLoading(true)}>
        Load data
      </Button>
      <RichSelect
        name="example"
        isLoading={isLoading}
        customComponents={{
          LoadingIndicator: () => <Loader active size={24} />,
        }}
        {...props}
      >
        <RichSelect.Option value="a">Option A</RichSelect.Option>
        {!isLoading && (
          <RichSelect.Option value="b">Option B</RichSelect.Option>
        )}
      </RichSelect>
    </>
  )
}

LoadingExample.decorators = [
  StoryComponent => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <StoryComponent />
    </div>
  ),
]

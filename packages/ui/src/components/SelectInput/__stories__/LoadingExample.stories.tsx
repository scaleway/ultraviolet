import type { ComponentStory } from '@storybook/react'
import { useEffect, useState } from 'react'
import { SelectInput } from '..'
import { Button, Loader } from '../..'

export const LoadingExample: ComponentStory<typeof SelectInput> = ({
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
      <SelectInput
        name="example"
        isLoading={isLoading}
        customComponents={{
          LoadingIndicator: () => <Loader active size={24} />,
        }}
        {...props}
      >
        <SelectInput.Option value="a">Option A</SelectInput.Option>
        {!isLoading && (
          <SelectInput.Option value="b">Option B</SelectInput.Option>
        )}
      </SelectInput>
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

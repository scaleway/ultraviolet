import type { StoryFn } from '@storybook/react-vite'
import { useCallback, useState } from 'react'
import { Button } from '../../Button'
import { SelectInput } from '..'
import { dataUnGrouped } from './resources'

export const LoadMore: StoryFn<typeof SelectInput> = args => {
  const [options, setOptions] = useState(dataUnGrouped)
  const [counter, setCounter] = useState(1)
  const [loading, setLoading] = useState(false)

  const loadMore = useCallback(() => {
    const newPlanet = {
      label: `Planet ${counter}`,
      value: `planet-${counter}`,
    }
    setLoading(true)

    return setTimeout(() => {
      setOptions([...options, newPlanet])
      setCounter(counter + 1)
      setLoading(() => false)
    }, 500)
  }, [options, counter])

  return (
    <SelectInput
      {...args}
      loadMore={
        <Button isLoading={loading} onClick={loadMore}>
          Load more
        </Button>
      }
      options={options}
    />
  )
}
LoadMore.decorators = [
  StoryComponent => (
    <div style={{ height: '80px' }}>
      <StoryComponent />
    </div>
  ),
]

LoadMore.parameters = {
  docs: {
    description: {
      story:
        'By adding a `LoadMore` prop, it is possible to add a ReactNode at the end of the dropdown to update the state of the options.',
    },
  },
}

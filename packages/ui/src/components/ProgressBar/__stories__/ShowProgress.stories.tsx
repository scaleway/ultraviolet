import type { StoryFn } from '@storybook/react-vite'
import { useEffect, useState } from 'react'
import { ProgressBar } from '..'

export const ShowProgress: StoryFn = props => {
  const [value, setValue] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      if (value >= 100) setValue(0)
      else setValue(prevValue => prevValue + 1)
    }, 200)

    return () => {
      clearInterval(interval)
    }
  }, [value])

  return <ProgressBar {...props} value={value} />
}

ShowProgress.args = {
  label: 'Label',
  direction: 'column',
  showProgress: true,
}
ShowProgress.decorators = [
  StoryComponent => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <StoryComponent />
    </div>
  ),
]

ShowProgress.parameters = {
  docs: {
    description: {
      story: 'Show current progress, which is always between 0-100%.',
    },
  },
}

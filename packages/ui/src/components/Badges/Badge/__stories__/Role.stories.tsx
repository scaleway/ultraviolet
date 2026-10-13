import type { StoryFn } from '@storybook/react-vite'
import { useEffect, useState } from 'react'
import { Badge } from '..'
import { Loader } from '../../../Feedback/Loader'

export const Role: StoryFn = () => {
  const [done, setDone] = useState(false)

  useEffect(() => {
    setTimeout(() => setDone(true), 5000)
  }, [])

  return (
    <Badge sentiment={done ? 'danger' : 'neutral'} role="alert" disabled={!done}>
      {done ? 'fail' : 'loading'} {done ? null : <Loader active size="small" sentiment="neutral" />}
    </Badge>
  )
}

Role.parameters = {
  docs: {
    description: {
      story:
        'By default a badge is a presentational element. Pass `role="status"` (or `role="alert"` for urgent) when the badge represents a dynamic status so changes are announced by assistive technologies.',
    },
  },
}

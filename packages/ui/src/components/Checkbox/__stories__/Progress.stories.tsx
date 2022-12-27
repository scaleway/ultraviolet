import type { Story } from '@storybook/react'
import type { ChangeEvent } from 'react'
import { useCallback, useState } from 'react'
import Checkbox from '..'

export const Progress: Story = () => {
  const [checked, setChecked] = useState(false)
  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
    setTimeout(() => {
      setChecked(false)
    }, 2000)
  }, [])

  return (
    <Checkbox progress={checked} checked={checked} onChange={handleChange}>
      Check me
    </Checkbox>
  )
}
Progress.parameters = {
  docs: {
    storyDescription: 'Set progress using `progress` property.',
  },
}

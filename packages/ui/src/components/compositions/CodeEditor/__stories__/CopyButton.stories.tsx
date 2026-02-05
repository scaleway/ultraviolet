import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { useState } from 'react'
import { CodeEditor } from '..'

const DEFAULT_VALUE = `function findSequence(goal) {
    function find(start, history) {
      if (start == goal)
        return history;
      else if (start > goal)
        return null;
      else
        return find(start + 5, "(" + history + " + 5)") ||
               find(start * 3, "(" + history + " * 3)");
    }
    return find(1, "1");
  }
`
export const CopyButton: StoryFn<ComponentProps<typeof CodeEditor>> = ({
  ...props
}) => {
  const [value, setValue] = useState(DEFAULT_VALUE)

  return <CodeEditor {...props} copyButton onChange={setValue} value={value} />
}

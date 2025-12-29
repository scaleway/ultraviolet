import { Stack } from '@ultraviolet/ui'
import { useState } from 'react'
import {
  animationShowCaseAnimatedElement,
  animationShowCaseContainer,
} from './styles.css'

export const ShowcaseAnimations = ({ animation }: { animation: string }) => {
  const [className, setClassName] = useState('')
  const animationClassname = `${animation}_uv`

  return (
    <Stack alignItems="center" direction="row" gap={2}>
      {animation} :
      <Stack
        alignItems="center"
        className={animationShowCaseContainer}
        direction="row"
        gap={2}
        justifyContent="center"
        onMouseEnter={() => setClassName(animationClassname)}
        onMouseLeave={() => setClassName('')}
      >
        Hover me
        <div className={`${className} ${animationShowCaseAnimatedElement}`} />
      </Stack>
    </Stack>
  )
}

import styled from '@emotion/styled'
import type { ComponentProps } from 'react'
import { Stack } from '../Stack'
import { Key } from './Key'

const ClickableStack = styled(Stack)`
  cursor: text;
`

type KeyGroupProps = {
  keys: ComponentProps<typeof Key>['children'][]
  disabled: ComponentProps<typeof Key>['disabled']
  onClick?: () => void
}

export const KeyGroup = ({ keys, disabled, onClick }: KeyGroupProps) => (
  <ClickableStack gap={0.5} direction="row" onClick={onClick}>
    {keys.map(key => (
      <Key key={key} disabled={disabled}>
        {key}
      </Key>
    ))}
  </ClickableStack>
)

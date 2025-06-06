import styled from '@emotion/styled'
import { InformationOutlineIcon } from '@ultraviolet/icons'
import { Popover, Tooltip } from '@ultraviolet/ui'
import { useState } from 'react'
import type { Hint } from './types'

type FeatureHintProps = {
  hint?: Hint
}

const IconWrapper = styled.div`
  cursor: pointer;
`

export const FeatureHint = ({ hint }: FeatureHintProps) => {
  const [visible, setVisible] = useState(false)

  if (!hint) {
    return <div />
  }

  if (hint.type === 'tooltip') {
    return (
      <Tooltip text={hint.text}>
        <InformationOutlineIcon sentiment="neutral" prominence="weak" />
      </Tooltip>
    )
  }

  return (
    <Popover
      title={hint.title}
      content={hint.content}
      visible={visible}
      onClose={() => setVisible(false)}
    >
      <IconWrapper
        role="button"
        onKeyDown={event => {
          if (event.key === 'Space' || event.key === 'Enter') {
            setVisible(true)
          }
        }}
        onClick={() => setVisible(true)}
        tabIndex={0}
        data-testid="hint-popover"
      >
        <InformationOutlineIcon sentiment="neutral" prominence="weak" />
      </IconWrapper>
    </Popover>
  )
}

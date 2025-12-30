import { InformationOutlineIcon } from '@ultraviolet/icons'
import { Popover, Tooltip } from '@ultraviolet/ui'
import { useState } from 'react'
import { plansIconWrapper } from './styles.css'
import type { Hint } from './types'

type FeatureHintProps = {
  hint?: Hint
}

export const FeatureHint = ({ hint }: FeatureHintProps) => {
  const [visible, setVisible] = useState(false)

  if (!hint) {
    return <div />
  }

  if (hint.type === 'tooltip') {
    return (
      <Tooltip text={hint.text}>
        <InformationOutlineIcon prominence="weak" sentiment="neutral" />
      </Tooltip>
    )
  }

  return (
    <Popover
      content={hint.content}
      onClose={() => setVisible(false)}
      title={hint.title}
      visible={visible}
    >
      <div
        className={plansIconWrapper}
        data-testid="hint-popover"
        onClick={() => setVisible(true)}
        onKeyDown={event => {
          if (event.key === 'Space' || event.key === 'Enter') {
            setVisible(true)
          }
        }}
        // oxlint-disable-next-line jsx_a11y/prefer-tag-over-role
        role="button"
        tabIndex={0}
      >
        <InformationOutlineIcon prominence="weak" sentiment="neutral" />
      </div>
    </Popover>
  )
}

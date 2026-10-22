import { InformationOutlineIcon } from '@ultraviolet/icons/InformationOutlineIcon'
import { Popover } from '../../components/Overlay/Popover'
import { Tooltip } from '../../components/Overlay/Tooltip'
import type { Hint } from './types'
import { plansStyle } from './styles.css'

type FeatureHintProps = {
  hint?: Hint
}

export const FeatureHint = ({ hint }: FeatureHintProps) => {
  if (!hint) {
    return null
  }

  if (hint.type === 'tooltip') {
    return (
      <Tooltip text={hint.text}>
        <InformationOutlineIcon prominence="weak" sentiment="neutral" />
      </Tooltip>
    )
  }

  return (
    <Popover content={hint.content} title={hint.title}>
      <button className={plansStyle.iconWrapper} data-testid="hint-popover" type="button">
        <InformationOutlineIcon prominence="weak" sentiment="neutral" />
      </button>
    </Popover>
  )
}

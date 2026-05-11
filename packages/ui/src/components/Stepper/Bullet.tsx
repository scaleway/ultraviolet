import { CheckIcon } from '@ultraviolet/icons/CheckIcon'
import { Bullet } from '../Bullet'
import { useStepper } from './StepperProvider'
import { stepperStyle } from './styles.css'

export const StepBullet = ({
  isDone,
  disabled,
  isActive,
  index,
}: {
  isDone: boolean
  disabled: boolean
  isActive: boolean
  index: number
}) => {
  const { size } = useStepper()

  return isDone && !disabled ? (
    <Bullet
      className={stepperStyle.stepBullet({
        disabled,
        isActive,
        size,
      })}
      prominence="default"
      sentiment="primary"
      size={size}
    >
      <CheckIcon />
    </Bullet>
  ) : (
    <Bullet
      className={stepperStyle.stepBullet({
        disabled,
        isActive,
        size,
      })}
      prominence="strong"
      sentiment={isDone || isActive ? 'primary' : 'neutral'}
      size={size}
    >
      {(index + 1).toString()}
    </Bullet>
  )
}

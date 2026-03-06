import { OpenInNewIcon } from '@ultraviolet/icons/OpenInNewIcon'
import { Stack } from '../../Stack'
import { contentCardStyle } from './styles.css'

export const LinkContent = ({
  direction,
  disabled,
}: {
  direction: 'column' | 'row'
  disabled?: boolean
}) => (
  <Stack
    alignItems={direction === 'column' ? 'flex-end' : 'center'}
    className={contentCardStyle.iconStack[direction]}
    direction={direction}
    flex={1}
    justifyContent={direction === 'column' ? 'center' : 'flex-end'}
  >
    <div className={contentCardStyle.iconContainer}>
      <OpenInNewIcon disabled={disabled} sentiment="neutral" />
    </div>
  </Stack>
)

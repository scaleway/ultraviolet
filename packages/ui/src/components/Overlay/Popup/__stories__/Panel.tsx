import { CloseIcon } from '@ultraviolet/icons/CloseIcon'
import { Button } from '../../../Action/Button'
import { Stack } from '../../../Layout/Stack'
import { Text } from '../../../Typography/Text'

type PanelProps = {
  title: string
  onClose?: () => void
  children?: React.ReactNode
}

/**
 * A simple popover-like panel used by the Popup stories to render a rich
 * content (title + optional close button + body) instead of a plain tooltip.
 */
export const Panel = ({ title, onClose, children }: PanelProps) => (
  <Stack gap={2} width="100%">
    <Stack alignItems="center" direction="row" gap={2} justifyContent="space-between">
      <Text as="h3" sentiment="neutral" variant="bodyStrong">
        {title}
      </Text>
      {onClose ? (
        <Button accessibleLabel="Close" onClick={onClose} sentiment="neutral" size="xsmall" variant="ghost">
          <CloseIcon size="small" />
        </Button>
      ) : null}
    </Stack>
    <Text as="p" sentiment="neutral" variant="bodySmall">
      {children}
    </Text>
  </Stack>
)

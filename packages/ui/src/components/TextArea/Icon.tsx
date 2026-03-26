import { AlertCircleIcon } from '@ultraviolet/icons/AlertCircleIcon'
import { CheckCircleIcon } from '@ultraviolet/icons/CheckCircleIcon'

import { STATE_ICON_SIZE } from './constant'

export const SuccessErrorIcon = ({
  success,
  error,
}: {
  success: boolean
  error: boolean
}) => (
  <>
    {success && !error ? (
      <CheckCircleIcon sentiment="success" size={STATE_ICON_SIZE} />
    ) : null}
    {error ? <AlertCircleIcon sentiment="danger" /> : null}
  </>
)

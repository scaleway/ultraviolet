import { AlertCircleIcon } from '@ultraviolet/icons/AlertCircleIcon'
import { CheckCircleIcon } from '@ultraviolet/icons/CheckCircleIcon'

export const SuccessErrorIcon = ({ success, error }: { success: boolean; error: boolean }) => (
  <>
    {success && !error ? <CheckCircleIcon sentiment="success" size="small" /> : null}
    {error ? <AlertCircleIcon sentiment="danger" /> : null}
  </>
)

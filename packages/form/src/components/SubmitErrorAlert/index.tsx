import { Alert } from '@ultraviolet/ui'
import { useFormState } from 'react-hook-form'

export const SubmitErrorAlert = ({ className }: { className?: string }) => {
  const { errors } = useFormState()

  return errors?.root?.['submit'] ? (
    <Alert className={className} sentiment="danger">
      {errors.root['submit'].message}
    </Alert>
  ) : null
}

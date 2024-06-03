import { FEEDBACK_PATH, bucketLink } from '../../helper'
import notFound from './404.svg'

const dangerDark = bucketLink(FEEDBACK_PATH, 'danger-dark')
const dangerLight = bucketLink(FEEDBACK_PATH, 'danger-light')
const successDark = bucketLink(FEEDBACK_PATH, 'success-dark')
const successLight = bucketLink(FEEDBACK_PATH, 'success-light')
const warningDark = bucketLink(FEEDBACK_PATH, 'warning-dark')
const warningLight = bucketLink(FEEDBACK_PATH, 'warning-light')

export {
  notFound,
  dangerDark,
  dangerLight,
  successDark,
  successLight,
  warningDark,
  warningLight,
}

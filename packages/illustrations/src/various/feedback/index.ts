import { FEEDBACK_PATH, bucketLink } from '../../helper'

const dangerDark = bucketLink(FEEDBACK_PATH, 'danger-dark')
const dangerLight = bucketLink(FEEDBACK_PATH, 'danger-light')
const successDark = bucketLink(FEEDBACK_PATH, 'success-dark')
const successLight = bucketLink(FEEDBACK_PATH, 'success-light')
const warningDark = bucketLink(FEEDBACK_PATH, 'warning-dark')
const warningLight = bucketLink(FEEDBACK_PATH, 'warning-light')
const notFound = bucketLink(FEEDBACK_PATH, '404', 'svg')

export {
  notFound,
  dangerDark,
  dangerLight,
  successDark,
  successLight,
  warningDark,
  warningLight,
}

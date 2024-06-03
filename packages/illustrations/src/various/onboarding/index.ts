import { ONBOARDING_PATH, bucketLink } from '../../helper'

const cloud = bucketLink(ONBOARDING_PATH, 'cloud')
const email = bucketLink(ONBOARDING_PATH, 'email')
const forgotPassword = bucketLink(ONBOARDING_PATH, 'forgot-password')
const scaleway = bucketLink(ONBOARDING_PATH, 'scaleway')
const termsOfService = bucketLink(ONBOARDING_PATH, 'terms-of-service')

export { cloud, email, forgotPassword, scaleway, termsOfService }

/**
 * Check if the code is running on the client side. This is useful for checking if the code is running in the browser and not in SSR.
 */
export const isClientSide = !!(
  typeof window !== 'undefined' && window?.document?.createElement
)

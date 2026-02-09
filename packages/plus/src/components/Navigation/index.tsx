'use client'

import {
  NavigationProvider as NavigationProviderUV,
  Navigation as NavigationUV,
  useNavigation as useNavigationUV,
} from '@ultraviolet/ui/compositions/Navigation'

/**
 * @deprecated Use `Navigation` from `@ultraviolet/ui/composition/Navigation` instead
 */
export const Navigation: typeof NavigationUV = NavigationUV

/**
 * @deprecated Use `NavigationProvider` from `@ultraviolet/ui/composition/Navigation` instead
 */
export const NavigationProvider: typeof NavigationProviderUV =
  NavigationProviderUV

/**
 * @deprecated Use `useNavigation` from `@ultraviolet/ui/composition/Navigation` instead
 */
// oxlint-disable-next-line eslint-plugin-react-refresh/only-export-components
export const useNavigation: typeof useNavigationUV = useNavigationUV

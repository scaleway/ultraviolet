import deepmerge from 'deepmerge'
import { UltravioletUITheme } from './constants'
import { consoleLightTheme } from './themes'

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}

/**
 * Will extend theme with new theme properties
 * @param {RecursivePartial<UltravioletUITheme>} extendedTheme the properties of a new theme you want to apply from baseTheme
 */
export const extendTheme = (extendedTheme: RecursivePartial<UltravioletUITheme>): UltravioletUITheme =>
  deepmerge(consoleLightTheme, extendedTheme) as UltravioletUITheme

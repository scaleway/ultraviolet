import { theme } from '@ultraviolet/themes'
import { style } from '@vanilla-extract/css'

import {
  comboboxCreate,
  dropdown,
  dropdownCheckbox,
  dropdownContainer,
  dropdownContainerUnGrouped,
  dropdownEmptyState,
  dropdownGroup,
  dropdownGroupSelectable,
  dropdownGroupWrapper,
  dropdownInfo,
  dropdownInfoContainer,
  dropdownInfoTextItem,
  dropdownItem,
  dropdownItemBase,
  dropdownLoadMore,
  emptyStateGroupStyle,
  footer,
  searchBar,
} from './components/dropdown.css'
import {
  multiselectStack,
  placeholder,
  plusTag,
  selectBar,
  selectBarBase,
  selectBarTags,
  selectbarState,
  selectedValues,
} from './components/selectBar.css'

const container = style({ width: '100%' })
const helper = style({ paddingTop: theme.space['0.5'] })

export const selectInputStyle = {
  container,
  helper,
  dropdown,
  dropdownContainer,
  dropdownContainerUnGrouped,
  dropdownGroup,
  dropdownGroupSelectable,
  dropdownGroupWrapper,
  emptyStateGroupStyle,
  dropdownItem,
  dropdownItemBase,
  footer,
  dropdownCheckbox,
  dropdownEmptyState,
  dropdownLoadMore,
  dropdownInfo,
  dropdownInfoContainer,
  dropdownInfoTextItem,
  comboboxCreate,
  selectbarState,
  placeholder,
  selectBarBase,
  selectBar,
  selectBarTags,
  selectedValues,
  plusTag,
  multiselectStack,
  searchBar,
}

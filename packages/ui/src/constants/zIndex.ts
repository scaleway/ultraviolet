// Those values are used in each corresponding component
// Those component needs z-index as the portal is attached to the children container to keep accessibility working properly.
// Only tooltip is attached to document.body and do not need z-index
export const Z_INDEX = {
  menu: 1,
  popover: 1,
  modal: 1,
}

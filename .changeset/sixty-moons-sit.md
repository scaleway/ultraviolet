---
"@ultraviolet/ui": major
---


**BREAKING CHANGES**

Deprecated props removed:
- `Modal`: 
    - prop "customDialogBackdropStyles" removed -> use "backdropClassName" instead to style the backdrop
    - prop "customDialogStyles" removed -> use "customDialogStyles" instead to style the dialog
    - prop "width" removed -> use "size" instead (same possible values)
    - prop "opened" removed -> use "open" instead
    - prop "onOpen" removed -> use "show" instead (ModalState)
    - prop "onClose" removed -> use "close" instead (ModalState)
    - prop "hide" removed -> use "close" instead (ModalState)
- `RadioGroup.Radio`: prop "name" removed, it is automatically passed from the parent `RadioGroup`
- `Separator`: prop "color" removed -> use "sentiment" instead
- `Text`: prop "color" removed -> use "sentiment" instead
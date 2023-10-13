---
'@ultraviolet/ui': minor
---

Refactor `<Carousel />`:
- Remove border and other styles applied on `<Carousel.Item />` when hovering it.
- Add new prop `width` to `<Carousel.Item />` to set the width of the item. Default is `240px`.
- Use flexbox for structure instead of block elements.

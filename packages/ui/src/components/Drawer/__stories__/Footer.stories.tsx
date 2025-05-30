import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { DefaultDisclosure, Template } from './Template.stories'

export const Footer = Template.bind({})
const FooterComponent = () => (
  <Stack direction="row" justifyContent="end" gap="1">
    <Button sentiment="primary" variant="outlined" fullWidth>
      Secondary
    </Button>
    <Button sentiment="primary" variant="filled" fullWidth>
      Primary
    </Button>
  </Stack>
)

Footer.args = {
  disclosure: DefaultDisclosure,
  footer: <FooterComponent />,
  header: 'With a footer',
  size: 'small',
  children: (
    <Text as="p" variant="body" sentiment="neutral">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce iaculis non
      lectus sed sagittis. Etiam luctus velit ac semper accumsan. Orci varius
      natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      Proin ut nulla lacus. Nullam auctor dolor at euismod luctus. Suspendisse
      potenti. Ut vulputate pellentesque pharetra. Suspendisse eleifend ac urna
      eget pellentesque. Nulla facilisi. Morbi id neque eget mauris sodales
      tristique sit amet ut lacus. Nullam fringilla finibus massa, vel molestie
      sapien suscipit et. Aliquam blandit lectus sapien, nec venenatis risus
      vestibulum a. Nullam scelerisque leo at pharetra vestibulum. Quisque eget
      turpis eu tellus imperdiet ultricies. Aliquam cursus mattis vulputate.
      Etiam vulputate nunc vel eros luctus finibus. Vivamus efficitur dolor eu
      sem elementum condimentum. Suspendisse potenti. Ut vulputate pellentesque
      pharetra. Suspendisse eleifend ac urna eget pellentesque. Nulla facilisi.
      Morbi id neque eget mauris sodales tristique sit amet ut lacus. Nullam
      fringilla finibus massa, vel molestie sapien suscipit et. Aliquam blandit
      lectus sapien, nec venenatis risus vestibulum a. Nullam scelerisque leo at
      pharetra vestibulum. Quisque eget turpis eu tellus imperdiet ultricies.
      Aliquam cursus mattis vulputate. Etiam vulputate nunc vel eros luctus
      finibus. Vivamus efficitur dolor eu sem elementum condimentum.
    </Text>
  ),
}

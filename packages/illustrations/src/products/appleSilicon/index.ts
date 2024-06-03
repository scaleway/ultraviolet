import { bucketLinkProduct } from '../../helper'

const [
  appleSiliconContent,
  appleSiliconKeyvisual,
  appleSiliconOriginal,
  appleSiliconWire,
] = bucketLinkProduct('appleSilicon')

const [
  appleSiliconM2Content,
  appleSiliconM2Keyvisual,
  appleSiliconM2Original,
  appleSiliconM2Wire,
] = bucketLinkProduct('appleSiliconM2', 'appleSilicon')

export {
  appleSiliconOriginal,
  appleSiliconWire,
  appleSiliconKeyvisual,
  appleSiliconM2Content,
  appleSiliconM2Wire,
  appleSiliconContent,
  appleSiliconM2Keyvisual,
  appleSiliconM2Original,
}

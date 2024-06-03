import { bucketLinkProduct } from '../../helper'

const [dediboxContent, dediboxKeyvisual, dediboxOriginal, dediboxWire] =
  bucketLinkProduct('dedibox')

const [
  dediboxStoreContent,
  dediboxStoreKeyvisual,
  dediboxStoreOriginal,
  dediboxStoreWire,
] = bucketLinkProduct('dediboxStore', 'dedibox')

const [
  dediboxProContent,
  dediboxProKeyvisual,
  dediboxProOriginal,
  dediboxProWire,
] = bucketLinkProduct('dediboxPro', 'dedibox')

const [
  dediboxStartContent,
  dediboxStartKeyvisual,
  dediboxStartOriginal,
  dediboxStartWire,
] = bucketLinkProduct('dediboxStart', 'dedibox')

const [
  dediboxCoreContent,
  dediboxCoreKeyvisual,
  dediboxCoreOriginal,
  dediboxCoreWire,
] = bucketLinkProduct('dediboxCore', 'dedibox')

export {
  dediboxOriginal,
  dediboxContent,
  dediboxKeyvisual,
  dediboxWire,
  dediboxCoreContent,
  dediboxCoreOriginal,
  dediboxCoreKeyvisual,
  dediboxCoreWire,
  dediboxProContent,
  dediboxProOriginal,
  dediboxProKeyvisual,
  dediboxProWire,
  dediboxStartContent,
  dediboxStartOriginal,
  dediboxStartKeyvisual,
  dediboxStartWire,
  dediboxStoreContent,
  dediboxStoreOriginal,
  dediboxStoreKeyvisual,
  dediboxStoreWire,
}

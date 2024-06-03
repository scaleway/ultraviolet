import { bucketLinkProduct } from '../../helper'

const [instanceContent, instanceKeyvisual, instanceOriginal, instanceWire] =
  bucketLinkProduct('instance')

const [
  instancePopContent,
  instancePopKeyvisual,
  instancePopOriginal,
  instancePopWire,
] = bucketLinkProduct('instancePop', 'instance')

const [
  instanceWopContent,
  instanceWopKeyvisual,
  instanceWopOriginal,
  instanceWopWire,
] = bucketLinkProduct('instanceWop', 'instance')

const [
  instanceLearningContent,
  instanceLearningKeyvisual,
  instanceLearningOriginal,
  instanceLearningWire,
] = bucketLinkProduct('instanceLearning', 'instance')

const [
  instanceGpuContent,
  instanceGpuKeyvisual,
  instanceGpuOriginal,
  instanceGpuWire,
] = bucketLinkProduct('instanceGpu', 'instance')

const [
  instanceCopContent,
  instanceCopKeyvisual,
  instanceCopOriginal,
  instanceCopWire,
] = bucketLinkProduct('instanceCop', 'instance')

export {
  instanceContent,
  instanceCopContent,
  instanceCopKeyvisual,
  instanceCopOriginal,
  instanceCopWire,
  instanceGpuContent,
  instanceGpuKeyvisual,
  instanceGpuOriginal,
  instanceGpuWire,
  instanceKeyvisual,
  instanceLearningContent,
  instanceLearningKeyvisual,
  instanceLearningOriginal,
  instanceLearningWire,
  instanceOriginal,
  instancePopContent,
  instancePopKeyvisual,
  instancePopOriginal,
  instancePopWire,
  instanceWire,
  instanceWopContent,
  instanceWopKeyvisual,
  instanceWopOriginal,
  instanceWopWire,
}

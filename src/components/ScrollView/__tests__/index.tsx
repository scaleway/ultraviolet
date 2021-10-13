import React from 'react'
import ScrollView from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('ScrollView', () => {
  it(`renders correctly`, () =>
    shouldMatchEmotionSnapshot(
      <ScrollView>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel
        sem fermentum, blandit lacus et, eleifend velit. Donec semper sem eu
        risus pellentesque ullamcorper. Suspendisse eu varius urna. Suspendisse
        malesuada iaculis molestie. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Ut nisl sapien, vehicula ac sodales vitae, gravida non
        nunc. In id felis nec sapien mattis pellentesque. Proin diam erat,
        sagittis accumsan sem et, pellentesque accumsan nisl. Cras quis tellus
        neque. Nullam iaculis nunc eget fringilla pretium. Curabitur tempor
        molestie ultrices. Maecenas interdum, elit in pellentesque gravida,
        tortor purus euismod massa, eget tempor enim ante vel risus. Donec
        mattis, nunc sit amet venenatis gravida, ipsum urna commodo leo, at
        tincidunt turpis lectus vel nunc. Sed sollicitudin dolor sapien, eget
        hendrerit massa luctus et. Curabitur tellus ex, efficitur vel urna sit
        amet, faucibus convallis ipsum. Nullam eleifend non nulla vitae
        fringilla. Duis venenatis sem nec massa ornare accumsan. Duis mollis
        fringilla nisl, a efficitur urna. Ut eu egestas sapien, vitae posuere
        nunc. Nullam a metus et augue cursus ultrices quis vitae diam. Nullam
        mollis dolor metus, in ultricies mauris tempus quis. Pellentesque vel
        sollicitudin augue. Nunc in tellus lacus. Integer efficitur tellus
        congue, imperdiet eros et, luctus lectus. Proin gravida lacus eu dolor
        faucibus dapibus. Sed consectetur at eros ac congue. Sed suscipit enim
        et nunc placerat, ac hendrerit nisi sagittis. Pellentesque habitant
        morbi tristique senectus et netus et malesuada fames ac turpis egestas.
        Quisque a laoreet felis, et rutrum velit. Proin quis rutrum ex. Fusce ut
        sapien accumsan, sagittis leo id, fermentum arcu. Ut in orci et mi
        facilisis dictum. Nullam sagittis velit in est molestie interdum ac in
        ipsum. Curabitur aliquet vitae neque in placerat. Sed mattis neque eget
        metus placerat, ac consequat nunc commodo. Sed sit amet erat vel felis
        egestas vulputate. In id metus ac ante molestie lacinia. Cras dictum
        porttitor mattis. In hac habitasse platea dictumst. Sed sed tincidunt
        massa, accumsan posuere libero. Donec et aliquet justo, a ornare elit.
        Sed eu tellus diam. Suspendisse enim elit, sollicitudin vitae diam in,
        auctor eleifend sem. Nullam et enim in neque commodo feugiat. Nunc
        euismod, eros a fringilla pulvinar, urna magna tincidunt justo, vitae
        pretium est velit eget elit. Proin dapibus dictum dolor, convallis
        laoreet elit pretium et. Ut ornare erat arcu, vel venenatis est molestie
        vel. Duis lacinia velit nec arcu ultrices, nec porttitor ante vehicula.
        Sed congue, justo vitae luctus aliquet, dui eros tincidunt justo, ac
        sodales augue velit eget lacus. Sed in rutrum ante, vel dapibus diam.
        Vivamus fermentum imperdiet nisi convallis consectetur. Sed egestas enim
        at fringilla scelerisque. Donec sit amet neque magna. Interdum et
        malesuada fames ac ante ipsum primis in faucibus. Pellentesque pretium
        diam nec augue venenatis, eu pretium tortor euismod. Ut faucibus feugiat
        ante, eget pulvinar ligula accumsan in. Maecenas suscipit accumsan neque
        vitae maximus. Duis ac nibh augue. Nam a odio nec felis porta
        scelerisque. Nunc quis sagittis quam, sed posuere mi. Maecenas mattis
        vehicula est sed tempor. Nullam gravida quis erat in rhoncus. Morbi
        pharetra vel libero sit amet bibendum. Maecenas vestibulum justo ut
        velit tempor, et tempor lorem egestas. Ut a pretium tellus. Cras viverra
        orci tellus, in laoreet arcu porta ut. Quisque at suscipit tortor, a
        dapibus magna. Sed lobortis turpis at lectus faucibus ullamcorper. Ut
        interdum lobortis risus quis varius. Donec facilisis vel erat vitae
        fermentum. Praesent vehicula ante eu ante sollicitudin, cursus egestas
        felis imperdiet. Donec at ultricies nisi. Mauris quis tortor a metus
        fringilla efficitur. Aliquam non tincidunt nibh, at condimentum lorem.
        Vivamus malesuada dapibus tempus. Morbi vel semper risus, nec efficitur
        justo. Sed quis augue ut nisi condimentum ornare. Duis metus nulla,
        posuere et lobortis eget, vulputate dapibus ligula. Donec aliquet, justo
        eget faucibus mollis, elit nisl dapibus lorem, ac suscipit massa massa
        vel purus. Fusce tincidunt, dui nec consequat dapibus, arcu elit iaculis
        tortor, vel porttitor magna sem eget est. Aliquam eleifend velit turpis,
        maximus aliquam tortor interdum a. Mauris non leo et arcu luctus
        molestie. Morbi id sem sit amet arcu venenatis vulputate. Etiam placerat
        volutpat odio, vel posuere ante pharetra vitae. Ut velit tortor, posuere
        vitae erat at, maximus tempor tortor. Nullam facilisis urna a pharetra
        bibendum. Aliquam sed odio vitae elit consectetur fringilla. Duis nibh
        orci, gravida ac nibh non, rutrum cursus sem. Praesent lacus nibh,
        ultricies a efficitur ac, posuere sodales magna. Curabitur pellentesque
        massa ut efficitur suscipit. Aenean metus libero, lacinia eu nibh et,
        condimentum mollis magna. Aliquam erat volutpat. Maecenas vitae erat ac
        sem facilisis tincidunt. Morbi eros tellus, fringilla nec massa nec,
        volutpat ornare ligula. Suspendisse potenti. Pellentesque consequat nec
        diam vitae ornare. Duis aliquam condimentum massa. Morbi commodo neque
        vel tincidunt pellentesque. Donec quis neque non justo laoreet faucibus.
        Maecenas pharetra diam sem, id maximus neque venenatis id. Integer
        tristique libero vitae enim tristique rhoncus. Proin non tellus quis
        risus pretium blandit sit amet quis nisi. Sed eleifend vestibulum
        posuere. Ut erat elit, efficitur quis pellentesque non, interdum at
        lorem. Suspendisse interdum molestie dui, eu viverra nunc porta sit
        amet. Nunc malesuada lacus ac nulla dignissim, at pharetra mauris
        malesuada. In varius nibh in vulputate ornare. Integer ex tortor,
        lacinia a lorem a, commodo consectetur ante. Mauris eu mauris interdum
        lorem sodales tristique. Curabitur id tellus ante.
      </ScrollView>,
    ))
})

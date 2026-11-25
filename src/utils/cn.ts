import { extendTailwindMerge } from 'tailwind-merge'

// tailwind.config.js의 커스텀 fontSize를 알려줘야 text-색상 클래스와 충돌로 오인해서 지우지 않음
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'title-xl',
            'title-l',
            'title-m',
            'title-s',
            'body-m',
            'body-m-bold',
            'caption-m',
            'caption-r',
            'display',
            'micro',
          ],
        },
      ],
    },
  },
})

export const cn = (...classes: (string | false | null | undefined)[]) =>
  twMerge(classes.filter(Boolean).join(' '))
import type { MaybePromise } from '~/utils/typyng'
import type { AccordionItem } from '#ui/types'

export type FileAccordionItem = AccordionItem & {
  id: number
  children?: FileAccordionItem[]
  onDelete?: (item: FileAccordionItem) => MaybePromise<void>
  onClick?: (item: FileAccordionItem) => MaybePromise<void>
  label: string
}

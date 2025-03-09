import dayjs from 'dayjs'

import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

import 'dayjs/locale/ko'
dayjs.locale('ko')

export default dayjs

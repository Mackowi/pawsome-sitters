import { DateTime } from 'luxon'

const test = () => {
  const now = DateTime.now().toString()
  console.log(now)
}

export { test }

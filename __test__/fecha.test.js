const date = require("../api/services/today")

//import add from './suma'

test("Expect the actual date in format YYYYMMDD", () => {
  expect(date()).toBe('20190104')
  
})
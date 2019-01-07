const calculator = require("./suma")

//import add from './suma'

test("Add test  1 + 1 equals 3", () => {
  expect(calculator.add(1, 2)).toBe(3)
  
})

test("Add div  4 / 2 equals 2", () => {
  expect(calculator.div(4, 2)).toBe(2)
  
})
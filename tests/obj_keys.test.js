const {obj_keys} = require("../lib")

const obj = {
  a : 123,

  b : {
    1 : 2
  },

  c : 42
}

describe("#obj_keys", () => {
  it("returns object keys", () => {
    const expected = ['b', 'a', 'c']
    expect(obj_keys(obj)).toEqual(expected)
  })
})

const {merge_up, merge_children} = require("../lib")

describe("#merge_up", () => {
  it("merges child into object and deletes child", () => {
    var test = {1 : {2 : 3}};
    merge_up(test, 1)
    expect(test).toEqual({2 : 3})
  })
})

describe("merge_children", () => {
  it("merges up subobjects", () => {
    var test = {1 : 2, 3 : {4: 5}}
    merge_children(test)
    expect(test).toEqual({1 : 2, 4 : 5})
  })
})

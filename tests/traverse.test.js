const {traverse} = require("../lib")

const obj = {
  a : {
    b : {
      c : 123
    },

    d : 4.2,

    e : [
      ['a', 'b', 'c']
    ]
  }
}

describe("#traverse", () => {
  it("traverses object", () => {
    var results = [];
    traverse(obj, function(property, path, value, prent){
      results.push([property, path, value, prent])
    });

    expect(results[0]).toEqual(['a', '$.a',       obj.a,         obj])
    expect(results[1]).toEqual(['b', '$.a.b',     obj.a.b,       obj.a])
    expect(results[2]).toEqual(['c', '$.a.b.c',   obj.a.b.c,     obj.a.b])
    expect(results[3]).toEqual(['d', '$.a.d',     obj.a.d,       obj.a])
    expect(results[4]).toEqual(['e', '$.a.e',     obj.a.e,       obj.a])
    expect(results[5]).toEqual(['0', '$.a.e.0',   obj.a.e[0],    obj.a.e])
    expect(results[6]).toEqual(['0', '$.a.e.0.0', obj.a.e[0][0], obj.a.e[0]])
    expect(results[7]).toEqual(['1', '$.a.e.0.1', obj.a.e[0][1], obj.a.e[0]])
    expect(results[8]).toEqual(['2', '$.a.e.0.2', obj.a.e[0][2], obj.a.e[0]])
  })

  it("refreshes marked objects", () => {
    var results = [];
    traverse(obj, function(property, path, value, prent){
      results.push([property, path, value, prent])

      // change obj.a.d on first parse, mark to refresh
      if(value == 4.2){
        prent[property] = 2.4;
        return true;
      }
    });

    expect(results[0]).toEqual(['a', '$.a',        obj.a,         obj])
    expect(results[1]).toEqual(['b', '$.a.b',      obj.a.b,       obj.a])
    expect(results[2]).toEqual(['c', '$.a.b.c',    obj.a.b.c,     obj.a.b])
    expect(results[3]).toEqual(['d', '$.a.d',      4.2,           obj.a])
    expect(results[4]).toEqual(['b', '$.a.b',      obj.a.b,       obj.a])
    expect(results[5]).toEqual(['c', '$.a.b.c',    obj.a.b.c,     obj.a.b])
    expect(results[6]).toEqual(['d', '$.a.d',      obj.a.d,       obj.a])
    expect(results[7]).toEqual(['e', '$.a.e',      obj.a.e,       obj.a])
    expect(results[8]).toEqual(['0', '$.a.e.0',    obj.a.e[0],    obj.a.e])
    expect(results[9]).toEqual(['0', '$.a.e.0.0',  obj.a.e[0][0], obj.a.e[0]])
    expect(results[10]).toEqual(['1', '$.a.e.0.1', obj.a.e[0][1], obj.a.e[0]])
    expect(results[11]).toEqual(['2', '$.a.e.0.2', obj.a.e[0][2], obj.a.e[0]])
  })
})

var assert = require("./assert"),
    layout = require("..").layout,
    decode = require("graphlib").converter.json.decode,
    Digraph = require("graphlib").Digraph;

describe("layout", function() {
  it("preserves edge ids for graphs with edges spanning multiple ranks", function() {
    var g = new Digraph();
    g.addNode(1);
    g.addNode(2);
    g.addNode(3);
    g.addEdge("1->2", 1, 2);
    g.addEdge("2->3", 2, 3);
    g.addEdge("1->3", 1, 3);
    layout.apply(g);
    assert.include(g.edges(), "1->3");
  });

  it("preforms simple layout without error", function() {
    var nodes = [{id: 1, value: {width: 10, height: 10}},
                 {id: 2, value: {width: 10, height: 10}}];
    var edges = [{u: 1, v: 2}];

    var g = layout()
      .run(decode(nodes, edges));
    
    // Simple check. node 1 should be above node 2.
    var n1y = g.node(1).y;
    var n2y = g.node(2).y;
    assert.isTrue(n1y < n2y, "node(1).y (" + n1y + ") should be above node(2).y (" + n2y + ")");
  });
});

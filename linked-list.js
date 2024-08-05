import { inspect } from "util";

class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}
function returnPenultimateNode(node, lastNode) {
  if (node.nextNode === lastNode) {
    return node;
  } else return returnPenultimateNode(node.nextNode, lastNode);
}

class LinkedList {
  head = null;
  tail = null;

  append(value) {
    if (!this.head) {
      this.head = new Node(value, this.tail);
    } else if (this.head && !this.tail) {
      this.tail = new Node(value);
      this.head.nextNode = this.tail;
    } else {
      const node = new Node(this.tail.value, this.tail);
      const penultimateNode = returnPenultimateNode(this.head, this.tail);
      this.tail.value = value;
      penultimateNode.nextNode = node;
    }
  }

  prepend(value) {
    if (!this.head) {
      this.head = new Node(value, this.tail);
    } else if (this.head && !this.tail) {
      this.tail = new Node(this.head.value);
      this.head.value = value;
    } else {
      const node = new Node(this.head.value, this.head.nextNode);
      this.head.value = value;
      this.head.nextNode = node;
    }
  }
}

const list = new LinkedList();

list.append(100);
list.append(90);
list.append(80);
list.prepend("hello");
list.prepend("hi");

console.log(inspect(list, { showHidden: false, depth: null, colors: true }));

//1.append(value) adds a new node containing value to the end of the list
//2.prepend(value) adds a new node containing value to the start of the list
//3.size returns the total number of nodes in the list
//4.head returns the first node in the list

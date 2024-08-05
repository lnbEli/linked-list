import { inspect } from "util";

class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}
function returnPenultimateNode(node) {
  if (node.nextNode.nextNode === null) {
    return node;
  } else return returnPenultimateNode(node.nextNode);
}

function returnLinkedListLength(node, count = 0) {
  if (!node) {
    return count;
  } else {
    count++;
    return returnLinkedListLength(node.nextNode, count);
  }
}

function nodeAtIndex(node, index, count = 0) {
  if (node === null) {
    return null;
  } else if (index === count) {
    return node;
  } else {
    count++;
    return nodeAtIndex(node.nextNode, index, count);
  }
}

function listContainsValue(node, value) {
  if (!node) {
    return false;
  } else if (node.value === value) {
    return true;
  } else {
    return listContainsValue(node.nextNode, value);
  }
}

class LinkedList {
  headNode = null;
  tailNode = null;

  append(value) {
    if (!this.headNode) {
      this.headNode = new Node(value, this.tailNode);
    } else if (this.headNode && !this.tailNode) {
      this.tailNode = new Node(value);
      this.headNode.nextNode = this.tailNode;
    } else {
      const node = new Node(this.tailNode.value, this.tailNode);
      const penultimateNode = returnPenultimateNode(this.headNode);
      penultimateNode.nextNode = node;
      this.tailNode.value = value;
    }
  }

  prepend(value) {
    if (!this.headNode) {
      this.headNode = new Node(value, this.tailNode);
    } else if (this.headNode && !this.tailNode) {
      this.tailNode = new Node(this.headNode.value);
      this.headNode.value = value;
      this.headNode.nextNode = this.tailNode;
    } else {
      const node = new Node(this.headNode.value, this.headNode.nextNode);
      this.headNode.value = value;
      this.headNode.nextNode = node;
    }
  }

  size() {
    return returnLinkedListLength(this.headNode);
  }

  head() {
    return this.headNode;
  }

  tail() {
    return this.tailNode;
  }

  at(index) {
    return nodeAtIndex(this.headNode, index);
  }

  pop() {
    if (!this.headNode) {
      return;
    } else if (!this.headNode.nextNode) {
      this.headNode = null;
    } else if (!this.headNode.nextNode.nextNode) {
      //Why do I need to change both these refs
      this.tailNode = null;
      this.headNode.nextNode = null;
    } else {
      const penultimateNode = this.at(this.size() - 2);
      const antepenultimateNode = this.at(this.size() - 3);
      this.tailNode.value = penultimateNode.value;
      antepenultimateNode.nextNode = this.tailNode;
    }
  }

  contains(value) {
    return listContainsValue(this.headNode, value);
  }
}

const list = new LinkedList();

list.append(100);
list.append(90);
list.append(80);
list.append(70);
// list.prepend("hello");
// list.prepend("hi");
// list.pop();

console.log(inspect(list, { showHidden: false, depth: null, colors: true }));

console.log(list.contains(90));

//1.append(value) adds a new node containing value to the end of the list
//2.prepend(value) adds a new node containing value to the start of the list
//3.size returns the total number of nodes in the list
//4.head returns the first node in the list

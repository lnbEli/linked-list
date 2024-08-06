import { inspect } from "util";

class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}
// function returnPenultimateNode(node) {
//   if (node.nextNode.nextNode === null) {
//     return node;
//   } else return returnPenultimateNode(node.nextNode);
// }

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

function indexOfValue(node, value, count = 0) {
  if (!node) {
    return null;
  } else if (node.value === value) {
    return count;
  } else {
    count++;
    return indexOfValue(node.nextNode, value, count);
  }
}

function nodeValuesToString(node, string = "") {
  if (!node) {
    string += `null`;
    return string;
  } else {
    string += `( ${node.value} ) -> `;
    return nodeValuesToString(node.nextNode, string);
  }
}

class LinkedList {
  headNode = null;
  tailNode = null;

  append(value) {
    const newNode = new Node(value);
    if (!this.headNode) {
      this.headNode = newNode;
      this.tailNode = newNode;
    } else {
      this.tailNode.nextNode = newNode;
      this.tailNode = newNode;
    }
  }

  prepend(value) {
    const newNode = new Node(value, this.headNode);
    if (!this.tailNode) {
      this.tailNode = newNode;
    }
    this.headNode = newNode;
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
      this.tailNode = null;
    } else {
      let currentNode = this.headNode;
      while (currentNode.nextNode !== this.tailNode) {
        currentNode = currentNode.nextNode;
      }
      currentNode.nextNode = null;
      this.tailNode = currentNode;
    }
  }

  contains(value) {
    return listContainsValue(this.headNode, value);
  }

  find(value) {
    return indexOfValue(this.headNode, value);
  }

  toString() {
    return nodeValuesToString(this.headNode);
  }

  //if Added at Index that doesn't exist it will add to end of list
  insertAt(value, index) {
    if (index === 0) {
      this.prepend(value);
    } else if (index >= this.size()) {
      this.append(value);
    } else {
      const previousNode = this.at(index - 1);
      const newNode = new Node(value, previousNode.newNode);
      previousNode.nextNode = newNode;
    }
  }

  removeAt(index) {
    if (index === 0) {
      this.headNode.value = this.headNode.nextNode.value;
      this.headNode.nextNode = this.headNode.nextNode.nextNode;
    } else if (index >= this.size()) {
      console.error("An error occurred:", "Index doesn't exist");
    } else if (index === this.size() - 1) {
      const penultimateNode = this.at(this.size() - 2);
      const antepenultimateNode = this.at(this.size() - 3);
      this.tailNode.value = penultimateNode.value;
      antepenultimateNode.nextNode = this.tailNode;
    } else {
      const previousNode = this.at(index - 1);
      const currentNodeAtIndex = previousNode.nextNode;
      const nextNode = currentNodeAtIndex.nextNode;
      previousNode.nextNode = nextNode;
    }
  }
}

const list = new LinkedList();

list.append("Dixieland");
list.append("and");
list.append("Dixie");
// list.append("Swing");
// list.append("Bebop");
// list.append("Cool Jazz");
// list.append("Free Jazz");
// list.append("Fusion");

console.log(inspect(list, { showHidden: false, depth: null, colors: true }));

console.log(list.toString());

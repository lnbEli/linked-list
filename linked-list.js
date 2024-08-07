import Node from "./Node.js";

class LinkedList {
  constructor() {
    // Initialise the head and tail of the list as null
    this.headNode = null;
    this.tailNode = null;
  }

  // Method to append a new node with the given value to the end of the list
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
  // Method to prepend a new node with the given value to the start of the list
  prepend(value) {
    const newNode = new Node(value, this.headNode);
    if (!this.tailNode) {
      this.tailNode = newNode;
    }
    this.headNode = newNode;
  }
  // Method to calculate the size (length) of the list
  size(node = this.headNode, count = 0) {
    if (!node) {
      return count;
    } else {
      return this.size(node.nextNode, ++count);
    }
  }

  head() {
    return this.headNode;
  }

  tail() {
    return this.tailNode;
  }
  // Method to return the node at a specific index
  at(index, node = this.headNode, count = 0) {
    if (!node) {
      return null;
    } else if (index === count) {
      return node;
    } else {
      return this.at(index, node.nextNode, ++count);
    }
  }
  // Method to remove the last node from the list
  pop() {
    if (!this.headNode) {
      // If the list is empty
      return;
    } else if (!this.headNode.nextNode) {
      // If the list has only one node
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
  // Method to check if a value is contained in the list
  contains(value, node = this.headNode) {
    if (!node) {
      return false;
    } else if (node.value === value) {
      return true;
    } else {
      return this.contains(value, node.nextNode);
    }
  }
  // Method to find the index of the node containing a specific value
  find(value, node = this.headNode, count = 0) {
    if (!node) {
      return null;
    } else if (node.value === value) {
      return count;
    } else {
      return this.find(value, node.nextNode, ++count);
    }
  }
  // Method to convert the list to a string
  toString(node = this.headNode, string = "") {
    if (!node) {
      string += `null`;
      return string;
    } else {
      string += `( ${node.value} ) -> `;
      return this.toString(node.nextNode, string);
    }
  }

  // Method to insert a node at a specific index
  // If added at an index that doesn't exist, it will add to the end of the list
  insertAt(value, index) {
    if (index < 0) {
      console.error("An error occurred:", "Index must be positive integer");
    } else if (index === 0) {
      this.prepend(value);
    } else if (index >= this.size()) {
      this.append(value);
    } else {
      const previousNode = this.at(index - 1);
      const newNode = new Node(value, previousNode.nextNode);
      previousNode.nextNode = newNode;
    }
  }

  // Method to remove a node at a specific index
  removeAt(index) {
    if (!this.headNode) {
      console.error("An error occurred:", "List is empty");
    } else if (index === 0) {
      this.headNode = this.headNode.nextNode;
      if (!this.headNode) {
        this.tailNode = null;
      }
    } else if (index < 0 || index >= this.size()) {
      console.error("An error occurred:", "Index doesn't exist");
    } else {
      const previousNode = this.at(index - 1);
      const nodeToRemove = previousNode.nextNode;
      previousNode.nextNode = nodeToRemove.nextNode;

      if (nodeToRemove === this.tailNode) {
        this.tailNode = previousNode;
      }
    }
  }
}

const list = new LinkedList();

class Node {
  constructor(Node, value) {
    this.next = Node;
    this.value = value;
  }
}

class List {
  constructor(value) {
    this.root = new Node(null, value);
    this.amount = 1; //хранит количество элементов списка
  }
  addNode(value = 0, i = this.amount - 1) {
    if (i >= 0 && i < this.amount) {
      let temp = this.root;
      for (let j = 0; j < i; j++) {
        temp = temp.next;
      }
      let newNode = new Node(temp.next, value);
      temp.next = newNode;
      this.amount++;
      return true;
    }
    return false;
  }
  removeNode(i = this.amount - 1) {
    if (this.amount === 1 || i < 0 || i >= this.amount) {
      return false;
    }
    if (i < this.amount) {
      let temp = this.root;
      for (let j = 0; j < i - 1; j++) {
        temp = temp.next;
      }
      temp.next = temp.next.next;
      this.amount--;
      return true;
    }
  }
  print() {
    let temp = this.root;
    for (let j = 0; j < this.amount; j++) {
      console.log(temp.value);
      temp = temp.next;
    }
  }
}

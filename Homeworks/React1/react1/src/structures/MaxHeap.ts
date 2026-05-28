export class MaxHeap {
  private heap: Array<{ id: number; playCount: number }>;

  private clone(): MaxHeap {
    const copy = new MaxHeap();
    copy.buildFromArray([...this.heap]);
    return copy;
  }

  constructor() {
    this.heap = [];
  }

  insert(item: { id: number; playCount: number }): void {
    this.heap.push(item);
    this.heapifyUp(this.heap.length - 1);
  }

  private heapifyUp(index: number): void {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex].playCount >= this.heap[index].playCount) {
        break;
      }
      [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
      index = parentIndex;
    }
  }

  extractMax(): { id: number; playCount: number } | null {
    if (this.heap.length === 0) return null;
    const max = this.heap[0];
    const last = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.heapifyDown(0);
    }
    return max;
  }

  private heapifyDown(index: number): void {
    const length = this.heap.length;
    while (true) {
      let leftChildIdx = 2 * index + 1;
      let rightChildIdx = 2 * index + 2;
      let largestIdx = index;

      if (leftChildIdx < length && this.heap[leftChildIdx].playCount > this.heap[largestIdx].playCount) {
        largestIdx = leftChildIdx;
      }
      if (rightChildIdx < length && this.heap[rightChildIdx].playCount > this.heap[largestIdx].playCount) {
        largestIdx = rightChildIdx;
      }
      if (largestIdx === index) break;
      
      [this.heap[index], this.heap[largestIdx]] = [this.heap[largestIdx], this.heap[index]];
      index = largestIdx;
    }
  }

  getTopK(k: number): Array<{ id: number; playCount: number }> {
    const heapCopy = this.clone();
    const topK: Array<{ id: number; playCount: number }> = [];

    for (let i = 0; i < k && heapCopy.size() > 0; i++) {
      const max = heapCopy.extractMax();
      if (max) topK.push(max);
    }
    return topK;
  }

  buildFromArray(items: Array<{ id: number; playCount: number }>): void {
    this.heap = [...items];
    for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
      this.heapifyDown(i);
    }
  }

  size(): number {
    return this.heap.length;
  }
}
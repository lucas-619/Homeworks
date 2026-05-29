export interface ProductItem {
  name: string;
  popularity: number;
}

// MinHeap basado en popularidad (menor popularidad arriba)
export class MinHeap {
  private heap: ProductItem[];

  constructor() {
    this.heap = [];
  }

  size(): number {
    return this.heap.length;
  }

  peek(): ProductItem | null {
    return this.heap.length === 0 ? null : this.heap[0];
  }

  push(item: ProductItem): void {
    this.heap.push(item);
    this.bubbleUp(this.heap.length - 1);
  }

  pop(): ProductItem | null {
    if (this.heap.length === 0) return null;
    const min = this.heap[0];
    const last = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.sinkDown(0);
    }
    return min;
  }

  toArray(): ProductItem[] {
    return [...this.heap];
  }

  private bubbleUp(idx: number): void {
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      if (this.heap[parentIdx].popularity <= this.heap[idx].popularity) break;
      [this.heap[parentIdx], this.heap[idx]] = [this.heap[idx], this.heap[parentIdx]];
      idx = parentIdx;
    }
  }

  private sinkDown(idx: number): void {
    const length = this.heap.length;
    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let swapIdx = null;
      let currentPopularity = this.heap[idx].popularity;

      if (leftChildIdx < length && this.heap[leftChildIdx].popularity < currentPopularity) {
        swapIdx = leftChildIdx;
      }

      if (rightChildIdx < length) {
        const rightPopularity = this.heap[rightChildIdx].popularity;
        if ((swapIdx === null && rightPopularity < currentPopularity) ||
            (swapIdx !== null && rightPopularity < this.heap[leftChildIdx].popularity)) {
          swapIdx = rightChildIdx;
        }
      }

      if (swapIdx === null) break;
      [this.heap[idx], this.heap[swapIdx]] = [this.heap[swapIdx], this.heap[idx]];
      idx = swapIdx;
    }
  }
}
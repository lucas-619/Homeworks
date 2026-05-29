import type { ProductItem} from './Heap';
import { MinHeap } from './Heap';

// Obtiene los Top K elementos más populares usando un MinHeap
export function getTopKByPopularity(items: ProductItem[], k: number): ProductItem[] {
  if (!items.length || k <= 0) return [];

  const heap = new MinHeap();
  for (const item of items) {
    if (heap.size() < k) {
      heap.push(item);
    } else {
      const smallest = heap.peek();
      if (smallest && item.popularity > smallest.popularity) {
        heap.pop();
        heap.push(item);
      }
    }
  }

  // Extraer del heap y ordenar descendente
  const result: ProductItem[] = [];
  while (heap.size() > 0) {
    result.push(heap.pop()!);
  }
  return result.reverse(); // de mayor a menor popularidad
}
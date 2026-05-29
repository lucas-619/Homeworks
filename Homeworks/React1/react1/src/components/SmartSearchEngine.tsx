import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Trie } from '../data/Trie';
import type { ProductItem } from '../data/Heap';
import { getTopKByPopularity } from '../data/searchUtils';

const SmartSearchEngine: React.FC = () => {
  // Instancias almacenadas con useRef (persisten entre renders)
  const trieRef = useRef<Trie>(new Trie());
  const popularityMapRef = useRef<Map<string, number>>(new Map());

  // Estados del UI
  const [prefix, setPrefix] = useState<string>('');
  const [k, setK] = useState<number>(2);
  const [searchResults, setSearchResults] = useState<ProductItem[]>([]);
  const [allProducts, setAllProducts] = useState<ProductItem[]>([]);
  const [newProductName, setNewProductName] = useState<string>('');
  const [newProductPopularity, setNewProductPopularity] = useState<number>(0);

  // Actualiza la lista completa de productos (desde el mapa)
  const refreshProductList = useCallback(() => {
    const products: ProductItem[] = [];
    for (const [name, popularity] of popularityMapRef.current.entries()) {
      products.push({ name, popularity });
    }
    products.sort((a, b) => b.popularity - a.popularity);
    setAllProducts(products);
  }, []);

  // Ejecuta la búsqueda por prefijo y calcula el Top K
  const performSearch = useCallback(() => {
    const matchingNames = trieRef.current.getAllProductsWithPrefix(prefix);
    const items: ProductItem[] = [];
    for (const name of matchingNames) {
      const pop = popularityMapRef.current.get(name);
      if (pop !== undefined) items.push({ name, popularity: pop });
    }
    const topK = getTopKByPopularity(items, k);
    setSearchResults(topK);
  }, [prefix, k]);

  // Inserta o actualiza un producto
  const insertProduct = useCallback((name: string, popularity: number) => {
    if (!name.trim()) {
      alert('El nombre no puede estar vacío');
      return false;
    }
    if (isNaN(popularity) || popularity < 0) {
      alert('La popularidad debe ser un número positivo');
      return false;
    }
    trieRef.current.insert(name);
    popularityMapRef.current.set(name, popularity);
    refreshProductList();
    return true;
  }, [refreshProductList]);

  // Manejador de inserción desde el formulario
  const handleAddProduct = () => {
    const success = insertProduct(newProductName, newProductPopularity);
    if (success) {
      setNewProductName('');
      setNewProductPopularity(0);
      performSearch(); // actualiza resultados
    }
  };

  // Carga inicial con datos de ejemplo
  useEffect(() => {
    const defaultProducts: ProductItem[] = [
      { name: 'air max', popularity: 90 },
      { name: 'air force', popularity: 95 },
      { name: 'air jordan', popularity: 85 },
      { name: 'adidas boost', popularity: 80 },
    ];
    for (const prod of defaultProducts) {
      trieRef.current.insert(prod.name);
      popularityMapRef.current.set(prod.name, prod.popularity);
    }
    refreshProductList();
    performSearch();
  }, [performSearch, refreshProductList]);

  // Re-busca cuando cambia el prefijo o K
  useEffect(() => {
    performSearch();
  }, [prefix, k, performSearch]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🔍 Smart Search Engine</h1>
      <p style={styles.subtitle}>Trie + Heap (Top K por popularidad)</p>

      {/* Panel de inserción */}
      <div style={styles.card}>
        <h2>➕ Agregar / Actualizar producto</h2>
        <div style={styles.formRow}>
          <input
            type="text"
            placeholder="Nombre del producto (ej. air max)"
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}
            style={styles.input}
          />
          <input
            type="number"
            placeholder="Popularidad"
            value={newProductPopularity}
            onChange={(e) => setNewProductPopularity(parseInt(e.target.value) || 0)}
            style={styles.inputSmall}
          />
          <button onClick={handleAddProduct} style={styles.button}>Insertar</button>
        </div>
      </div>

      {/* Panel de búsqueda */}
      <div style={styles.card}>
        <h2>🔎 Buscar por prefijo + Top K</h2>
        <div style={styles.formRow}>
          <input
            type="text"
            placeholder="Prefijo (ej. air)"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            style={styles.input}
          />
          <div style={styles.kWrapper}>
            <label style={styles.label}>Top K: </label>
            <input
              type="number"
              min="1"
              value={k}
              onChange={(e) => setK(Math.max(1, parseInt(e.target.value) || 1))}
              style={styles.inputK}
            />
          </div>
        </div>
        <div style={styles.resultsBox}>
          <h3>✨ Resultados (Top {k})</h3>
          {searchResults.length === 0 ? (
            <p style={styles.emptyMessage}>No hay productos que coincidan con "{prefix}"</p>
          ) : (
            <ul style={styles.list}>
              {searchResults.map((item, idx) => (
                <li key={idx} style={styles.listItem}>
                  <span>{item.name}</span>
                  <span style={styles.popularityBadge}>⭐ {item.popularity}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Listado completo de productos */}
      <div style={styles.card}>
        <h2>📦 Inventario completo</h2>
        <div style={styles.productGrid}>
          {allProducts.map((prod, idx) => (
            <div key={idx} style={styles.productCard}>
              <span>{prod.name}</span>
              <span style={styles.popularityBadge}>🔥 {prod.popularity}</span>
            </div>
          ))}
          {allProducts.length === 0 && <p>No hay productos aún. Agrega algunos.</p>}
        </div>
      </div>
    </div>
  );
};

// Estilos inline (puedes moverlos a un archivo CSS si prefieres)
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '24px 20px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '600',
    textAlign: 'center',
    color: '#0f172a',
    marginBottom: '4px',
  },
  subtitle: {
    textAlign: 'center',
    color: '#475569',
    marginBottom: '32px',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '20px 24px',
    marginBottom: '28px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    border: '1px solid #e2e8f0',
  },
  formRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    alignItems: 'center',
    marginTop: '12px',
  },
  input: {
    flex: '2',
    minWidth: '180px',
    padding: '10px 14px',
    borderRadius: '12px',
    border: '1px solid #cbd5e1',
    fontSize: '1rem',
    backgroundColor: '#fff',
  },
  inputSmall: {
    width: '110px',
    padding: '10px 12px',
    borderRadius: '12px',
    border: '1px solid #cbd5e1',
    fontSize: '1rem',
  },
  inputK: {
    width: '80px',
    padding: '10px 8px',
    borderRadius: '12px',
    border: '1px solid #cbd5e1',
    fontSize: '1rem',
    textAlign: 'center',
  },
  kWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: '#f1f5f9',
    padding: '2px 12px',
    borderRadius: '40px',
  },
  label: {
    fontWeight: '500',
    color: '#334155',
  },
  button: {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '40px',
    padding: '10px 24px',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  resultsBox: {
    marginTop: '20px',
    backgroundColor: '#fefce8',
    padding: '16px',
    borderRadius: '20px',
    border: '1px solid #fde047',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    marginBottom: '8px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    fontWeight: '500',
  },
  popularityBadge: {
    backgroundColor: '#facc15',
    padding: '4px 12px',
    borderRadius: '30px',
    fontSize: '0.8rem',
    fontWeight: '600',
    color: '#422006',
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#64748b',
    padding: '24px',
  },
  productGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '12px',
  },
  productCard: {
    backgroundColor: '#f1f5f9',
    padding: '8px 16px',
    borderRadius: '40px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '0.9rem',
    fontWeight: '500',
    color: '#0f172a',
  },
};

export default SmartSearchEngine;
import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import './Shop.css'; // optional, create styles as needed

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cartCtx = useContext(CartContext);
  const addToCart = cartCtx?.addToCart ?? (() => {});

  useEffect(() => {
    let mounted = true;
    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);
        // adjust endpoint to your API or import a local JSON
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error(`Failed to load (${res.status})`);
        const data = await res.json();
        if (mounted) setProducts(data);
      } catch (err) {
        if (mounted) setError(err.message || 'Failed to load products');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadProducts();
    return () => { mounted = false; };
  }, []);

  if (loading) return <main style={{ padding: 24 }}>Loading products…</main>;
  if (error) return <main style={{ padding: 24 }}>Error: {error}</main>;

  return (
    <main style={{ padding: '2rem', maxWidth: 1100, margin: '0 auto' }}>
      <h1>Shop</h1>
      <p>Explore our small-batch coffees — roast profiles and tasting notes below.</p>

      <div className="product-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1rem',
        marginTop: '1.25rem'
      }}>
        {products.map(product => (
          <article key={product.id} className="product-card" style={{
            border: '1px solid #eee',
            borderRadius: 8,
            padding: '0.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 6 }} />
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: '0.25rem 0' }}>{product.name}</h3>
              <p style={{ margin: '0.25rem 0', color: '#555', fontSize: '0.9rem' }}>{product.shortDescription || product.description}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
              <strong>${(product.price ?? 0).toFixed(2)}</strong>
              <button
                onClick={() => addToCart(product, 1)}
                style={{
                  background: '#4b2e19',
                  color: '#fff',
                  border: 'none',
                  padding: '0.4rem 0.7rem',
                  borderRadius: 20,
                  cursor: 'pointer'
                }}
              >
                Add
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
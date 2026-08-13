import { useState, useMemo } from "react";

const ink = "#20281F";
const paper = "#F5F3EE";
const green = "#3B5D3A";
const greenDark = "#28402A";
const brass = "#B98F4A";
const rust = "#A6452E";
const line = "#DEDAD0";

const PRODUCTS = [
  { id: 1, name: "Monstera Deliciosa", price: 42, stock: 6, tag: "Bestseller", img: "🌿" },
  { id: 2, name: "Terracotta Planter, 8in", price: 18, stock: 14, tag: null, img: "🪴" },
  { id: 3, name: "Fiddle Leaf Fig", price: 65, stock: 2, tag: "Low stock", img: "🌱" },
  { id: 4, name: "Brass Watering Can", price: 34, stock: 9, tag: null, img: "🫗" },
  { id: 5, name: "Snake Plant", price: 28, stock: 11, tag: null, img: "🌵" },
  { id: 6, name: "Ceramic Hanging Pot", price: 22, stock: 0, tag: "Sold out", img: "🏺" },
];

function Badge({ tag }) {
  if (!tag) return null;
  const isLow = tag === "Low stock" || tag === "Sold out";
  return (
    <span
      style={{
        fontSize: 11,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        padding: "3px 8px",
        borderRadius: 999,
        color: isLow ? rust : greenDark,
        background: isLow ? "#F3DDD6" : "#DCE6D9",
        fontWeight: 600,
      }}
    >
      {tag}
    </span>
  );
}

function ProductCard({ product, onAdd }) {
  const soldOut = product.stock === 0;
  return (
    <div
      style={{
        background: "#fff",
        border: `1px solid ${line}`,
        borderRadius: 4,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div
        style={{
          height: 140,
          background: paper,
          borderRadius: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 48,
        }}
      >
        {product.img}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{ margin: 0, fontWeight: 600, fontSize: 15, color: ink }}>{product.name}</p>
          <p style={{ margin: "2px 0 0", fontSize: 13, color: "#6B6F65", fontFamily: "monospace" }}>
            {soldOut ? "—" : `${product.stock} left`}
          </p>
        </div>
        <Badge tag={product.tag} />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
        <span style={{ fontSize: 16, fontWeight: 600, color: ink }}>${product.price}</span>
        <button
          onClick={() => onAdd(product)}
          disabled={soldOut}
          style={{
            fontSize: 13,
            fontWeight: 600,
            padding: "7px 14px",
            borderRadius: 3,
            border: "none",
            cursor: soldOut ? "not-allowed" : "pointer",
            background: soldOut ? "#E4E1D8" : green,
            color: soldOut ? "#9B988E" : "#fff",
          }}
        >
          {soldOut ? "Sold out" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}

function CartDrawer({ open, items, onClose, onQty, onRemove, total }) {
  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: open ? "rgba(0,0,0,0.35)" : "transparent",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.2s ease",
          zIndex: 10,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          height: "100%",
          width: 320,
          maxWidth: "85%",
          background: "#fff",
          borderLeft: `1px solid ${line}`,
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.25s ease",
          zIndex: 11,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ padding: 16, borderBottom: `1px solid ${line}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ margin: 0, fontWeight: 600, color: ink }}>Your cart</p>
          <button onClick={onClose} style={{ border: "none", background: "none", fontSize: 18, cursor: "pointer", color: "#6B6F65" }}>×</button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 14 }}>
          {items.length === 0 && (
            <p style={{ color: "#9B988E", fontSize: 14, textAlign: "center", marginTop: 40 }}>
              Nothing here yet. Add a plant to get started.
            </p>
          )}
          {items.map((item) => (
            <div key={item.id} style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div style={{ fontSize: 28, width: 44, textAlign: "center" }}>{item.img}</div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600, color: ink }}>{item.name}</p>
                <p style={{ margin: "2px 0 0", fontSize: 12.5, color: "#6B6F65" }}>${item.price}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <button onClick={() => onQty(item.id, -1)} style={stepperBtn}>−</button>
                <span style={{ fontSize: 13, width: 16, textAlign: "center" }}>{item.qty}</span>
                <button onClick={() => onQty(item.id, 1)} style={stepperBtn}>+</button>
              </div>
              <button onClick={() => onRemove(item.id)} style={{ border: "none", background: "none", color: rust, fontSize: 12, cursor: "pointer" }}>
                Remove
              </button>
            </div>
          ))}
        </div>

        <div style={{ padding: 16, borderTop: `1px solid ${line}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 14, color: "#6B6F65" }}>Total</span>
            <span style={{ fontSize: 16, fontWeight: 600, color: ink }}>${total}</span>
          </div>
          <button
            disabled={items.length === 0}
            style={{
              width: "100%",
              padding: "11px 0",
              border: "none",
              borderRadius: 3,
              fontWeight: 600,
              fontSize: 14,
              cursor: items.length === 0 ? "not-allowed" : "pointer",
              background: items.length === 0 ? "#E4E1D8" : green,
              color: items.length === 0 ? "#9B988E" : "#fff",
            }}
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}

const stepperBtn = {
  width: 22,
  height: 22,
  borderRadius: "50%",
  border: `1px solid ${line}`,
  background: "#fff",
  cursor: "pointer",
  fontSize: 13,
  lineHeight: 1,
};

export default function Shop() {
  const [cart, setCart] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setDrawerOpen(true);
  };

  const changeQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const removeItem = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const total = useMemo(() => cart.reduce((sum, i) => sum + i.price * i.qty, 0), [cart]);
  const cartCount = useMemo(() => cart.reduce((sum, i) => sum + i.qty, 0), [cart]);

  return (
    <div style={{ position: "relative", background: paper, minHeight: "100%", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 28px", borderBottom: `1px solid ${line}` }}>
        <span style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 700, color: ink, letterSpacing: "0.02em" }}>
          GREENHOUSE
        </span>
        <button
          onClick={() => setDrawerOpen(true)}
          style={{ position: "relative", border: `1px solid ${line}`, background: "#fff", borderRadius: 3, padding: "8px 14px", cursor: "pointer", fontSize: 13, fontWeight: 600, color: ink }}
        >
          Cart
          {cartCount > 0 && (
            <span style={{ marginLeft: 6, background: green, color: "#fff", borderRadius: 999, padding: "1px 7px", fontSize: 11 }}>
              {cartCount}
            </span>
          )}
        </button>
      </div>

      <div style={{ padding: "36px 28px 24px" }}>
        <p style={{ margin: 0, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: brass, fontWeight: 600 }}>
          New arrivals, watered weekly
        </p>
        <h1 style={{ margin: "8px 0 0", fontFamily: "Georgia, serif", fontSize: 34, color: ink, maxWidth: 480, lineHeight: 1.15 }}>
          Plants and pots for people who forget to water them.
        </h1>
      </div>

      <div
        style={{
          padding: "8px 28px 40px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 16,
        }}
      >
        {PRODUCTS.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={addToCart} />
        ))}
      </div>

      <CartDrawer
        open={drawerOpen}
        items={cart}
        onClose={() => setDrawerOpen(false)}
        onQty={changeQty}
        onRemove={removeItem}
        total={total}
      />
    </div>
  );
}
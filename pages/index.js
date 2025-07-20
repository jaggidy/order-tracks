
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

export default function Home() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([
    {
      id: "AMZ123456",
      store: "Amazon",
      date: "2025-07-10",
      delivered: false,
      items: [
        { name: "Wireless Mouse", tracking: "1Z999AA10123456784", status: "In Transit" },
        { name: "USB-C Cable", tracking: "", status: "Pending" }
      ]
    }
  ]);

  const toggle = (id) => {
    setOrders(prev => prev.map(order =>
      order.id === id ? { ...order, open: !order.open } : order
    ));
  };

  return (
    <main style={{ fontFamily: 'Arial', padding: 24 }}>
      <h1>Order Tracker</h1>
      {!session ? (
        <button onClick={() => signIn("google")}>Sign in with Google</button>
      ) : (
        <>
          <p>Welcome, {session.user.name}</p>
          <button onClick={() => signOut()}>Sign out</button>
          {orders.map(order => (
            <div key={order.id} style={{
              border: '1px solid #ccc',
              borderRadius: 8,
              marginBottom: 16,
              backgroundColor: order.delivered ? '#e6ffed' : '#fff0f0',
              padding: 16
            }}>
              <div onClick={() => toggle(order.id)} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                {order.store} — Order #{order.id}
              </div>
              {order.open && (
                <ul>
                  {order.items.map((item, i) => (
                    <li key={i}>
                      {item.name} — {item.tracking || "No tracking yet"} ({item.status})
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </>
      )}
    </main>
  );
}

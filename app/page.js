'use client';
export const dynamic = 'force-dynamic'

import { useSession, signIn, signOut } from 'next-auth/react'
import { useState } from 'react'

export default function Page() {
  const { data: session } = useSession()
  const [orders, setOrders] = useState(null)

  // Функция для загрузки писем‑заказов
  const loadFromGmail = async () => {
    const res = await fetch('/api/gmail')
    if (!res.ok) {
      alert('Ошибка при получении писем: ' + res.status)
      return
    }
    setOrders(await res.json())
  }

  if (!session) {
    return (
      <main style={{ padding: 32 }}>
        <h1>Order Tracker</h1>
        <button onClick={() => signIn('google')}>
          Sign in with Google
        </button>
      </main>
    )
  }

  return (
    <main style={{ padding: 32 }}>
      <h1>Order Tracker</h1>
      <p>Welcome, {session.user.name}</p>
      <button onClick={() => signOut()}>Sign out</button>

      <hr style={{ margin: '24px 0' }} />

      <button onClick={loadFromGmail}>
        Import orders from Gmail
      </button>

      {orders && (
        <div style={{ marginTop: 16 }}>
          {orders.map((o) => (
            <div key={o.id} style={{ marginBottom: 16 }}>
              <h3>Order #{o.orderNumber}</h3>
              <ul>
                {o.products.map((p, i) => (
                  <li key={i}>
                    {p.name} — {p.tracking || 'No tracking yet'}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

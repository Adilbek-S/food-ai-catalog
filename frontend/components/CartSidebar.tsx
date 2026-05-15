'use client';

import { useCart } from '@/lib/cart-context';

export default function CartSidebar() {
  const { items, totalItems, totalPrice, isOpen, toggleCart, removeItem, clearCart } = useCart();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={toggleCart}
        />
      )}

      {/* Panel */}
      <aside
        className={`cart-sidebar fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-white shadow-2xl ${
          isOpen ? 'cart-sidebar-open' : 'cart-sidebar-closed'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-slate-900 px-5 py-4">
          <h2 className="text-lg font-bold text-white">
            Корзина
            {totalItems > 0 && (
              <span className="ml-2 rounded-full bg-orange-500 px-2 py-0.5 text-xs font-bold">{totalItems}</span>
            )}
          </h2>
          <button onClick={toggleCart} className="text-slate-400 hover:text-white transition-colors" aria-label="Закрыть">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-400">
              <span className="text-5xl">🛒</span>
              <p className="text-sm">Корзина пуста</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item.id} className="flex items-start gap-3 rounded-xl border border-slate-100 p-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 line-clamp-1">{item.item_name}</p>
                    <p className="text-xs text-gray-400 line-clamp-1">{item.restaurant_name}</p>
                    <p className="mt-1 text-sm font-medium text-orange-600">
                      {(item.item_price * item.quantity).toLocaleString('ru-RU')} ₸
                      {item.quantity > 1 && (
                        <span className="ml-1 text-xs text-gray-400">× {item.quantity}</span>
                      )}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="shrink-0 rounded-lg p-1 text-gray-300 hover:bg-red-50 hover:text-red-500 transition-colors"
                    aria-label="Удалить"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-slate-100 px-5 py-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Итого</span>
              <span className="text-lg font-bold text-gray-900">
                {totalPrice.toLocaleString('ru-RU')} ₸
              </span>
            </div>
            <button
              onClick={() => clearCart()}
              className="w-full rounded-xl border border-red-200 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-50"
            >
              Очистить корзину
            </button>
            <button className="w-full rounded-xl bg-orange-500 py-3 text-sm font-bold text-white transition hover:bg-orange-600 active:scale-[0.98]">
              Оформить заказ
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

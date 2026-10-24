'use client';
import Image from "next/image";

interface ProductsInCartProps {
  id: number;
  name: string;
  price: number;
  count: number;
  image: {
    thumbnail: string;
  };
}

interface ConfirmedOrderProps {
  isOrderConfirmed: boolean;
  startNewOrder: () => void;
  productsInCart: ProductsInCartProps[];
}

export default function ConfirmedOrder({
  isOrderConfirmed,
  productsInCart,
  startNewOrder,
}: ConfirmedOrderProps) {
  const priceTotal = productsInCart.reduce(
    (total, product) => total + product.price * product.count,
    0,
  );

  return (
    <>
      {isOrderConfirmed && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 flex flex-col gap-4 shadow-2xl">
            
            <div className="w-10 h-10 rounded-full border-2 border-green-500 flex items-center justify-center text-green-500 text-xl font-bold bg-green-50">
              ✓
            </div>

            
            <div>
              <h2 className="text-3xl font-bold text-[#260f0d]">Order Confirmed</h2>
              <p className="text-gray-500 text-sm mt-1">We hope you enjoy your food!</p>
            </div>

            <div className="bg-[#fcf8f5] p-4 rounded-xl flex flex-col gap-3 max-h-60 overflow-y-auto">
              {productsInCart.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center justify-between border-b border-gray-200/60 pb-3 last:border-none last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <Image 
                      src={item.image.thumbnail} 
                      width={48} 
                      height={48} 
                      alt={item.name} 
                      className="rounded-lg object-cover w-12 h-12" 
                    />
                    <div>
                      <p className="font-semibold text-sm text-[#260f0d]">{item.name}</p>
                      <div className="flex gap-3 text-xs mt-0.5">
                        <span className="text-[#c73a0f] font-bold">{item.count}x</span>
                        <span className="text-gray-400">@ ${item.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <p className="font-semibold text-[#260f0d] text-sm">
                    ${(item.price * item.count).toFixed(2)}
                  </p>
                </div>
              ))}

              <div className="flex justify-between items-center pt-3 border-t border-gray-200 mt-2">
                <span className="text-xs font-medium text-gray-500">Order Total</span>
                <span className="text-xl font-bold text-[#260f0d]">
                  ${priceTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={startNewOrder}
              className="w-full bg-[#c73a0f] hover:bg-[#a12e0b] text-white font-semibold py-3 rounded-full transition-colors cursor-pointer mt-2 shadow-sm active:scale-95 transition-all"
            >
              Start New Order
            </button>

          </div>
        </div>
      )}
    </>
  );
}
"use client";
import React, { useEffect, useState } from "react";
import { Trash } from "lucide-react";
type Product = {
  id: string;
  thumbnail: string;
  title: string;
  category: string;
  price: number;
  quantity: number;
};
export default function CartPage() {
    const [cart, setCart] = useState<Product[]>([]);
    // Load cart from localStorage
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCart(storedCart);
    }, []);
    // Update quantity
    const updateQuantity = (id: string, amount: number) => {
        const updatedCart = cart.map((item) =>
        item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + amount) }
            : item
        );
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };
    // Remove item
    const removeItem = (id: string) => {
        const updatedCart = cart.filter((item) => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };
    // Total price
    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,0
    );
    return (
        <div className="bg-[#F9FBFF] min-h-screen p-4 md:p-10">
        <h1 className="text-2xl md:text-4xl font-bold mb-6">Your Cart</h1>
        {cart.length === 0 ? (
            <p className="text-center text-gray-500">Cart is empty</p>
        ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
                {cart.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-xl shadow flex gap-4 items-center">
                    <img src={item.thumbnail} className="w-20 h-20 object-cover rounded-lg" />
                    <div className="flex-1">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-gray-500">${item.price}</p>
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-2">
                        <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1 bg-gray-200 rounded">
                        -
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1 bg-gray-200 rounded">
                        +
                        </button>
                    </div>
                    </div>
                    {/* Remove */}
                    <button onClick={() => removeItem(item.id)} className="text-red-500 hover:cursor-pointer">
                        <Trash />
                    </button>
                </div>
                ))}
            </div>
            {/* Summary */}
            <div className="bg-white p-6 rounded-xl shadow h-fit">
                <h2 className="text-xl font-semibold mb-4">Summary</h2>
                <p className="mb-2">
                Total Items:{" "}
                <span className="font-medium">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
                </p>
                <p className="mb-4 text-lg font-bold">
                Total: ${total.toFixed(2)}
                </p>
                <button className="w-full bg-[#005EB8] text-white py-2 rounded-lg">
                    Checkout
                </button>
            </div>
            </div>
        )}
        </div>
    );
}
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
  images: string[];
};
export default function ProductPage() {
    const params = useParams();
    const id = params.id;
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getProduct = async () => {
        try {
            const res = await fetch(`https://dummyjson.com/products/${id}`);
            const data = await res.json();
            setProduct(data);
        } 
        catch (error) {
            console.error(error);
        } 
        finally {
            setLoading(false);
        }
        };
        if(id) getProduct();
    }, [id]);
    // Add to cart
    const handleAddToCart = () => {
        if (!product) return;
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const existingIndex = cart.findIndex(
        (item: any) => item.id === product.id
        );
        if(existingIndex !== -1) {
        cart[existingIndex].quantity += quantity;
        } 
        else {
        cart.push({ ...product, quantity });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Added to cart");
    };
    if(loading) return <p className="p-10">Loading...</p>;
    if(!product) return <p className="p-10">Product not found</p>;
    return (
        <div className="bg-[#F9FBFF] min-h-screen px-4 md:px-10 py-6">
            <div className="max-w-6xl mx-auto bg-white p-4 md:p-8 rounded-xl shadow grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image Section */}
                <div className="flex flex-col md:flex-row gap-4"> 
                    {/* Thumbnails */}
                    <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
                        {product.images?.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                className="w-16 h-16 md:w-20 md:h-20 object-cover border rounded-lg cursor-pointer hover:border-blue-500 transition"
                            />
                        ))}
                    </div>
                    {/* Main Image */}
                    <div className="flex-1">
                        <img src={product.thumbnail} className="w-full h-64 md:h-96 object-cover rounded-xl shadow-sm" />
                    </div>
                </div>
                {/* Details Section */}
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold mb-2">
                            {product.title}
                        </h1>
                        <p className="text-gray-500 mb-3 capitalize">
                            Category: {product.category}
                        </p>
                        <p className="text-2xl font-bold text-[#005EB8] mb-4">
                            ${product.price}
                        </p>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            {product.description}
                        </p>
                    </div>
                    {/* Quantity + CTA */}
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 hover:cursor-pointer transition">
                                -
                            </button>
                            <span className="text-lg font-medium">{quantity}</span>
                            <button onClick={() => setQuantity((q) => q + 1)} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 hover:cursor-pointer transition">
                                +
                            </button>
                        </div>
                        <button onClick={handleAddToCart} className="w-full md:w-auto bg-[#005EB8] hover:bg-[#004a91] hover:cursor-pointer text-white px-8 py-3 rounded-lg font-medium transition">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
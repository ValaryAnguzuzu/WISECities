// pages/index.tsx
import React from "react";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";

const products = [
  {
    name: "Apple Airpods",
    description: "2nd Generation Airpods with charging case",
    price: 199.99,
    imageUrl: "/images/headphones.jpg",
  },
  {
    name: "Smart Watch",
    description: "Fitness tracker with heart rate monitor",
    price: 249.99,
    imageUrl: "/images/smartwatch.jpg",
  },
  {
    name: "Bluetooth Speaker",
    description: "Portable speaker with 20hr battery life",
    price: 89.99,
    imageUrl: "/images/speaker.jpg",
  },
  {
    name: "USB-C Hub",
    description: "6-in-1 adapter with HDMI and Ethernet",
    price: 49.99,
    imageUrl: "/images/hub.jpg",
  },
  {
    name: "Noise Cancelling Headphones",
    description: "Premium over-ear headphones with ANC",
    price: 299.99,
    imageUrl: "/images/headphones.jpg",
  },
  {
    name: "Mini Projector",
    description: "Compact projector for home cinema",
    price: 129.99,
    imageUrl: "/images/speaker.jpg",
  },
];

export default function HomePage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Not Amazon</h1>
        <div className="relative">
          <Image
            src="/icons/cart.svg"
            alt="Cart"
            width={24}
            height={24}
            className="cursor-pointer"
          />
          <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full px-1.5">
            5
          </span>
        </div>
      </div>

      {/* Hero Image */}
      <div className="mb-10 aspect-[3/1] rounded-xl overflow-hidden relative">
        <Image
          src="/images/headphones.jpg"
          alt="Hero Product"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </main>
  );
}

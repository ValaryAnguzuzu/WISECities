// components/ProductCard.tsx
import Image from "next/image";
import { Button } from "@/components/ui/button";

type ProductCardProps = {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

export default function ProductCard({
  name,
  description,
  price,
  imageUrl,
}: ProductCardProps) {
  return (
    <div className="rounded-2xl shadow-md bg-white p-4 flex flex-col">
      <div className="aspect-[4/3] relative rounded-xl overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
        />
      </div>

      <div className="mt-4 flex-1">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-500 line-clamp-3">{description}</p>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-base font-bold">${price.toFixed(2)}</span>
        <Button>Add to Cart</Button>
      </div>
    </div>
  );
}

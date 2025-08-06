'use client'
import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button"

interface BtnCountProps {
  productId: number;
  price: number;
  onCountChange: (productId: number, count: number, price: number) => void;
  initialCount?: number;
  maxCount?: number;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'premium' | 'minimal';
}

const  BtnCount = (
    { 
    productId, 
    onCountChange, 
    price,
    initialCount = 0,
    maxCount = 99,
    disabled = false,
    size = 'md',
    variant = 'premium'
  }: BtnCountProps
  ) => {
  const [count, setCount] = useState(initialCount);

  const increase = () => {
    if (count < maxCount && !disabled) {
      const newCount = count + 1;
      setCount(newCount);
      onCountChange(productId, newCount, price);
    }
  };

  const decrease = () => {
    if (count > 0 && !disabled) {
      const newCount = count - 1;
      setCount(newCount);
      onCountChange(productId, newCount, price);
    }
  };

  // Styles selon la taille
  const sizeStyles = {
    sm: {
      container: "p-2",
      button: "h-7 w-7 p-0",
      text: "text-sm min-w-[20px]",
      icon: "h-3 w-3"
    },
    md: {
      container: "p-3",
      button: "h-9 w-9 p-0",
      text: "text-lg min-w-[24px]",
      icon: "h-4 w-4"
    },
    lg: {
      container: "p-4",
      button: "h-12 w-12 p-0",
      text: "text-xl min-w-[32px]",
      icon: "h-5 w-5"
    }
  };

  // Styles selon la variante
  const variantStyles = {
    default: {
      container: "bg-gray-50 border border-gray-200",
      button: "border-gray-300 hover:border-gray-400 hover:bg-gray-100",
      text: "text-gray-800",
      activeButton: "bg-blue-500 hover:bg-blue-600 text-white border-blue-500"
    },
    premium: {
      container: "bg-gradient-to-r from-orange-50 to-green-50 border border-orange-200 shadow-sm",
      button: "border-orange-200 hover:border-orange-400 hover:bg-orange-50 hover:shadow-md",
      text: "text-gray-800 font-semibold",
      activeButton: "bg-gradient-to-r from-orange-500 to-green-500 hover:from-orange-600 hover:to-green-600 text-white border-transparent shadow-lg"
    },
    minimal: {
      container: "bg-white border border-gray-100",
      button: "border-gray-200 hover:border-gray-300 hover:bg-gray-50",
      text: "text-gray-700",
      activeButton: "bg-gray-800 hover:bg-gray-900 text-white border-gray-800"
    }
  };

  const currentSize = sizeStyles[size];
  const currentVariant = variantStyles[variant];

  return (
    <div className={`
      flex items-center justify-center space-x-3 rounded-2xl transition-all duration-300
      ${currentSize.container} ${currentVariant.container}
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}
      ${count > 0 ? 'ring-2 ring-orange-200 ring-opacity-50' : ''}
    `}>
      {/* Bouton Diminuer */}
      <Button
        size="sm"
        variant="outline"
        onClick={decrease}
        disabled={count === 0 || disabled}
        className={`
          ${currentSize.button} rounded-full transition-all duration-300
          ${count > 0 ? currentVariant.activeButton : currentVariant.button}
          ${count === 0 ? 'opacity-40' : 'hover:scale-110 active:scale-95'}
        `}
        aria-label="Diminuer la quantité"
      >
        <Minus className={currentSize.icon} />
      </Button>

      {/* Compteur avec animation */}
      <div className="flex flex-col items-center">
        <span className={`
          ${currentSize.text} ${currentVariant.text} text-center font-bold transition-all duration-300
          ${count > 0 ? 'scale-110 text-orange-600' : ''}
        `}>
          {count}
        </span>
        {count > 0 && size !== 'sm' && (
          <span className="text-xs text-gray-500 font-medium">
            {(count * price).toLocaleString()} FCFA
          </span>
        )}
      </div>

      {/* Bouton Augmenter */}
      <Button
        size="sm"
        variant="outline"
        onClick={increase}
        disabled={count >= maxCount || disabled}
        className={`
          ${currentSize.button} rounded-full transition-all duration-300
          ${currentVariant.button}
          hover:scale-110 active:scale-95
          ${count >= maxCount ? 'opacity-40' : ''}
        `}
        aria-label="Augmenter la quantité"
      >
        <Plus className={currentSize.icon} />
      </Button>

      {/* Indicateur visuel quand un item est ajouté */}
      {count > 0 && (
        <div className="absolute -top-1 -right-1 animate-bounce">
          <div className="bg-green-500 text-white rounded-full h-6 w-6 flex items-center justify-center shadow-lg">
            <ShoppingCart className="h-3 w-3" />
          </div>
        </div>
      )}
    </div>
  );
}

// Variante compacte pour les listes
export function BtnCountCompact({ productId, onCountChange, price, ...props }: BtnCountProps) {
  return (
    <BtnCount 
      productId={productId}
      onCountChange={onCountChange}
      price={price}
      size="sm"
      variant="minimal"
      {...props}
    />
  );
}

// Variante premium pour les pages produits
export function BtnCountPremium({ productId, onCountChange, price, ...props }: BtnCountProps) {
  return (
    <BtnCount 
      productId={productId}
      onCountChange={onCountChange}
      price={price}
      size="lg"
      variant="premium"
      {...props}
    />
  );
}
 export default  BtnCount
'use client';
import React, { useState } from 'react';

interface InventoryItem {
  name: string;
  price: number;
  quantity: number;
  customerName: string;
  dsfName: string;
  area: string;
  paymentMode: string;
}

interface InventoryFormProps {
  onAddItem: (item: InventoryItem) => void;
  customerName: string;
  dsfName: string;
  area: string;
  paymentMode: string;
}

export default function InventoryForm({ onAddItem, customerName, dsfName, area, paymentMode }: InventoryFormProps) {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddItem({
      name,
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
      customerName,
      dsfName,
      area,
      paymentMode,
    });
    setName('');
    setPrice('');
    setQuantity('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <h2 className="text-2xl font-bold mb-4 mt-10 text-[#017EC3] hover:text-black"style={{fontFamily:'Times New Roman'}}>Add Item to Invoice</h2>
      <div className="space-y-4">
        {/* Item Details */}
        <select
        
        
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded font-bold"
          required
        >
          <option>Select Item</option>
        <option>Super Bachat NB (50Unit)</option>
        <option>Super Bachat  SMALL(48Unit)</option>
        <option>Super Bachat  MEDIUM (44Unit)</option>
        <option>Super Bacht LARGE (40 Unit)</option>
        <option>Super Bachat  XL (36Units)</option>
        <option>Super Bachat XXL (30 Unit)</option>
      
        <option>Jumbo Small (96Unit)
        </option>
        <option>Jumbo Medium (88 Unit)</option>
      
        <option>Jumbo Large (80 Unit)</option>
     
        <option>Jumbeo XL (72 Unit)</option>
    
        </select>
        <select
        
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border rounded font-bold"
          required
        >
          <option>Select Price</option>
          <option>960</option>
          <option>1900</option>
        </select>
        <select
         
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="w-full p-2 border rounded font-bold"
          required
        >
          <option>Select Quantity</option>
          <option>01</option>
          <option>02</option>
          <option>03</option>
          <option>04</option>
          <option>05</option>
          <option>06</option>
          <option>07</option>
          <option>08</option>
          <option>09</option>
          <option>10</option>
         
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-[#FEBD59] hover:text-black font-bold"
        >
          Make Invoice / Add new Item
        </button>
      </div>
    </form>
  );
}

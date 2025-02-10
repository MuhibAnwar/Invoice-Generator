'use client';

import React, { useState } from 'react';
import InventoryForm from './InventoryForm';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface InvoiceItem {
  name: string;
  price: number;
  quantity: number;
  customerName: string;
  dsfName: string;
  area: string;
  paymentMode: string;
}

interface InvoiceFormProps {
  onCreateInvoice: (items: InvoiceItem[]) => void;
}

export default function InvoiceForm({ onCreateInvoice }: InvoiceFormProps) {
  const [customerName, setCustomerName] = useState<string>('');
  const [dsfName, setDsfName] = useState<string>('');
  const [area, setArea] = useState<string>('');
  const [paymentMode, setPaymentMode] = useState<string>('');
  const [inventory, setInventory] = useState<InvoiceItem[]>([]);
  const [invoiceCount, setInvoiceCount] = useState(1);

  const handleAddItem = (item: InvoiceItem) => {
    setInventory([...inventory, item]);
  };

  const handleCreateInvoice = () => {
    onCreateInvoice(inventory);
    setInventory([]);
    setInvoiceCount(invoiceCount + 1);
  };

  const handleSaveAsPDF = (invoiceNumber: string) => {
    const invoiceElement = document.getElementById(`invoice-${invoiceNumber}`);
    if (!invoiceElement) return;

    html2canvas(invoiceElement, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save(`Invoice_${invoiceNumber}.pdf`);
    });
  };

  const calculateTotal = () => {
    return inventory.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Generate the Bill Number in "MM/YYYY/Count" format
  const billNumber = `${new Date().getMonth() + 1}/${new Date().getFullYear()}/${invoiceCount}`;

  return (
    <div className="p-6 bg-gray-300 rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-[#017EC3] hover:text-black"style={{fontFamily:'Times New Roman'}}>Create Invoice</h2>

      {/* Customer Details */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full p-2 border rounded font-bold"
        />
        <input
          type="text"
          placeholder="DSF Name"
          value={dsfName}
          onChange={(e) => setDsfName(e.target.value)}
          className="w-full p-2 border rounded font-bold"
        />
        <select
        
        
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="w-full p-2 border rounded font-bold">
            <option value="" disabled>Select Area</option>
  <option value="Cash ">Gulshan e Iqbal</option>
  <option value="Credit Card">Maymar</option>
  <option value="Bank Transfer">Surjani </option>
  <option value="Bank Transfer">Johar </option>
  <option value="Bank Transfer">New Karachi</option>
  <option value="Bank Transfer">F.B Area </option>
  <option value="Bank Transfer">Scheme 33</option>
  
          </select>
        
       <select
  value={paymentMode}
  onChange={(e) => setPaymentMode(e.target.value)}
  className="w-full p-2 border rounded font-bold"
>
  <option value="" disabled>Select Payment Mode</option>
  <option value="Cash">Cash</option>
  <option value="Credit Card">Credit</option>
  <option value="Bank Transfer">Bank Transfer</option>
  
</select>
      </div>

      {/* Add Items to Invoice */}
      <InventoryForm
        onAddItem={handleAddItem}
        customerName={customerName}
        dsfName={dsfName}
        area={area}
        paymentMode={paymentMode}
      />

      {/* Selected Items */}
      <div className="mt-4">
        <h3 className="font-bold mb-2">Selected Items</h3>
        <ul className="space-y-2">
          {inventory.map((item, index) => (
            <li key={index} className="border p-2 rounded font-bold">
              {item.name} - ${item.price.toFixed(2)} (Qty: {item.quantity})
            </li>
          ))}
        </ul>
      </div>

    

      {/* Invoice Output */}
      {inventory.length > 0 && (
        <div
          id={`invoice-${billNumber}`}
          className="mt-8 p-8 bg-white shadow-lg rounded"
          style={{ width: '230mm', height: '160mm', margin: 'auto' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6 border-black " >
            <img src="/logo-1.png" alt="Brand Logo" className="w-20 h-20" />
            <div className="text-center flex-grow">
              <h1 className="text-2xl font-bold"id='header' >EXPRESS TRADERS</h1>
              <br/>
              <p className="text-sm text-italic">11/6 C AREA LIAQUATABAD KARACHI</p>
              <p className="text-sm text-italic">MOBILE # 0332-2525010</p>
              <p  className="text-sm text-italic">NTN # B-179495-8</p>
              <h2 className="text-lg font-semibold mt-4"style={{fontFamily:'Times New Roman'}}>Invoice</h2>
            </div>
            <div className="ml-2 mt-2">
              <p className="text-sm font-bold">Date: {new Date().toLocaleDateString()}</p>
              <p className="text-sm font-bold">Bill No: {billNumber}</p>
            </div>
          </div>

          {/* Customer Info */}
          <div className="mb-6 "style={{fontFamily:'Times New Roman'}}>
            <p><strong>Customer:</strong> {customerName}</p>
            <p><strong>DSF Name:</strong> {dsfName}</p>
            <p><strong>Area:</strong> {area}</p>
            <p><strong>Payment Mode:</strong> {paymentMode}</p>
          </div>

          {/* Item Table */}
          <table className="w-full border-collapse border mb-6">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2 text-left">Item</th>
                <th className="border p-2 text-left">Price</th>
                <th className="border p-2 text-left">Quantity</th>
                <th className="border p-2 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item, index) => (
                <tr key={index} className="border">
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.price.toFixed(2)}</td>
                  <td className="p-2">{item.quantity}</td>
                  <td className="p-2">{(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total Amount */}
          <div className="text-right">
            <p className="text-lg font-bold">Total: {calculateTotal().toFixed(2)}</p>
          </div>
          <div className='mt-20 text-center'>
            <p className='text-xs font-bold'>Thank You For Your Business</p>
            <p className='text-xs font-bold'>Made with ❤️ by an Expressian</p>
            </div>
        </div>
      )}

      {/* Save as PDF Button */}
      {inventory.length > 0 && (
        <button
          onClick={() => handleSaveAsPDF(billNumber)}
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 mt-4"
        >
          Save as PDF
        </button>
       
      )}
      <button
        onClick={handleCreateInvoice}
        className="w-full bg-[#FEBD59] text-black p-2 rounded hover:bg-black hover:text-white mt-4"
      >
        ADD TO RECORD
      </button>
      <a href='/record'>
        <button
        
          className="w-full bg-[#FEBD59] text-white p-2 rounded hover:bg-black text-white mt-4"
        >
          VIEW RECORD
        </button>
      </a>
    </div>
  );
}

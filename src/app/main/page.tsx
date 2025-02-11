'use client';

import { useState, useEffect } from 'react';

import InvoiceForm from '../../components/InvoiceForm';

interface InventoryItem {
  name: string;
  price: number;
  quantity: number;
  customerName: string;
  dsfName: string;
  area: string;
  paymentMode: string;
}

interface Invoice {
  number: string;
  items: InventoryItem[];
}

export default function Home() {
 // const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
 // const [expandedInvoice, setExpandedInvoice] = useState<string | null>(null);

  useEffect(() => {
    const storedInvoices = localStorage.getItem('invoices');
    if (storedInvoices) {
      setInvoices(JSON.parse(storedInvoices));
    }
  }, []);

  const generateInvoiceNumber = () => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const prefix = `${month}/${year}`;
    const lastInvoice = invoices
      .filter((inv) => inv.number.startsWith(prefix))
      .sort((a, b) => parseInt(a.number.split('/')[2]) - parseInt(b.number.split('/')[2]))
      .pop();
    const nextNumber = lastInvoice ? parseInt(lastInvoice.number.split('/')[2]) + 1 : 1;
    return `${prefix}/${String(nextNumber).padStart(2, '0')}`;
  };

  const handleCreateInvoice = (invoiceItems: InventoryItem[]) => {
    const newInvoice: Invoice = {
      number: generateInvoiceNumber(),
      items: invoiceItems,
    };
    const updatedInvoices = [...invoices, newInvoice];
    setInvoices(updatedInvoices);
    localStorage.setItem('invoices', JSON.stringify(updatedInvoices));
  };

                

 

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 hover:text-[#017EC3]" id='header'>GENERATE INVOICE</h1>


      <InvoiceForm onCreateInvoice ={handleCreateInvoice} />

    {/*  <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Generated Invoices</h2>
        <ul className="space-y-4">
          {invoices.map((invoice, index) => (
            <li key={index} className="border p-4 rounded">
              <div className="flex justify-between items-center">
                <h3 className="font-bold">Invoice #{invoice.number}</h3>
                <div>
                  <button
                    onClick={() => toggleInvoiceDetails(invoice.number)}
                    className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
                  >
                    {expandedInvoice === invoice.number ? 'Hide Details' : 'Show Details'}
                  </button>
                  <button
                    onClick={() => handleRemoveInvoice(invoice.number)}
                    className="bg-red-500 text-white px-4 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
              {expandedInvoice === invoice.number && (
                <ul className="mt-4">
                  {invoice.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="border-b py-2">
                      {item.name} - ${item.price} (Qty: {item.quantity}) - Customer: {item.customerName}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>*/}
    </div>
  );
}

import Page from "@/app/main/page";
import React from "react";
import AUTH from "./auth/page";
import InvoiceForm from "@/components/InvoiceForm";

export default function Home() {
 

  return (
   <div className="mt-10 ">
    <h1 className="text-4xl font-bold text-center text-[rgb(8,8,10)] mb-5 "id="header" >Express Traders</h1>
    <h2 className="text-2xl font-bold text-center text-[#017EC3] text-italic mb-10" id="header1">WELCOME BACK EXPRESSIAN</h2>

    <AUTH />
</div>
  );
}
import React from 'react';
import Link from 'next/link';

const Fieldset = () => {
  return (
    <div  className="  flex flex-col items-center mt-6  m ">
     
     <h2 className="text-4xl font-bold text-center text-black text-italic mb-10" id="header1">NAVIGATION</h2>

 
      <fieldset className="border w-[800px] bg-gray-200 rounded p-4 py-7 mx-auto m-15 bg-white  mb-4">
        <Link href="/main">
          <button className="flex   py-2 px-4 bg-blue-400 text-white ml-20 font-bold rounded hover:bg-black transition cursor-pointer">
            INVOICE MAKER
          </button>
        </Link>
      </fieldset>
      <fieldset className="border w-[800px] bg-gray-100 rounded p-4 py-7 mx-auto m-15 bg-white  mb-4">
        <Link href="/record">
          <button className=" py-2 px-4 bg-blue-400  ml-20 text-white font-bold rounded hover:bg-black transition">
            RECORD
          </button>
        </Link>
      </fieldset>

    </div>
  );
};

export default Fieldset;
import React from "react";

const Speech = () => {
  return (
    <div className="w-full h-full flex flex-col min-h-[100vh] justify-center items-center">
        <div className="flex justify-center items-center mb-20">
            <h3 className="font-bold">Speech Test</h3>
        </div>
      <div className="grid grid-cols-2 gap-4">
        <div> <div className="grid grid-cols-6 gap-3">
          <div className="flex justify-center items-center border-l pl-2 font-bold "></div>
          <div className="flex justify-center items-center border-l pl-2 font-bold ">UCL</div>
          <div className="flex justify-center items-center border-l pl-2 font-bold ">MCL</div>
          <div className="flex justify-center items-center border-l pl-2 font-bold ">SRT</div>
          <div className="flex justify-center items-center border-l pl-2 font-bold ">SAT</div>
          <div className="flex justify-center items-center  font-bold ">SDS</div>
        </div>
        <div className="grid grid-cols-6 gap-3 border-t">
        <div className="flex justify-center items-center border-l pl-2 font-bold"></div>

          <div className="flex justify-center items-center border-l pl-2 font-bold "><input autoFocus  className="border-0 outline-none px-3 py-1 w-[50px]" /></div>
          <div className="flex justify-center items-center border-l pl-2 font-bold "><input className="border-0 outline-none px-3 py-1 w-[50px]"  /></div>
          <div className="flex justify-center items-center border-l pl-2 font-bold "><input className="border-0 outline-none px-3 py-1 w-[50px]"  /></div>
          <div className="flex justify-center items-center border-l pl-2 font-bold "><input className="border-0 outline-none px-3 py-1 w-[50px]"  /></div>
          <div className="flex justify-center items-center  font-bold ">Right</div>

        </div>
        </div>
        <div> <div className="grid grid-cols-6 gap-3">
          <div className="flex justify-center items-center border-l pl-2 font-bold "></div>
          <div className="flex justify-center items-center border-l pl-2 font-bold ">UCL</div>
          <div className="flex justify-center items-center border-l pl-2 font-bold ">MCL</div>
          <div className="flex justify-center items-center border-l pl-2 font-bold ">SRT</div>
          <div className="flex justify-center items-center border-l pl-2 font-bold ">SAT</div>
          <div className="flex justify-center items-center  font-bold ">SDS</div>
        </div>
        <div className="grid grid-cols-6 gap-3 border-t">
        <div className="flex justify-center items-center border-l pl-2 font-bold"></div>


        <div className="flex justify-center items-center border-l pl-2 font-bold "><input  className="border-0 outline-none px-3 py-1 w-[50px]" /></div>
          <div className="flex justify-center items-center border-l pl-2 font-bold "><input className="border-0 outline-none px-3 py-1 w-[50px]"  /></div>
          <div className="flex justify-center items-center border-l pl-2 font-bold "><input className="border-0 outline-none px-3 py-1 w-[50px]"  /></div>
          <div className="flex justify-center items-center border-l pl-2 font-bold "><input className="border-0 outline-none px-3 py-1 w-[50px]"  /></div>
          <div className="flex justify-center items-center   font-bold ">Left</div>

        </div>
        </div>
      </div>
    </div>
  );
};

export default Speech;

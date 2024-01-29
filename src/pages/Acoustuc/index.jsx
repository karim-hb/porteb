import React from "react";

const Acoustic = () => {
  return (
    <div className="w-full h-full flex flex-col min-h-[100vh] justify-center items-center">
      <div className="flex justify-center font-bold items-center mb-20">
        Acoustic Reflexes{" "}
      </div>
      <div className="grid grid-cols-2 gap-16">
        <div>
          <div className="flex justify-center font-bold text-sm items-center mb-10">
            Probe in the Left Ear
          </div>
          <div className="grid grid-cols-5 gap-3">
            <div className="flex justify-center items-center   ">4000</div>
            <div className="flex justify-center items-center   ">2000</div>
            <div className="flex justify-center items-center   ">1000</div>

            <div className="flex justify-center items-center   ">500</div>

            <div className="flex justify-center items-center   ">Frequency</div>
          </div>
          <div className="grid grid-cols-5 gap-0 ">
            <div className="flex justify-center items-center border-l pl-2  ">
              <input
                autoFocus
                className="border-0 outline-none px-3 py-1 w-[50px]"
              />
            </div>
            <div className="flex justify-center items-center border-l pl-2  ">
              <input className="border-0 outline-none px-3 py-1 w-[50px]" />
            </div>
            <div className="flex justify-center items-center border-l pl-2 ">
              <input className="border-0 outline-none px-3 py-1 w-[50px]" />
            </div>
            <div className="flex justify-center items-center border-l pl-2 ">
              <input className="border-0 outline-none px-3 py-1 w-[50px]" />
            </div>
            <div className="flex justify-center items-center bg-slate-100  ">
              IPSI
            </div>
          </div>{" "}
          <div className="grid grid-cols-5 gap-0 border-t ">
            <div className="flex justify-center items-center border-l pl-2 ">
              <input
                autoFocus
                className="border-0 outline-none px-3 py-1 w-[50px]"
              />
            </div>
            <div className="flex justify-center items-center border-l pl-2 ">
              <input className="border-0 outline-none px-3 py-1 w-[50px]" />
            </div>
            <div className="flex justify-center items-center border-l pl-2 ">
              <input className="border-0 outline-none px-3 py-1 w-[50px]" />
            </div>
            <div className="flex justify-center items-center border-l pl-2 ">
              <input className="border-0 outline-none px-3 py-1 w-[50px]" />
            </div>
            <div className="flex justify-center items-center bg-slate-100  ">
              CONTRA
            </div>
          </div>
        </div>
        <div>
        <div className="flex justify-center font-bold text-sm items-center mb-10">
            Probe in the Right Ear
          </div>
          <div className="grid grid-cols-5 gap-3">
            <div className="flex justify-center items-center   ">4000</div>
            <div className="flex justify-center items-center   ">2000</div>
            <div className="flex justify-center items-center   ">1000</div>

            <div className="flex justify-center items-center   ">500</div>

            <div className="flex justify-center items-center   ">Frequency</div>
          </div>
          <div className="grid grid-cols-5 gap-0 ">
            <div className="flex justify-center items-center border-l pl-2  ">
              <input
                autoFocus
                className="border-0 outline-none px-3 py-1 w-[50px]"
              />
            </div>
            <div className="flex justify-center items-center border-l pl-2  ">
              <input className="border-0 outline-none px-3 py-1 w-[50px]" />
            </div>
            <div className="flex justify-center items-center border-l pl-2  ">
              <input className="border-0 outline-none px-3 py-1 w-[50px]" />
            </div>
            <div className="flex justify-center items-center border-l pl-2  ">
              <input className="border-0 outline-none px-3 py-1 w-[50px]" />
            </div>
            <div className="flex justify-center items-center bg-slate-100   ">
              IPSI
            </div>
          </div>{" "}
          <div className="grid grid-cols-5 gap-0 border-t ">
            <div className="flex justify-center items-center border-l pl-2  ">
              <input
                autoFocus
                className="border-0 outline-none px-3 py-1 w-[50px]"
              />
            </div>
            <div className="flex justify-center items-center border-l pl-2  ">
              <input className="border-0 outline-none px-3 py-1 w-[50px]" />
            </div>
            <div className="flex justify-center items-center border-l pl-2  ">
              <input className="border-0 outline-none px-3 py-1 w-[50px]" />
            </div>
            <div className="flex justify-center items-center border-l pl-2  ">
              <input className="border-0 outline-none px-3 py-1 w-[50px]" />
            </div>
            <div className="flex justify-center items-center bg-slate-100   ">
              CONTRA
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-center max-w-[956px] mt-10 border-t pt-10 w-full">
        <span>توضیحات : </span>
        <input className="border-0 outline-none" />
      </div>
    </div>
  );
};

export default Acoustic;

import React from "react";

const Tympanometry = () => {
  return (
    <div className="w-full h-full flex flex-col min-h-[100vh] justify-center items-center">
      <div className="flex justify-center items-center mb-20">
        <h3 className="font-bold">Tympanometry</h3>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="flex flex-col gap-4 border rounded-none px-4 py-2">
            <div className="flex w-full flex-row-reverse items-center gap-2">
              <span className="font-bold">Type</span>
            </div>
            <div className="flex w-full flex-row-reverse items-center gap-2">
              <span> =  ECV</span>
              <input type={"number"} autoFocus className="border-0 outline-none px-3 py-1 w-[50px]" />
            </div>
            <div className="flex w-full flex-row-reverse items-center gap-2">
              <span> =  MEP</span>
              <input type={"number"} className="border-0 outline-none px-3 py-1 w-[50px]" />
            </div>
            <div className="flex w-full flex-row-reverse items-center gap-2">
              <span> = SC</span>
              <input type={"number"} className="border-0 outline-none px-3 py-1 w-[50px]" />
            </div>
          </div>
        </div>{" "}
        <div>
          <div className="flex flex-col gap-4 border rounded-none px-4 py-2">
            <div className="flex w-full flex-row-reverse items-center gap-2">
              <span className="font-bold">Type</span>
            </div>
            <div className="flex w-full flex-row-reverse items-center gap-2">
              <span> = ECV</span>
              <input type={"number"} className="border-0 outline-none px-3 py-1 w-[50px]" />
            </div>
            <div className="flex w-full flex-row-reverse items-center gap-2">
              <span> = MEP</span>
              <input type={"number"} className="border-0 outline-none px-3 py-1 w-[50px]" />
            </div>
            <div className="flex w-full flex-row-reverse items-center gap-2">
              <span> = SC</span>
              <input type={"number"} className="border-0 outline-none px-3 py-1 w-[50px]" />
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Tympanometry;

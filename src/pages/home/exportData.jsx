import { Button, Icon, IconButton } from "@mui/material";
import React, { useRef, useState } from "react";
import { addObject, getAllObjects } from "../../scripts/indexedDbReader";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
const ExportData = () => {
  const [jsonData, setJsonData] = useState("");
  const fileInputRef = useRef(null);

  const handleDownload = async () => {
    const data = await getAllObjects();
    const json = JSON.stringify(data, null, 2);

    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `خروجی - ${new Date().toLocaleDateString("fa")}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const json = e.target.result;
        const data = JSON.parse(json);

        for (const object of data) {
          await addObject(object);
        }

        window.location.reload();
      };

      reader.readAsText(file);
    }
  };
  return (
    <div className="flex justify-end w-full gap-2">
      {" "}
      <input
        ref={fileInputRef}
        style={{ display: "none" }}
        type="file"
        accept=".json"
        onChange={handleUpload}
      />

      <Button onClick={() => fileInputRef.current.click()} variant="outlined">
      <UploadIcon />        آپلود

      </Button>
      <Button onClick={handleDownload} variant="outlined">
        
        <DownloadIcon />دانلود
      </Button>
    </div>
  );
};

export default ExportData;

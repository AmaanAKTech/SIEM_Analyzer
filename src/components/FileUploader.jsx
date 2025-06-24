export default function FileUploader() {
  const { updateLogs } = useContext(AppContext); 
  const { parseFile } = useParser();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      parseFile(file); 
    }
  };

  return (
    <div className="border-dashed border-2 border-gray-300 p-6 rounded-lg text-center">
      <input
        type="file"
        className="hidden"
        id="log-input"
        accept=".log,.txt,.cef,.leef"
        onChange={handleFile}
      />
      <label htmlFor="log-input" className="cursor-pointer text-blue-600">
        📁 Click or drag log file to upload
      </label>
    </div>
  );
}

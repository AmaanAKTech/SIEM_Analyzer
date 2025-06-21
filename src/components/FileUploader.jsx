import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import useParser from '../hooks/useParser';

export default function FileUploader() {
  const { setLogs } = useContext(AppContext);
  const { parseFile } = useParser();
  const [error, setError] = useState(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setError(null);
      parseFile(
        file,
        (parsedArray) => {
          setLogs(parsedArray);
          console.log('Parsed entries:', parsedArray);
        },
        (err) => {
          console.error('Parsing error:', err);
          setError('Failed to read file');
        }
      );
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
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

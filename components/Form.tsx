import React, { useState, FormEvent } from "react";
import FormButton from "./FormButton";

interface Props {
  backendBaseUrl: string;
}

export default function Form({ backendBaseUrl }: Props) {
  const [csvLink, setCsvLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const downloadCSV = async (city: string, businessType: string) => {
    try {
      const response = await fetch(
        `${backendBaseUrl}?city=${city}&business_type=${businessType}`
      );

      if (response.ok) {
        let data = await response.json();

        let csvContent = "data:text/csv;charset=utf-8,";

        // extract the header names and join them with commas
        const header = Object.keys(data).join(",");
        // extract the column values and join them with line breaks
        const values = (Object.values(data) as string[][])
        console.log(values);
        try {
        let rowContent = "";
        for (let i = 0; i < values.length; i++) {
          let row = "";
          for (let j = 0; j < values[i].length; j++) {
            row += values[j][i] + ",";
            if (j === values.length - 1) {
              break
            }
          }
          console.log(row)
          row.slice(0, -1);
          console.log(row)
          rowContent += row + "\r\n";
    
        }
    
        csvContent += header + "\r\n" + rowContent;
      } catch (error) {
        console.log(error)
      }
        

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "search-results.csv");

        setCsvLink(encodedUri);
        setError(null);
      } else {
        setError("An error occurred while processing your request.");
        setCsvLink(null);
      }
    } catch (error) {
      setError("An error occurred while processing your request.");
      setCsvLink(null);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const city = formData.get("city") as string;
    const businessType = formData.get("businessType") as string;

    await downloadCSV(city, businessType);
    setLoading(false);
  };

  return (
    <form
      className="flex flex-col items-center justify-center max-w-4xl mt-6 sm:w-full"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="city"
        placeholder="City"
        className="w-2/4 px-4 py-2 mt-4 text-black bg-gray-500 border-gray-700 rounded-md"
      />

      <input
        type="text"
        name="businessType"
        placeholder="Business Type"
        className="w-2/4 px-4 py-2 mt-4 text-black bg-gray-500 border-gray-700 rounded-md"
      />
      <div className="flex justify-between">
        <FormButton loading={loading} />
        <button className="px-4 py-2 mt-4 ml-2 text-white bg-pink-500 rounded-md hover:bg-pink-700">
          <a href="https://www.reddit.com/r/girlsinyogapants/" target='_blank'>
            I'm Feeling Lucky
          </a>
        </button>
      </div>

      {!loading && csvLink && (
        <a
          href={csvLink}
          download="search-results.csv"
          className="mt-4 text-green-500 hover:text-gray-400"
        >
          Download Results as CSV
        </a>
      )}

      {error && <p className="mt-4 text-red-600">{error}</p>}
    </form>
  );
}

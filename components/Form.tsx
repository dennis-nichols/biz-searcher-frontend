import React, { useState, FormEvent } from "react";
import FormButton from "./FormButton";
import { Table } from "./Table";

interface Props {
  backendBaseUrl: string;
}

export default function Form({ backendBaseUrl }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [bizData, setBizData] = useState<[string, number][]>([]);

  const downloadData = async (
    city: string,
    businessType: string,
    minRatings: number
  ) => {
    try {
      const response = await fetch(
        `${backendBaseUrl}?city=${city}&business_type=${businessType}&min_ratings=${minRatings}`
      );
      if (response.ok) {
        let data = await response.json();
        // extract the column values
        const values = Object.values(data) as [string, number][];
        const websites = values[1];
        const user_ratings_total = values[0];
        // create an array of objects with website and user_ratings_total properties
        let bizData = [] as [string, number][];
        for (let i = 0; i < websites.length; i++) {
          bizData.push([websites[i] as string, user_ratings_total[i] as number]);
        }
        setBizData(bizData);
        setError(null);
      } else {
        setError("An error occurred while processing your request.");
      }
    } catch (error) {
      setError("An error occurred while processing your request.");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const city = formData.get("city") as string;
    const businessType = formData.get("businessType") as string;
    const minRatings = parseInt(formData.get("minRatings") as string);

    setLoading(true);
    await downloadData(city, businessType, minRatings).then(() => {
      setLoading(false);
    });
  };

  console.log(bizData.length > 0 ? bizData : "No data yet");
  return (
    <>
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

      <input
        type="number"
        name="minRatings"
        placeholder="Minimum Number of Ratings"
        className="w-2/4 px-4 py-2 mt-4 text-black bg-gray-500 border-gray-700 rounded-md"
      />

      <FormButton loading={loading} />

      {error && <p className="mt-4 text-red-600">{error}</p>}
     
    </form>
    {bizData.length > 0 && <Table bizData={bizData} />}
    </>
  );
}

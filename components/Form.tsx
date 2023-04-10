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
  const [searchComplete, setSearchComplete] = useState<boolean>(false);

  const downloadData = async (
    city: string,
    businessType: string,
    minRatings: number,
    searchByState: string,
    minPopulation: number,
    state: string
  ) => {
    const queryParams = [
      `city=${encodeURIComponent(city)}`,
      `business_type=${encodeURIComponent(businessType)}`,
      `min_ratings=${encodeURIComponent(minRatings.toString())}`,
      `search_by_state=${encodeURIComponent(searchByState.toString())}`,
      `min_population=${encodeURIComponent(minPopulation.toString())}`,
      `state=${encodeURIComponent(state)}`,
    ].join("&");

    console.log(queryParams);
    try {
      const response = await fetch(`${backendBaseUrl}?${queryParams}`);
      if (response.ok) {
        let data = await response.json();
        if ("message" in data) {
          setSearchComplete(true);
        }
        else {
        // extract the column values
        const values = Object.values(data) as [string, number][];
        const websites = values[1];
        const user_ratings_total = values[0];
        // create an array of objects with website and user_ratings_total properties
        let bizData = [] as [string, number][];
        for (let i = 0; i < websites.length; i++) {
          bizData.push([
            websites[i] as string,
            user_ratings_total[i] as number,
          ]);
        }
        setBizData(bizData);
        setError(null); }
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
    const searchByState = formData.get("searchByState") as string;
    const minPopulation = parseInt(formData.get("minPopulation") as string) ;
    const state = formData.get("state") as string;

    setSearchComplete(false);
    setLoading(true);
    await downloadData(
      city,
      businessType,
      minRatings,
      searchByState,
      minPopulation,
      state
    ).then(() => {
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
          className="px-4 py-2 mt-4 text-black bg-gray-500 border-gray-700 rounded-md md:w-2/4 sm:w-full"
        />

        <input
          type="text"
          name="state"
          placeholder="State (Spell out - Georgia, not GA)"
          className="px-4 py-2 mt-4 text-black bg-gray-500 border-gray-700 rounded-md md:w-2/4 sm:w-full"
        />

        <input
          type="text"
          name="businessType"
          placeholder="Business Type"
          className="px-4 py-2 mt-4 text-black bg-gray-500 border-gray-700 rounded-md md:w-2/4 sm:w-full"
        />

        <input
          type="number"
          name="minRatings"
          placeholder="Minimum Number of Ratings"
          className="px-4 py-2 mt-4 text-black bg-gray-500 border-gray-700 rounded-md md:w-2/4 sm:w-full"
        />

        <h2 className="my-4 text-2xl text-gray-400">
          Or would you like to search by State?
        </h2>
        <select
          name="searchByState"
          className="px-4 py-2 mt-2 text-black border-gray-700 rounded-md md:w-2/4 sm:w-full"
        >
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>
        <p className="mt-4 text-gray-400 md:w-2/4 sm:w-full">
          This allows you to run the business search in all the cities in a
          state that are above the <strong>minimum population</strong> you set below.
        </p>

        <input
          type="number"
          name="minPopulation"
          placeholder="Minimum Population for Cities (if searching by state)"
          className="px-4 py-2 mt-4 text-black bg-gray-500 border-gray-700 rounded-md md:w-2/4 sm:w-full"
          defaultValue={5000}
        />

        <FormButton loading={loading} />

        {error && <p className="mt-4 text-red-600">{error}</p>}
      </form>
      {searchComplete && (
        <p className="mt-4 font-bold text-green-400">
          Search Complete.
          <br />
          Check out the spreadsheet{" "}
          <span className="text-white underline hover:text-green-500">
            <a href="https://docs.google.com/spreadsheets/d/12Yp5QxG-SuuIfgRbN6YCNG69mGf2_187e7W1yPRY1KU/edit?usp=sharing" target='_blank'>here</a>
          </span>
        </p>
      )}
      {bizData.length > 0 && (
        <p className="mt-4 text-gray-400">Click headers to sort columns</p>
      )}
      {bizData.length > 0 && <Table bizData={bizData} />}
    </>
  );
}

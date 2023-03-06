import React from 'react'

export default function Form() {
  return (
    <form className="flex flex-col items-center justify-center max-w-4xl mt-6 sm:w-full">
  <input
    type="text"
    name="city"
    placeholder="City"
    className="w-full px-4 py-2 mt-4 border rounded-md"
  />

  <input
    type="text"
    name="businessType"
    placeholder="Business Type"
    className="w-full px-4 py-2 mt-4 border rounded-md"
  />

  <button
    type="submit"
    className="px-4 py-2 mt-4 text-white bg-green-600 rounded-md hover:bg-green-700"
  >
    Search
  </button>
</form>
  )
}



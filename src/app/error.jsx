// app/error.jsx
"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="text-center my-10">
      <h1 className="text-3xl font-bold text-red-600">500 - একটি ত্রুটি ঘটেছে</h1>
      <p className="mt-4">কিছু ভুল হয়েছে। পরে আবার চেষ্টা করুন।</p>
      <button
        onClick={() => reset()}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
      >
        আবার চেষ্টা করুন
      </button>
    </div>
  );
}

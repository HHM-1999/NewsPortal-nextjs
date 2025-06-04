"use client";

import React, { useState } from "react";
import Link from "next/link";
import postApi from "../../../lib/postApi";

export default function ArchiveClient({ initialData, initialCatList }) {
  const [archivedata, setArchivedata] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [offset, setOffset] = useState(initialData.length);
  const [hasMore, setHasMore] = useState(initialData.length === 12);

  const fetchArchive = async (params, append = false) => {
    setLoading(true);
    try {
      // Adjust end_date to include full day
      let adjustedParams = { ...params };
      if (params.end_date) {
        const end = new Date(params.end_date);
        end.setHours(23, 59, 59, 999);
        adjustedParams.end_date = end.toISOString();
      }

      const list = await postApi("archive", adjustedParams);
      let newData = list.data || [];

      // Client-side filtering to keep only items within date range
      if (adjustedParams.start_date) {
        const startTime = new Date(adjustedParams.start_date).getTime();
        const endTime = adjustedParams.end_date
          ? new Date(adjustedParams.end_date).getTime()
          : null;

        newData = newData.filter((item) => {
          const itemTime = new Date(item.created_at).getTime();
          if (endTime) {
            return itemTime >= startTime && itemTime <= endTime;
          }
          return itemTime >= startTime;
        });
      }

      if (append) {
        setArchivedata((prev) => [...prev, ...newData]);
        setOffset((prev) => prev + newData.length);
      } else {
        setArchivedata(newData);
        setOffset(newData.length);
      }

      // If fewer than limit items returned, no more data to load
      setHasMore(newData.length === 12 && newData.length > 0);

    } catch (error) {
      console.error("Error fetching archive:", error);
    } finally {
      setLoading(false);
    }
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    fetchArchive(
      {
        start_date: startDate,
        end_date: endDate,
        category_id: categoryId,
        limit: 12,
        offset: 0,
        keywords: "",
      },
      false
    );
  };

  const handleLoadMore = () => {
    fetchArchive(
      {
        start_date: startDate,
        end_date: endDate,
        category_id: categoryId,
        limit: 12,
        offset: offset,
        keywords: "",
      },
      true
    );
  };


  return (
    <div>
      <form className="form-inline" onSubmit={handleSubmit}>
        <div className="form-group clearfix">
          <div className="row">
            <div className="col-sm-4 my-2">
              <label htmlFor="start_date">তারিখ হতে :</label>
              <input
                type="date"
                className="form-control"
                name="start_date"
                id="start_date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  if (endDate && e.target.value > endDate)
                    setEndDate(e.target.value);
                }}
              />
            </div>
            <div className="col-sm-4 my-2">
              <label htmlFor="end_date">তারিখ পর্যন্ত :</label>
              <input
                type="date"
                className="form-control"
                name="end_date"
                id="end_date"
                min={startDate}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="col-sm-4 my-2">
              <label htmlFor="category_id">সব ক্যাটাগরি :</label>
              <select
                name="category_id"
                id="category_id"
                className="form-control"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">সকল খবর</option>
                {initialCatList.map((nc) => (
                  <option key={nc.CategoryID} value={nc.CategoryID}>
                    {nc.CategoryName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="text-center my-4">
          <button type="submit" className="btn btn-primary" >
            খুঁজুন
          </button>
        </div>
      </form>

      <div className="row">
        {loading && archivedata.length === 0 ? (
          <p className="text-center">Loading...</p>
        ) : archivedata.length === 0 ? (
          <p className="text-center">No data found</p>
        ) : (
          archivedata.map((nc, idx) => (
            <div className="col-lg-6" key={idx}>
              <Link href={`/details/${nc.Slug}/${nc.ContentID}`}>
                <div className="card mb-3 mt-3">
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMG_PATH + nc.ImageBgPath}`}
                    className="card-img-top img-fluid"
                    alt={nc.DetailsHeading}
                    title={nc.DetailsHeading}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{nc.DetailsHeading}</h5>
                    <p className="card-text">{nc.ContentBrief}</p>
                    <p className="card-text">
                      <small className="text-body-secondary">
                        {nc.created_at}
                      </small>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>

      {hasMore && archivedata.length > 0 && (
        <div className="text-center my-4">
          <button onClick={handleLoadMore} className="btn btn-primary" disabled={loading}>
            {loading ? "Loading..." : "আরও দেখুন"}
          </button>
        </div>
      )}
      {/* {!hasMore && archivedata.length > 0 && (
  <p className="text-center my-4">সব খবর দেখানো হয়েছে।</p>
)} */}

    </div>
  );
}

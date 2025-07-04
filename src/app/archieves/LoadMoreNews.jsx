'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const limit = 8;

const LoadMoreNews = ({ initialOffset }) => {
    const [newsList, setNewsList] = useState([]);
    const [offset, setOffset] = useState(initialOffset);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loadMore = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}archive`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    start_date: "",
                    end_date: "",
                    category_id: "",
                    limit,
                    offset,
                    keywords:""
                }),
            });

            const data = await res.json();

            if (data?.data?.length) {
                setNewsList((prev) => [...prev, ...data.data]);
                console.log(setNewsList);
                setOffset((prev) => prev + limit);
            } else {
                setHasMore(false);
            }
        } catch (err) {
            console.error("Load more error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {newsList.map((nc, idx) => (
                <div className="col-lg-6" key={idx}>
                    <Link href={`/details/${nc.Slug}/${nc.ContentID}`}>
                        <div className="card mb-3 mt-3">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_IMG_PATH + nc.ImageBgPath}`}
                                className="card-img-top img-fluid"
                                alt={nc.DetailsHeading}
                                title={nc.DetailsHeading}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{nc.DetailsHeading}</h5>
                                <p className="card-text">{nc.ContentBrief}</p>
                                <p className="card-text">
                                    <small className="text-body-secondary">{nc.created_at}</small>
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}

            {hasMore && (
                <div className="col-12 text-center my-4">
                    <button className="btn btn-primary" onClick={loadMore} disabled={loading}>
                        {loading ? 'Loading...' : 'Load More'}
                    </button>
                </div>
            )}
        </>
    );
};

export default LoadMoreNews;

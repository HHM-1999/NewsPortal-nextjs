import React, { Suspense } from "react";
import getApi from "../../../../../lib/getApi";
import DynamicMetadataClient from "./DynamicMetadataClient";
import SocialShare from "./SocialShare";
import Head from "next/head";
import ImageWithShimmerClient from "./ImageWithShimmerClient";
import Image from "next/image";
import SkeletonSection from "@/components/common/SkeletonSection";

export async function generateMetadata({ params }) {
    const { id } = await params;
    const content = await getApi(`content-details/${id}`);
    const contentList = content.data[0];
    const data = contentList;

    return {
        title: data.DetailsHeading || "Details - Barta24",
        description: data.DetailsHeading || "Read full news on Barta24.",
        openGraph: {
            title: data.DetailsHeading || "Barta24 News",
            description: data.DetailsHeading || "Barta24 - Trusted News",
            images: [
                {
                    url: `https://assets.deshkalnews.com/${data.ImageSmPath}` || "barta24",
                    width: 800,
                    height: 600,
                },
            ],
        },
        twitter: {
            title: data.DetailsHeading || "Barta24",
            description: data.DetailsHeading || "",
            images: [`https://assets.deshkalnews.com/${data.ImageSmPath}` || "Barta24"],
        },
    };
}


const page = async ({ params }) => {
    const { catSlug, id } = await params;

    const content = await getApi(`content-details/${id}`);

    const contentList = content.data;
    const data = contentList.map((data) => {
        return data;
    });

    if (!content || !content.data || content.data.length === 0) {
        return <div>Content not found.</div>;
    }

    const firstContentItem = data[0];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: firstContentItem?.DetailsHeading,
        image: [`https://assets.deshkalnews.com/${firstContentItem?.ImageSmPath}`],
        datePublished: "", // You should populate this with a real date
        author: [
            {
                "@type": "Organization",
                name: "Barta24",
            },
        ],
        publisher: {
            "@type": "Organization",
            name: "Barta24",
            logo: {
                "@type": "ImageObject",
                url: "https://assets.deshkalnews.com/logo.png",
            },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://www.barta24.com/details/${catSlug}/${id}`,
        },
    };

    return (
        <>
            <Head><script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            </Head>
            <div className="container" style={{ padding: "20px" }}>
                <DynamicMetadataClient />
                <div className="row">
                    <div className="col-lg-10 m-auto">
                        {contentList.map((nc) => (
                            <div
                                className="newsDetail"
                                key={nc.ContentID}
                                id={nc.ContentID}
                                data-title={nc.DetailsHeading}
                                data-image={`https://assets.deshkalnews.com/${nc.ImageSmPath}`}
                            >
                                <h1>{nc.DetailsHeading}</h1>
                                <SocialShare title={nc.DetailsHeading} contentID={nc.ContentID} />

                                {nc.VideoID !== null && nc.VideoID !== "" && nc.ShowVideo === 1 ? (
                                    <div className={nc.Tags === null ? "col-sm-12 video-container mt-2" : "col-sm-12 video-container"}>
                                        {nc.VideoType === "youtube" ? (
                                            <iframe
                                                className="embed-responsive-item"
                                                title="youtube-video"
                                                src={`https://www.youtube.com/embed/${nc.VideoID}?autoplay=0`}
                                                frameBorder="0"
                                                allowFullScreen
                                            ></iframe>
                                        ) : nc.VideoType === "vimeo" ? (
                                            <iframe
                                                title="vimeo-video"
                                                src={`https://player.vimeo.com/video/${nc.VideoID}`}
                                                frameBorder="0"
                                                allowFullScreen
                                            ></iframe>
                                        ) : nc.VideoType === "facebook" ? (
                                            <iframe
                                                title="facebook-video"
                                                src={`https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebookapp%2Fvideos%2F${nc.VideoID}%2F&show_text=0&width=560`}
                                                width="560"
                                                height="315"
                                                style={{ border: "none", overflow: "hidden" }}
                                                scrolling="no"
                                                frameBorder="0"
                                                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                                allowFullScreen
                                            ></iframe>
                                        ) : nc.VideoType === "instagram" ? (
                                            <iframe
                                                className="embed-responsive-item"
                                                title="instagram-video"
                                                src={`//instagram.com/p/${nc.VideoID}/embed`}
                                                width="100%"
                                                frameBorder="0"
                                                scrolling="no"
                                                allowTransparency="true"
                                            ></iframe>
                                        ) : null}
                                    </div>
                                ) : (
                                    // <ImageWithShimmerClient // <--- Use the new Client Component here
                                    //     src={`${process.env.NEXT_PUBLIC_IMG_PATH + nc.ImageBgPath}`}
                                    //     alt={nc.DetailsHeading}
                                    //     title={nc.DetailsHeading}
                                    //     caption={nc.ImageBgPathCaption}
                                    // />
                                    <Suspense fallback={<SkeletonSection />}>
                                        <picture>
                                            <Image src={`${process.env.NEXT_PUBLIC_IMG_PATH + nc.ImageBgPath}`}
                                                alt={nc.DetailsHeading} title={nc.DetailsHeading}
                                                width={400}
                                                height={250}
                                                style={{ width: '100%', height: 'auto', objectFit: 'cover', position: "relative" }} />
                                        </picture>
                                    </Suspense>

                                )}

                                <div
                                    className="Content-Details"
                                    dangerouslySetInnerHTML={{ __html: nc.ContentDetails }}
                                    style={{ marginTop: "20px" }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default page;
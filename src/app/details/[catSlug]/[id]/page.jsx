import Header from "@/components/Header";
import getApi from "../../../../../lib/getApi";
import DynamicMetadataClient from "./DynamicMetadataClient";
import SocialShare from "./SocialShare";
import Head from "next/head";
// Generate dynamic metadata for each content page
export async function generateMetadata({ params }) {
    const { id } = await params;
    const content = await getApi(`content-details/${id}`);
    const contentList = content.data[0]
    const data = contentList
    // console.log(data);


    return {
        title: data.DetailsHeading || "Details - Barta24",
        description: data.DetailsHeading || "Read full news on Barta24.",
        openGraph: {
            title: data.DetailsHeading || "Barta24 News",
            description: data.DetailsHeading || "Barta24 - Trusted News",
            images: [
                {
                    url: ` https://cdn.barta24.com/${data.ImageSmPath}` || "barta24",
                    width: 800,
                    height: 600,
                },
            ],
        },
        twitter: {
            title: data.DetailsHeading || "Barta24",
            description: data.DetailsHeading || "",
            images: [`https://cdn.barta24.com/${data.ImageSmPath}` || "Barta24"],
        },

    };
}

const page = async ({ params }) => {
    const { catSlug, id } = await params;

    const content = await getApi(`content-details/${id}`);

    const contentList = content.data
    const data = contentList.map((data) => { return (data) })
    // console.log(data[0].DetailsHeading);

    if (!content) {
        return <div>Content not found.</div>;
    }
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": data[0].DetailsHeading,
        "image": [`https://cdn.barta24.com/${data[0].ImageSmPath}`],
        "datePublished": "",
        "author": [{
            "@type": "Organization",
            "name": "Barta24"
        }],
        "publisher": {
            "@type": "Organization",
            "name": "Barta24",
            "logo": {
                "@type": "ImageObject",
                "url": "https://cdn.barta24.com/logo.png"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://www.barta24.com/details/${catSlug}/${id}`
        }
    };
    return (
        <>
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
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
                                data-image={`https://cdn.barta24.com/${nc.ImageSmPath}`}
                            >
                                <h1>{nc.DetailsHeading}</h1>
                                <SocialShare title={nc.DetailsHeading} contentID={nc.ContentID} />

                                {nc.VideoID !== null && nc.VideoID !== '' && nc.ShowVideo === 1 ? (
                                    <div className={nc.Tags === null ? "col-sm-12 video-container mt-2" : "col-sm-12 video-container"}>
                                        {nc.VideoType === "youtube" ? (
                                            <iframe className="embed-responsive-item" title="youtube-video"
                                                src={`https://www.youtube.com/embed/${nc.VideoID}?autoplay=0`} frameBorder="0"
                                                allowFullScreen></iframe>
                                        ) : nc.VideoType === "vimeo" ? (
                                            <iframe title="vimeo-video" src={`https://player.vimeo.com/video/${nc.VideoID}`}
                                                frameBorder="0" allowFullScreen></iframe>
                                        ) : nc.VideoType === "facebook" ? (
                                            <iframe title="facebook-video"
                                                src={`https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebookapp%2Fvideos%2F${nc.VideoID}%2F&show_text=0&width=560`}
                                                width="560" height="315" style={{ border: "none", overflow: "hidden" }} scrolling="no"
                                                frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                                allowFullScreen></iframe>
                                        ) : nc.VideoType === "instagram" ? (
                                            <iframe className="embed-responsive-item" title="instagram-video"
                                                src={`//instagram.com/p/${nc.VideoID}/embed`} width="100%" frameBorder="0"
                                                scrolling="no" allowTransparency="true"></iframe>
                                        ) : null}
                                    </div>
                                ) : (
                                    <div className="DTopImg">
                                        <div className="Details">
                                            <a data-fancybox="" data-caption={nc.DetailsHeading}
                                                href={`${process.env.NEXT_PUBLIC_IMG_PATH + nc.ImageBgPath}`}
                                                title={nc.DetailsHeading}>
                                                <picture>
                                                    <img src={`${process.env.NEXT_PUBLIC_IMG_PATH + nc.ImageBgPath}`}
                                                        alt={nc.DetailsHeading} title={nc.DetailsHeading}
                                                        className="img-fluid img100" />
                                                </picture>
                                            </a>
                                        </div>
                                        <div className="DetailsTopCap">
                                            <p className="DTopImgCaption">{nc.ImageBgPathCaption}</p>
                                        </div>
                                    </div>
                                )}

                                <div
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

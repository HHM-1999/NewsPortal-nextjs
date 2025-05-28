import getApi from "../../../../../lib/getApi";
import DynamicMetadataClient from "./DynamicMetadataClient";
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
    const { id } = await params;

    const content = await getApi(`content-details/${id}`);

    const contentList = content.data

    if (!content) {
        return <div>Content not found.</div>;
    }

    return (
        <div style={{ padding: "20px" }}>
        <DynamicMetadataClient />
            {contentList.map((nc, i) => {
                return (
                    <>
                        <div className="newsDetail"   id={nc.ContentID} data-title={nc.DetailsHeading} key={nc.ContentID} data-image={`https://cdn.barta24.com/${nc.ImageSmPath}`}>
                            <h1 key={nc.ContentID}>{nc.DetailsHeading}</h1>
                            {nc.VideoID !== null && nc.VideoID !== '' && nc.ShowVideo === 1 ?
                                <>
                                    <div className={nc.Tags === null ? "col-sm-12 video-container mt-2" : "col-sm-12 video-container"}>
                                        {nc.VideoType === "youtube" ?
                                            <iframe className="embed-responsive-item" title="youtube-video" src={"https://www.youtube.com/embed/" + nc.VideoID + "?autoplay=0"} frameBorder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowFullScreen></iframe>
                                            : nc.VideoType === "vimeo" ?
                                                <iframe src={"https://player.vimeo.com/video/" + nc.VideoID} title="vimeo-video" frameBorder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
                                                : nc.VideoType === "facebook" ?
                                                    <iframe src={"https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebookapp%2Fvideos%2F" + nc.VideoID + "%2F&show_text=0&width=560"} title="facebook-video" width="560" height="315" style={{ border: "none", overflow: "hidden" }} scrolling="no" frameBorder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                                                    : nc.VideoType === "instagram" ?
                                                        <iframe className="embed-responsive-item" title="instagram-video" src={"//instagram.com/p/" + nc.VideoID + ">/embed"} width="100%" frameBorder="0" scrolling="no" allowtransparency="true"></iframe>
                                                        : false}
                                    </div>
                                </> :
                                <>
                                    <div className="DTopImg">
                                        <div className="Details">

                                            <a data-fancybox="" data-caption={nc.DetailsHeading}

                                                href={`${process.env.NEXT_PUBLIC_IMG_PATH + nc.ImageBgPath}`}
                                                title={nc.DetailsHeading}
                                            >
                                                <picture><img src={process.env.NEXT_PUBLIC_IMG_PATH + nc.ImageBgPath} alt={nc.DetailsHeading} title={nc.DetailsHeading} className="img-fluid img100" /></picture>
                                            </a>

                                            {/* <picture> <img src={process.env.NEXT_PUBLIC_IMG_PATH} data-src={process.env.REACT_APP_IMG_Path + nc.ImageBgPath} alt={nc.DetailsHeading} title={nc.DetailsHeading} className="img-fluid img100" /></picture> */}
                                        </div>
                                        {/* <img src={process.env.NEXT_PUBLIC_IMG_PATH} data-src={process.env.REACT_APP_IMG_Path + nc.ImageBgPath} alt={nc.ContentHeading} title={nc.ContentHeading} className="img-fluid img100" /> */}
                                        <div className="DetailsTopCap">
                                            <p className="DTopImgCaption">{nc.ImageBgPathCaption}</p>
                                        </div>
                                    </div>

                                </>
                            }
                            <div key={i}
                                dangerouslySetInnerHTML={{ __html: nc.ContentDetails }}
                                style={{ marginTop: "20px" }}
                            />
                        </div>


                    </>

                )
            })}

        </div>
    );
};

export default page;

import Header from '@/components/Header';
import React from 'react'
import getApi from '../../../lib/getApi';
import postApi from '../../../lib/postApi';
import Link from 'next/link';
import LoadMoreNews from './LoadMoreNews';
import Error from '../error';

// export async function generateMetadata({ params }) {
//     const { catSlug } = await params;
//     const CategoryList = await getApi(`category/${catSlug}`);
//     const category = CategoryList.category
//     return {
//         title: category.CategoryName || "Category - Barta24",
//         description: category.CategoryName || "Read full news on Barta24.",
//         openGraph: {
//             title: category.CategoryName || "Barta24 News",
//             description: category.CategoryName || "Barta24 - Trusted News",
//             images: [
//                 {
//                     url: ` https://cdn.barta24.com/${category.ImageSmPath}` || "barta24",
//                     width: 800,
//                     height: 600,
//                 },
//             ],
//         },
//         twitter: {
//             title: category.CategoryName || "Barta24",
//             description: category.CategoryName || "",
//             images: [`https://cdn.barta24.com/${category.ImageSmPath}` || "Barta24"],
//         },
//     };

// }
export async function generateMetadata({ params }) {
    const { catSlug } = await params;

    try {
        const CategoryList = await getApi(`category/${catSlug}`);
        const category = CategoryList?.category;

        if (!category) {
           ""
        }

        return {
            title: category?.CategoryName || "Category - Barta24",
            description: category?.CategoryName || "Read full news on Barta24.",
            openGraph: {
                title: category?.CategoryName || "Barta24 News",
                description: category?.CategoryName || "Barta24 - Trusted News",
                images: [
                    {
                        url: category?.ImageSmPath
                            ? `https://cdn.barta24.com/${category?.ImageSmPath}`
                            : "https://cdn.barta24.com/default.jpg",
                        width: 800,
                        height: 600,
                    },
                ],
            },
            twitter: {
                title: category?.CategoryName || "Barta24",
                description: category?.CategoryName || "",
                images: [
                    category?.ImageSmPath
                        ? `https://cdn.barta24.com/${category?.ImageSmPath}`
                        : "https://cdn.barta24.com/default.jpg",
                ],
            },
        };
    } catch (error) {
        console.error("Error generating metadata for catSlug:", catSlug, error);
        return {
            title: "Category - Barta24",
            description: "Read full news on Barta24.",
        };
    }
}

var limit = 8
var offset = 0
const CategoryPage = async ({ params }) => {
    const { catSlug } = await params;
    // console.log(catSlug);
    const CategoryList = await getApi(`category/${catSlug}`);
    const category = CategoryList.category

  
    // console.log(category);
    if (category) {
        var catID = category.CategoryID
        var LeadNewsLimit = 6
        var catLeadNews1List = []
        var top_content_ids = []
        var formdata = {}
        var innerContent = ""
        catLeadNews1List = await getApi(`inner-category-content/${catID}/${LeadNewsLimit}`)


        top_content_ids = (catLeadNews1List.inner_category_content).map(function (el) { return el.ContentID; });
        // console.log(top_content_ids);
        formdata = { 'top_content_ids': top_content_ids, 'category_id': catID, 'limit': limit, 'offset': offset };
        let list = await postApi(`inner-category-content-more`, formdata)
        innerContent = list.data
    }

    // else Error()
    return (
        <>
            <div className="container">
                <Header />
                <div className="row">
                    <div className="col-lg-10 mt-3">
                        <h1 className='text-center'>{category?.CategoryName}</h1>
                    </div>
                    <div className="row">
                        {innerContent?.map((nc, idx) => {
                            return (
                                <div className="col-lg-6" key={idx}>
                                    <Link href={`/details/${nc.Slug}/${nc.ContentID}`}>
                                        <div className="card mb-3 mt-3">
                                            <img src={`${process.env.NEXT_PUBLIC_IMG_PATH + nc.ImageBgPath}`} className="card-img-top img-fluid" alt={nc.DetailsHeading} title={nc.DetailsHeading} />
                                            <div className="card-body">
                                                <h5 className="card-title">{nc.DetailsHeading}</h5>
                                                <p className="card-text">{nc.ContentBrief}</p>
                                                <p className="card-text"><small className="text-body-secondary">{nc.created_at}</small></p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>


                            )
                        })}

                    </div>
                    {/* Load more component */}
                    <LoadMoreNews
                        categoryId={catID}
                        topContentIds={top_content_ids}
                        initialOffset={limit}
                    />
                </div>

            </div >

        </>

    )
}

export default CategoryPage
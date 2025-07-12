import React, { Suspense } from 'react'
import getApi from '../../../lib/getApi';
import postApi from '../../../lib/postApi';
import Link from 'next/link';
import LoadMoreNews from './LoadMoreNews';
import Image from 'next/image';
import Head from 'next/head';


var limit = 8
var offset = 0
const CategoryPage = async ({ params }) => {
    const { catSlug } = await params;
    const CategoryList = await getApi(`category/${catSlug}`);
    const category = CategoryList.category

    if (category) {
        var catID = category.CategoryID
        var LeadNewsLimit = 6
        var catLeadNews1List = []
        var top_content_ids = []
        var formdata = {}
        var innerContent = ""
        catLeadNews1List = await getApi(`inner-category-content/${catID}/${LeadNewsLimit}`)

        top_content_ids = (catLeadNews1List.inner_category_content).map(function (el) { return el.ContentID; });
        formdata = { 'top_content_ids': top_content_ids, 'category_id': catID, 'limit': limit, 'offset': offset };
        let list = await postApi(`inner-category-content-more`, formdata)
        innerContent = list.data
    }

    return (
        <>
            <style>{`
                .skeleton {
                    background: #e2e2e2;
                    border-radius: 4px;
                    overflow: hidden;
                    position: relative;
                }
                .shimmer {
                    animation: shimmer 3s infinite linear forwards;
                    background: linear-gradient(to right, #e2e2e2 8%, #f5f5f5 18%, #e2e2e2 33%);
                    background-size: 1000px 100%;
                }
                @keyframes shimmer {
                    0% { background-position: -1000px 0; }
                    100% { background-position: 1000px 0; }
                }
            `}</style>

            <div className="container">
                <div className="row">
                    <div className="col-lg-12 mt-3">
                        <div className="CatTitle">
                            <h1 className='text-center'>{category?.CategoryName}</h1>
                        </div>
                    </div>
                    <div className="category-area">
                        <div className="row">
                            {innerContent?.map((nc, idx) => {
                                return (
                                    <div className="col-lg-6" key={idx}>
                                        <Link href={`/details/${nc.Slug}/${nc.ContentID}`}>
                                            <div className="card mb-3 mt-3">
                                                <Suspense fallback={<div className="skeleton shimmer" style={{ height: '250px', width: '100%' }}></div>}>
                                                    <Image src={`${process.env.NEXT_PUBLIC_IMG_PATH + nc.ImageBgPath}`} className="card-img-top img-fluid" width={400} height={500} alt={nc.DetailsHeading} title={nc.DetailsHeading} priority />
                                                </Suspense>
                                                <div className="card-body">
                                                    <h5>{nc.DetailsHeading}</h5>
                                                    <p>{nc.ContentBrief}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })}
                            <LoadMoreNews
                                categoryId={catID}
                                topContentIds={top_content_ids}
                                initialOffset={limit}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CategoryPage

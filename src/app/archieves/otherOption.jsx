import Header from '@/components/Header'
import React from 'react'
import postApi from '../../../lib/postApi';
import Link from 'next/link';
import LoadMoreNews from './LoadMoreNews';
import Image from 'next/image';

export const metadata = {

    title: ' আর্কাইভস ',
    description: `আর্কাইভস`,
    robots: `আর্কাইভস :: বার্তা ২৪ ` ? 'index, follow' : 'noindex, nofollow',
    openGraph: {
        title: `আর্কাইভস :: বার্তা ২৪ `,
        keywords: `আর্কাইভস`,
        description: `আর্কাইভস`,
        image: `${process.env.NEXT_LAZY_IMAGE}`,
        url: `https://barta24.com/archieves`,
        site_name: "Barta24",
        type: "website",
    },
};
// const { catSlug } = await params;
// const CategoryList = await getApi(`category/${catSlug}`);
// const category = CategoryList.category



const Archieve = async () => {
    var limit = 12
    var offset = 0

    var formdata = { 'start_date': "", 'end_date': "", 'category_id': "", 'limit': limit, 'offset': offset, 'keywords': "" };

    const list = await postApi('archive', formdata)
    const archivedata = list.data
    // console.log(list);
    return (
        <div className='container'>
            <Header />
            <h1 className='text-center'>Archieve page</h1>
            
            <div className="row">
                {archivedata?.map((nc, idx) => {
                    return (
                        <div className="col-lg-6" key={idx}>
                            <Link href={`/details/${nc.Slug}/${nc.ContentID}`}>
                                <div className="card mb-3 mt-3">
                                    <Image src={`${process.env.NEXT_PUBLIC_IMG_PATH + nc.ImageBgPath}`} className="card-img-top img-fluid" alt={nc.DetailsHeading} title={nc.DetailsHeading} />
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
                <LoadMoreNews
                    initialOffset={limit}
                />

            </div>

        </div>

    )
}

export default Archieve
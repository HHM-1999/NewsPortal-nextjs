import Header from '@/components/Header'
import React from 'react'

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
const Archieve = () => {
    return (
        <div className='container'>
            <Header />
            <div className='text-center'>Archieve page</div>
        </div>

    )
}

export default Archieve
import React from 'react';
import getApi from '../../lib/getApi';
import Link from 'next/link';

let LeadData = {};
let LeadData2 = [];
const Lead = async () => {

    const list = await getApi('home-json-bn/generateLead.json');
    LeadData = list[0];
    LeadData2 = list.slice(1, 5);
    //   console.log(list); // Optional: view result in terminal/server log

    return (
        <div>
            <h2>Lead</h2>
            <div className="lead-area">
                <Link href={"/details/" + LeadData.categorySlug + "/" + LeadData.ContentID}>
                    <div className="lead-heading">
                        <h2>{LeadData.DetailsHeading}</h2>
                    </div>
                </Link>
            </div>
            <div className="lead-area-2">
                {LeadData2.map((nc) => {
                    return (
                        <Link href={"/details/" + nc.categorySlug + "/" + nc.ContentID} key={nc.ContentID}>
                            <div className="lead-heading">
                                <h2>{nc.DetailsHeading}</h2>
                            </div>
                        </Link>
                    )
                })}
            </div>

        </div>



    );
};

export default Lead;

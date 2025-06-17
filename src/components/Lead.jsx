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
        <div className='Lead-AreaSection'>
            <div className="row">
                <div className="col-lg-9">
                    <div className="row">
                        <div className="col-lg-6">
                            <div class="DTopNews">
                                <div class="thumbnail">
                                    <Link href={"/details/" + LeadData.categorySlug + "/" + LeadData.ContentID}>
                                        <div class="DImageResize">
                                            <img src={process.env.NEXT_PUBLIC_IMG_PATH + LeadData.ImageBgPath} alt={LeadData.DetailsHeading} title={LeadData.DetailsHeading} class="img-fluid img100" /></div>
                                        <div class="caption">
                                            <h3>{LeadData.DetailsHeading}</h3></div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-lg-3">
                    <div className="Advertisement">
                        <img src={"../assets/media/advertisement/13982910857184178936.gif"} alt="Radhuni" title='radhuni' />
                    </div>

                </div>
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

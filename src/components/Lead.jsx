import React from 'react';
import getApi from '../../lib/getApi';
import Link from 'next/link';

let LeadData = {};
let LeadData2 = [];
let LeadData3 = [];
const Lead = async () => {

    const list = await getApi('home-json-bn/generateLead.json');
    LeadData = list[0];
    LeadData2 = list.slice(1, 4);
    LeadData3 = list.slice(4, 7)

    return (
        <div className='Lead-AreaSection'>
            <div className="container">
                <div className="row">
                    <div className="col-lg-9">
                        <div className="row">
                            <div className="col-md-7">
                                <div className="DTopNews">
                                    <div className="thumbnail">
                                        <Link href={"/details/" + LeadData.categorySlug + "/" + LeadData.ContentID}>
                                            <div className="DImageResize">
                                                <img src={process.env.NEXT_PUBLIC_IMG_PATH + LeadData.ImageBgPath} alt={LeadData.DetailsHeading} title={LeadData.DetailsHeading} className="img-fluid img100" /></div>
                                            <div className="caption">
                                                <h3>{LeadData.DetailsHeading}</h3></div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="CatListWrap">
                                    {LeadData2.map((nc) => {
                                        return (
                                            <div className="Catlist"  key={nc.ContentID} >
                                                <Link href={"/details/" + nc.categorySlug + "/" + nc.ContentID}>
                                                    <div className="row">
                                                        <div className="col-md-5 col-5">
                                                            <picture><img src={process.env.NEXT_PUBLIC_IMG_PATH + nc.ImageSmPath} alt={nc.DetailsHeading} title={nc.DetailsHeading} className="img-fluid img100" /></picture>
                                                        </div>
                                                        <div className="col-md-7 col-7">
                                                            <h3 className="Title">{nc.DetailsHeading}</h3>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        )
                                    })}
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
            </div>
        </div>
    );
};

export default Lead;

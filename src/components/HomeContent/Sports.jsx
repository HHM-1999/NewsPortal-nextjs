import React from 'react'
import getApi from '../../../lib/getApi';
import ScrollLink from '../../../utils/ScrollLink';

let state = {};
let state2 = [];
let state3 = [];
async function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
const Sports = async () => {
    await delay(3000); 
    const list = await getApi('home-json-bn/generateCategory9.json');
    state = list[0];
    state2 = list.slice(1, 4);
    state3 = list.slice(4, 8);

    return (
        <div className='container'>
            <ScrollLink href={"/sports"}>
                <div className="section-header">
                    <div className="section-title">
                        <span className="shadow-text">খেলাধুলা</span>
                        <span className="main-text">খেলাধুলা</span>
                        <span className="arrow">&rsaquo;</span>
                    </div>
                </div>
            </ScrollLink>

            <div className="natioonal-area">
                <div className="row">
                    <div className="col-md-5 border-right-inner2">
                        <div className="lead-news">
                            {state ?
                                <ScrollLink href={"/details/" + state.Slug + "/" + state.ContentID}>
                                    <picture><img src={process.env.NEXT_PUBLIC_IMG_PATH + state.ImageBgPath} alt={state.DetailsHeading} title={state.DetailsHeading} className="img-fluid img100" /></picture>
                                    {state.ShowVideo === 1 || state.VideoID !== null ? <span className="play-btn-big"><i className="fas fa-play"></i></span> : ""}
                                    <h3 className="Title">{state.DetailsHeading}</h3>
                                    {/* <div className="Brief">
                                        <p>{state.ContentBrief}</p>
                                    </div> */}
                                </ScrollLink>
                                : " "}
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="row">
                            <div className="col-md-6 border-right-inner2">
                                <div className="CatListWrap1">
                                    {state2.map((nc) => {
                                        return (
                                            <div className="Catlist" key={nc.ContentID}>
                                                <ScrollLink href={"/details/" + nc.Slug + "/" + nc.ContentID}>
                                                    <div className="row">
                                                        <div className="col-md-7 col-7">
                                                            <h3 className="Title">{nc.DetailsHeading}</h3>
                                                        </div>
                                                        <div className="col-md-5 col-5">
                                                            <picture>
                                                                <img src={process.env.NEXT_PUBLIC_IMG_PATH + nc.ImageThumbPath} alt={nc.DetailsHeading} title={nc.DetailsHeading} className="img-fluid img100" />
                                                            </picture>
                                                            {nc.ShowVideo === 1 || nc.VideoID !== null ? <span className="play-btn"><i className="fas fa-play"></i></span> : ""}
                                                        </div>
                                                    </div>
                                                </ScrollLink>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="CatListWrap2">
                                    {state3.map((nc) => {
                                        return (
                                            <div className="Catlist" key={nc.ContentID}>
                                                <ScrollLink href={"/details/" + nc.Slug + "/" + nc.ContentID}>
                                                    <div className="row">
                                                        <div className="col-md-7 col-7">
                                                            <h3 className="Title">{nc.DetailsHeading}</h3>
                                                        </div>
                                                        <div className="col-md-5 col-5">
                                                            <picture>
                                                                <img src={process.env.NEXT_PUBLIC_IMG_PATH + nc.ImageSmPath} alt={nc.DetailsHeading} title={nc.DetailsHeading} className="img-fluid img100" />
                                                            </picture>
                                                            {nc.ShowVideo === 1 || nc.VideoID !== null ? <span className="play-btn"><i className="fas fa-play"></i></span> : ""}
                                                        </div>
                                                    </div>
                                                </ScrollLink>
                                            </div>
                                        )
                                    })}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Sports
"use client"; 

import React, { useState } from "react";
import Image from "next/image";
import styles from './styles/shimmer.module.css'
const ImageWithShimmerClient = ({ src, alt, title, caption }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <div className="DTopImg">
            <div className="Details">
                <a
                    data-fancybox=""
                    data-caption={title}
                    href={src}
                    title={title}
                >
                   
                    <div className={styles.shimmerWrapper}>
                        <Image
                            src={src}
                            alt={alt}
                            title={title}
                            width={400} 
                            height={250} 
                            priority={true} 
                            onLoad={() => setImageLoaded(true)}
                            className={imageLoaded ? styles.imageLoaded : styles.imageLoading} 
                            style={{
                                width: "100%",
                                height: "auto",
                                objectFit: "cover",
                                position: "relative",
                            }}
                        />
                    </div>
                </a>
            </div>
            <div className="DetailsTopCap">
                <p className="DTopImgCaption">{caption}</p>
            </div>
        </div>
    );
};

export default ImageWithShimmerClient;
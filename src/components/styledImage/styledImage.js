import React from 'react';
import Image from "next/image";
import styles from './styledImage.module.css'
const StyledImage = (props) => {
    return (
        <div className={styles.roundedImage} style={{height:props.height, width:props.width}}>
            <Image width={1000} height={1000} src={props.src} alt="Image"/>
        </div>

    );
};

export default StyledImage;
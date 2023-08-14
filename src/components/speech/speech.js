import React from 'react';
import styles from "./speech.module.css"
import StyledImage from "@/components/styledImage/styledImage";

const Speech = (props) => {
    return (
        <div className={styles.speechContainer}>
            <div className={`${styles.innerSection} ${props.reverse ? styles.reverse : ''}`}>
                <div className={styles.image}>
                    <StyledImage src={props.speech.image}  height={"250px"} width={"250px"}/>
                </div>
                <div className={styles.speech}>
                    <h1 className={styles.title}><span>{props.speech.title}</span> বক্তব্য </h1>
                    <p className={styles.body}>
                        {props.speech.content}
                    </p>
                    <h3 className={styles.name}>{props.speech.name}</h3>
                    <p className={styles.designation}>{props.speech.designation}</p>
                    <p className={styles.locationn}>{props.speech.location}</p>

                </div>
            </div>
        </div>
    );
};

export default Speech;
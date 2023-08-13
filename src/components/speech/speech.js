import React from 'react';
import styles from "./speech.module.css"
import StyledImage from "@/components/styledImage/styledImage";
import st from '/public/images/man1.png'

const Speech = (props) => {
    return (
        <div className={styles.speechContainer}>
            <div className={`${styles.innerSection} ${props.reverse ? styles.reverse : ''}`}>
                <div className={styles.image}>
                    <StyledImage src={"https://media.smartavijogbox.com/files/assets/man1.png"}  height={"250px"} width={"250px"}/>
                </div>
                <div className={styles.speech}>
                    <h1 className={styles.title}><span>উপজেলা নির্বাহী অফিসারের</span> বক্তব্য </h1>
                    <p className={styles.body}>
                        বর্তমান সরকার স্মার্ট বাংলাদেশ বিনির্মাণের লক্ষ্যে গৃহীত পরিকল্পনার একটি অন্যতম উপাদান হচ্ছে
                        স্মার্ট সিটিজেন গড়ে তোলা। শিক্ষার মানোন্নয়নে এই স্মার্ট সিজিজেন গুরুত্বপূর্ণ ভূমিকা রাখতে পারে।
                        সরকারের এই পরিকল্পনা বাস্তব রূপায়নের নিমিত্ত
                        আশুগঞ্জ উপজেলার প্রাথমিক, মাধ্যমিক ও মাদ্রাসার শিক্ষার মানোন্নয়নের জন্য অত্র উপজেলার সকল শিক্ষা
                        প্রতিষ্ঠানের ছাত্র-ছাত্রী ও অভিভাবকবৃন্দের অভিযোগ/মতামত গ্রহণের দ্রুততম এবং স্মার্ট মাধ্যম
                        হিসেবে "স্মার্ট অভিযোগ বক্স" নামে একটি ডিজিটাল মাধ্যম তৈরির উদ্যোগ গ্রহণ করি। অনলাইনভিত্তিক এই
                        এপ্লিকেশনটি ব্যবহার করে উপজেলার যেকোনো অভিভাবক ও ছাত্র-ছাত্রী সরাসরি তার অভিযোগ/মতামত উপজেলা
                        প্রশাসন বরাবর প্রেরণ করতে পারবে। সেসকল অভিযোগ/মতামত উপজেলা নির্বাহী অফিসার, উপজেলা মাধ্যমিক
                        শিক্ষা অফিসার ও উপজেলা শিক্ষা অফিসার আমলে নিয়ে দ্রুততম সময়ে প্রয়োজনীয় পদক্ষেপ গ্রহণ করতে পারে।
                        "স্মার্ট অভিযোগ বক্স" টি আশুগঞ্জ উপজেলার শিক্ষার মানোন্নয়নের গুরুত্বপূর্ণ অবদান রাখবে এবং জনগণকে
                        সরকার ঘোষিত স্মার্ট সিজিজেন হিসেবে প্রস্তুত করতে সহায়ক ভূমিকা পালন করবে।

                    </p>
                    <h3 className={styles.name}>শ্যামল চন্দ্র বসাক</h3>
                    <p className={styles.designation}>উপজেলা নির্বাহী অফিসার</p>

                </div>
            </div>
        </div>
    );
};

export default Speech;
import React from 'react';
import Image from "next/image";
import fb from 'public/icon/fb.svg'
import tweet from 'public/icon/tweet.svg'
import insta from 'public/icon/insta.svg'
import styles from "@/components/footer/footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
                <a className={styles.logo}>
                    <span>স্মার্ট অভিযোগ বক্স</span>
                </a>
                <p className={styles.copyright}>©
                    ২০২৩ স্মার্ট অভিযোগ বক্স — সমস্ত অধিকার সংরক্ষিত
                </p>
                <div className={styles.icons}>
                    <a className={styles.icon}>
                        <Image src={fb} alt={"facebook icon"}/>
                    </a>
                    <a className={styles.icon}>
                        <Image src={tweet} alt={"Tweeter icon"}/>
                    </a>
                    <a className={styles.icon}>
                        <Image src={insta} alt={"instagram icon"}/>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
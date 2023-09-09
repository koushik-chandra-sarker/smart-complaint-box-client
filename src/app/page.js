import Image from 'next/image'
import styles from "./page.module.css"
import Speech from "@/components/speech/speech";
import Link from "next/link";
import icon from "/public/icon/menu.svg"
import {homaPage} from "@/utils/data";

export default function Home() {

    return (
        <div>
            <div className={styles.hero}>
                <div className={styles.background}>
                    <Image className={`${styles.bgImg} md:block hidden`} src={"/images/banner.jpg"} width={1000}
                           height={800} alt={"banner"}/>
                    <Image className={`${styles.bgImg}  md:hidden block `} src={"/images/banner-m.jpg"} width={1000}
                           height={800} alt={"banner"}/>
                    <div className={styles.overlay}/>
                    <div className={styles.inner}>
                        <div className={"flex flex-col gap-5 items-center"}>
                            <h4>আশুগঞ্জ উপজেলার</h4>
                            <h1>স্মার্ট অভিযোগ বক্সে আপনাকে স্বাগতম</h1>
                            <div className={styles.actionButton}>
                                {/*<Link className={styles.button} href={`/complaint`}>অভিযোগ করুন</Link>*/}
                                <Link href={"/about"} className={`${styles.button} !bg-primary-400`}>আমাদের
                                    সম্পর্কে</Link>
                            </div>
                        </div>

                        <div
                            className={"bg-primary-200 flex md:flex-row flex-col shadow  justify-between md:gap-5 items-center p-4 md:mt-20 md:-mb-0 -mb-20 md:w-8/12 w-10/12 mx-auto"}>

                            <div className={"flex gap-5 "}>
                                <Image className={"md:block hidden"} src={icon} alt={"iocn"}/>
                                <p className={"!text-gray-800"}>
                                    আপনার কোনো অভিযোগ / মতামত / পরামর্শ আছে? যদি থাকে তাহলে আমাদেরকে জানাতে....
                                </p>
                            </div>
                            <div className={styles.actionButton}>
                                <Link className={`${styles.button} !bg-secondary-400 hover:!bg-secondary-500`}
                                      href={`/complaint`}>এখানে ক্লিক করুন</Link>
                            </div>

                        </div>
                    </div>


                </div>
            </div>
            <div className={"md:mt-24 mt-32"}>
                {
                    homaPage.speeches.map((speech, index) => (
                        <Speech key={index} speech={speech}/>
                    ))
                }
                {/*<Speech reverse={true}/>*/}
            </div>

        </div>
    )
}

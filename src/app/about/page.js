import React from 'react';
import Image from "next/image";
import aboutImage from "public/images/about.jpg"
import Gallery from "@/components/gallery/gallery";
import {aboutPage} from "@/utils/data";

const Page = () => {
    return (<div>
            <section className="flex  font-poppins  mt-10">
                <div className="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
                    <div className="flex flex-wrap ">
                        <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0 ">
                            <Image src={aboutPage.image} width={1000} height={1000} alt="about us image"
                                   className="relative z-40 object-cover w-full h-96 rounded-3xl border border-primary-300"/>
                        </div>
                        <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0 ">
                            <h2 className="mb-4 text-4xl font-semibold text-secondary-400">
                              {aboutPage.title}
                            </h2>
                            <p className="mb-10 text-base leading-7 text-gray-500 dark:text-gray-400">
                                {aboutPage.content}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div>
                {/*<Gallery/>*/}
            </div>
        </div>);
};

export default Page;
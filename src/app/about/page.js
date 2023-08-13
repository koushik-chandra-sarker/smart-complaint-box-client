import React from 'react';
import Image from "next/image";
import aboutImage from "public/images/about.jpg"
import Gallery from "@/components/gallery/gallery";

const Page = () => {
    return (<div>
            <section className="flex  font-poppins  mt-10">
                <div className="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
                    <div className="flex flex-wrap ">
                        <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
                            <Image src={"https://media.smartavijogbox.com/files/assets/about.jpg"} width={1000} height={1000} alt="about us image"
                                   className="relative z-40 object-cover w-full h-96 rounded-3xl"/>
                        </div>
                        <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0 ">
                            <h2 className="mb-4 text-4xl font-semibold text-secondary-400">
                                আমাদের সম্পর্কে
                            </h2>
                            <p className="mb-10 text-base leading-7 text-gray-500 dark:text-gray-400">
                                বর্তমান সরকার স্মার্ট বাংলাদেশ বিনির্মাণের লক্ষ্যে গৃহীত পরিকল্পনার একটি অন্যতম উপাদান
                                হচ্ছে
                                স্মার্ট সিটিজেন গড়ে তোলা। শিক্ষার মানোন্নয়নে এই স্মার্ট সিজিজেন গুরুত্বপূর্ণ ভূমিকা
                                রাখতে পারে।
                                সরকারের এই পরিকল্পনা বাস্তব রূপায়নের নিমিত্ত
                                আশুগঞ্জ উপজেলার প্রাথমিক, মাধ্যমিক ও মাদ্রাসার শিক্ষার মানোন্নয়নের জন্য অত্র উপজেলার সকল
                                শিক্ষা
                                প্রতিষ্ঠানের ছাত্র-ছাত্রী ও অভিভাবকবৃন্দের অভিযোগ/মতামত গ্রহণের দ্রুততম এবং স্মার্ট
                                মাধ্যম
                                হিসেবে "স্মার্ট অভিযোগ বক্স" নামে একটি ডিজিটাল মাধ্যম তৈরির উদ্যোগ গ্রহণ করি।
                                অনলাইনভিত্তিক এই
                                এপ্লিকেশনটি ব্যবহার করে উপজেলার যেকোনো অভিভাবক ও ছাত্র-ছাত্রী সরাসরি তার অভিযোগ/মতামত
                                উপজেলা
                                প্রশাসন বরাবর প্রেরণ করতে পারবে। সেসকল অভিযোগ/মতামত উপজেলা নির্বাহী অফিসার, উপজেলা
                                মাধ্যমিক
                                শিক্ষা অফিসার ও উপজেলা শিক্ষা অফিসার আমলে নিয়ে দ্রুততম সময়ে প্রয়োজনীয় পদক্ষেপ গ্রহণ করতে
                                পারে।
                                "স্মার্ট অভিযোগ বক্স" টি আশুগঞ্জ উপজেলার শিক্ষার মানোন্নয়নের গুরুত্বপূর্ণ অবদান রাখবে
                                এবং জনগণকে
                                সরকার ঘোষিত স্মার্ট সিজিজেন হিসেবে প্রস্তুত করতে সহায়ক ভূমিকা পালন করবে।
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
import './globals.css'
import {Inter} from 'next/font/google'
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import {Providers} from "@/redux/providers.js";
import 'sweetalert2/src/sweetalert2.scss'

const inter = Inter({subsets: ['latin']})

export const metadata = {
    title: 'স্মার্ট অভিযোগ বক্সে',
    description: 'স্মার্ট অভিযোগ বক্স অ্যাপস হল অনলাইন প্ল্যাটফর্ম /মোবাইল অ্যাপ্লিকেশন, যেটি অভিযোগকারীদের মোবাইল ডিভাইসে ইনস্টল করে " +\n' +
        ' তাদেরকে সহজভাবে অনলাইনে বিভিন্ন ধরনের অভিযোগ যেমন অপরাধ, নির্দোষতা, নির্যাতন, আইনপরামর্শ ইত্যাদি অভিযোগ দাখিল করতে" +\n' +
        ' সাহায্য করে।',
}

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body className={inter.className}>
            <Providers>
                <Header />
                <main className="flex-grow ">
                    {children}
                </main>
                <Footer/>
            </Providers>
        </body>
        </html>
    )
}
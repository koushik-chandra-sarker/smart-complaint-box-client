
import styles from '@/components/loginModal/loginModal.module.css'
import Image from "next/image";
import close from "public/icon/close.svg"

const LoginModal = () => {

    return (
        <>
            <dialog id="login_modal" className="modal ">
                <form method="dialog" className="modal-box max-w-[400px]">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <div className={styles.loginContainer}>
                        {/*<a className={styles.logo}>*/}
                        {/*    <span>স্মার্ট অভিযোগ বক্স</span>*/}
                        {/*</a>*/}
                        <h4>লগইন</h4>
                        <div >
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text">ইউজারনেম</span>
                                </label>
                                <input type="text" placeholder="আপনার ইউজারনেম"
                                       className="input input-bordered w-full "/>
                            </div>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text">পাসওয়ার্ড</span>
                                </label>
                                <input type="text" placeholder="আপনার পাসওয়ার্ড"
                                       className="input input-bordered w-full"/>
                            </div>
                            <div className="form-control mt-5">
                                <label className="cursor-pointer label">
                                    <span className="label-text">Remember me</span>
                                    <input type="checkbox"  className="checkbox checkbox-success"/>
                                </label>
                            </div>
                            <div className="form-control w-full mt-5">
                                <button className="btn btn-block bg-primary-400 hover:bg-primary-500 text-white">লগইন</button>
                            </div>
                        </div>
                    </div>
                </form>

            </dialog>
        </>
    );
};

export default LoginModal;
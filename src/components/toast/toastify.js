import Toastify from "toastify-js";

export const Toast = {
    error : (test)=>{
        Toastify({
                text: test,
                duration: 3000,
                position: "center",
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast();
    }
}
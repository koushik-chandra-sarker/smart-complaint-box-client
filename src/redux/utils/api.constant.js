export const API = {
    baseUrl: "http://127.0.0.1:8000/api",
    // baseUrl: "https://admin.smartovijogbox.com/api",
    auth: {
        login: "/author/login/",
        refreshToken: "/author/token/refresh/",
        // registration: "/user/create",
        // logout: "/user/logout",
        // activate: "/user/activation"
    },
    user: {
        designation: {
            getAll: "/author/get-designatoin/"
        }
    },
    complaintBox: {
        municipality: {
            getAll: "/complaint-box/v1/get-municipality"
        },
        institution: {
            getAllType: "/complaint-box/v1/get-institute-type",
            getAllClass: "/complaint-box/v1/get-class"
        },
        commonProperty: {
            get: "/complaint-box/v1/get-common-property"
        },
        complaint:{
            get: "complaint-box/v1/get-complaints",
            add: "/complaint-box/v1/complaints/",
            updateStatus: "/complaint-box/v1/complaints/",
            individualReportPdf: "/complaint-box/v1/generate-individual-report-pdf/"
        },
        feedback: {
            getByComId: "/complaint-box/v1/feedback/complaint/",
            add: "/complaint-box/v1/feedback/"
        },
        sendSms: "/complaint-box/v1/send-sms/",
        file:{
            upload:"/complaint-box/v1/upload/"
        }
    }
}
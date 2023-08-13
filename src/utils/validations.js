export function login_validation(values) {
    const errors = {};
    // validation for email
    if (!values.email) {
        errors.email = 'Email Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    // validation for password
    else if (!values.password) {
        errors.password = "Password Required";
    } else if (values.password.length < 4 || values.password.length > 20) {
        errors.password = "Password must be greater then 4 and less then 20 characters long";
    } else if (values.password.includes(" ")) {
        errors.password = "Invalid Password";
    }

    return errors;

}

export function complaint_form_validation(values) {
    const errors = {};
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!values.title) {
        errors.title = "Required"
    }
    else if(!values.complainant_type) errors.complainant_type = "Required"
    else if(!values.complainant_name) errors.complainant_name = "Required"
    else if(!values.complainant_phone) errors.complainant_phone = "Required"
    else if (!values.complainant_email) {
        errors.complainant_email = 'Email Required';
    } else if (!values.complainant_email.match(mailformat)) {
        errors.complainant_email = 'Invalid email address';
    }
     else if(!values.student_name) errors.student_name = "Required"
     else if(!values.student_roll) errors.student_roll = "Required"
     else if(!values.student_class) errors.student_class = "Required"
     else if(!values.institute) errors.institute = "Required"
     else if(!values.complained_to) errors.complained_to = "Required"
     else if(!values.subject) errors.subject = "Required"
     else if(!values.details) errors.details = "Required"

    return errors;

}
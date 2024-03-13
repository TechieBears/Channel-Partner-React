// ===================== Custom validation function for a 6-digit PIN code ================
export const validatePIN = (value) => {
    const pattern = /^[0-9]{6}$/;
    if (pattern.test(value)) {
        return true;
    }
    return 'Pincode must be 6-digit';
};

// =================== Custom validation function for a 10-digit US phone number ============
// export const validatePhoneNumber = (value) => {
//     const pattern = /^\d{10}$/;
//     if (pattern.test(value)) {
//         return true;
//     }
//     return 'Phone Number must be 10-digit';
// };


// Custom validation function for a 10-digit US phone number
export const validatePhoneNumber = (value) => {
    const isValid = /^(\+91)?[6-9][0-9]{9}$/.test(value);
    if (!isValid) {
        return "Phone Number must be 10-digit";
    }
    return true;
};


// ==================== Custom validation function for email ========================
export const validateEmail = (value) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (emailPattern.test(value)) {
        return true;
    }
    return 'Invalid email address';
};

// ==================== Custom validation function for GST ========================
export const validateGST = (value) => {
    // GST pattern for India
    const gstPattern = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;

    if (gstPattern.test(value)) {
        return true;
    }

    return 'Invalid GST number*';
};

export const validateCommision = (value) => {
    if (isNaN(value) || value.toString().length > 2) {
        return "Please enter a number with maximum 2 digits";
    }
    return true;
};
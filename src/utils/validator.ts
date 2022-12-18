export function validateEmail(email: string) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return re.test(email)
};

export function validatePhone(phone: string) {
    const digits = phone.split('')
    if (digits.length === 11 && digits[0] === '0' && digits[1] === '9') {
        return true
    } return false
};
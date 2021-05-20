const CheckBillingInfoValidity = (billingId, paymentId) => {
    let bp = billingId.concat(paymentId);
    return ValidateChecksumId(billingId) &&
        ValidateChecksumId(paymentId.substring(0, [paymentId.length - 1])) &&
        ValidateChecksumId(bp);
}
const ValidateChecksumId = (id) => {
    let controllerCode = Number(id[id.length - 1]);
    id = id.substring(0, id.length - 1);
    let sum = 0;
    let q = 2;
    let temp;
    let r = 0;
    let tempCode;
    let i = id.length - 1;
    while (i >= 0) {
        temp = id[i];
        i = i - 1;
        sum = sum + (Number(temp) * q);
        q = q + 1;
        if (q == 8)
            q = 2;
    }
    r = sum % 11;
    if (r == 0 || r == 1)
        tempCode = 0;
    else
        tempCode = 11 - r;
    if (tempCode === controllerCode)
        return true;
    else
        return false;
}

export default CheckBillingInfoValidity;
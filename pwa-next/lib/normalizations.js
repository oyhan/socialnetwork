

export function normalizenumber(number) {

    var normalizedNumber = "";
    for (const char of number) {
        switch (char) {
            case '۱':
                // return "1";
                normalizedNumber+='1';
                break;
            case '۲':

                normalizedNumber+="2";

                break;
            case '۳':

                normalizedNumber+="3";

                break;
            case '۴':

                normalizedNumber+="4";

                break;
            case '۵':

                normalizedNumber+="5";

                break;
            case '۶':

                normalizedNumber+="6";

                break;
            case '۷':

                normalizedNumber+="7";

                break;
            case '۸':

                normalizedNumber+="8";

                break;
            case '۹':

                normalizedNumber+="9";

                break;
            case '۰':

                normalizedNumber+="0";

                break;
            default:
                
                normalizedNumber+=char;
                break;
        }
    }
    return normalizedNumber;

}

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export const numberOnly = (e) => {
    if (e.shiftKey === true) {
        if (e.which == 9) {
            return true;
        }
        e.preventDefault();
        return false;
    }
    if ((e.which > 57 && e.which < 96) || e.which > 105) {
        
        e.preventDefault();
        return false;
    }
    if (e.which == 32) {
        e.preventDefault();
        return false;

    }
    return true;
}
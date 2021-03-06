

export  function setRecentSearchHistory(searchResult) {

    var currentSearchHistory = localStorage.getItem("citySearchHistory");
    if (!currentSearchHistory) {
        const history = [{ ...searchResult }];
        localStorage.setItem("citySearchHistory", JSON.stringify(history));
    }
    else {
        var currentArray = JSON.parse(currentSearchHistory);
        
        const alreadyExists = currentArray.some(h=>h.id==searchResult.id);
        if(alreadyExists) return;

        localStorage.setItem("citySearchHistory", JSON.stringify([{...searchResult},...currentArray]));
    }
}


export  function getRecentSearchHistory() {

    var currentSearchHistory = localStorage.getItem("citySearchHistory");
    if (!currentSearchHistory) {
        return []
    }
    else {
        var currentArray = JSON.parse(currentSearchHistory);
        return currentArray.filter((r,i)=>i<3);
    }
}

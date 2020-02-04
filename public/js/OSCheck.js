let isMobileCachedResult;

function isMobileOS() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        isMobileCachedResult = true;
        return true;
    }
    else {
        isMobileCachedResult = false;
        return false;
    }
}

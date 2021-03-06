window.onload = function() {
    // 同时按下两个手指
    document.addEventListener('touchstart', function(event) {
        if(event.touches.length > 1) {
            event.preventDefault()
        }
    })
    var lastTouchEnd = 0;
    // 特别注意300ms时差的设置
    document.addEventListener('touchend', function(event) {
        var now = (new Date()).getTime();
        if(now-lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    })
}

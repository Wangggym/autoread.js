var nobrs = document.getElementById('w_code').contentWindow.document.getElementsByTagName('nobr');
console.log(nobrs);
function isCompleted(element) {
    var completed = element.getElementsByClassName('completed');
    return !!(completed && completed.length)
}
function executeReadClass(nobr, order) {
    nobr.getElementsByTagName('a')[0].click();
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let count = 0;
            var interval = null;
            var readTime = getReadTime();
            interval = setInterval(() => {
                count++;
                if (isCompleted(nobr)) {
                    clearInterval(interval);
                    return resolve(`执行成功:${order},执行时间:${count},阅读时间:${readTime}`);
                } else if (count === readTime) {
                    clearInterval(interval);
                    return resolve(`执行失败:${order},执行时间:${count},阅读时间:${readTime}`);
                }
                (function () { console.log("==执行阅读任务== 当前任务No:" + order); })()
            }, 1000);
        }, 5000);
    });
}
function getReadTime() {
    var readTimeString = document.getElementById('w_lms_content').contentWindow.document.getElementsByTagName('table')[1].getElementsByTagName('td')[0].innerText
    var patt1 = /习[0-9]+秒/;
    var patt2 = /[0-9]+/;
    var readTime = Number(readTimeString.match(patt1)[0].match(patt2)[0]) + 60;
    console.log(`预计需要阅读时间:${readTime}`);
    return readTime;
}
async function excuteRead() {
    for (var i = 0; i < nobrs.length; i++) {
        var nobr = nobrs[i];
        var notattempts = nobr.getElementsByClassName('notattempt');
        var incompletes = nobr.getElementsByClassName('incomplete');
        if ((notattempts && notattempts.length) || (incompletes && incompletes.length)) {
            var result = await executeReadClass(nobr, i)
            console.log(result)
        }
    }
    for (var i = 0; i < nobrs.length; i++) {
        var nobr = nobrs[i];
        var notattempts = nobr.getElementsByClassName('notattempt');
        var incompletes = nobr.getElementsByClassName('incomplete');
        if ((notattempts && notattempts.length) || (incompletes && incompletes.length)) {
            var result = await executeReadClass(nobr, i)
            console.log(result)
        }
    }
    alert("~.~ complated! ~.~")
}
if (nobrs.length) {
    excuteRead();
}



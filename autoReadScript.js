var nobrs = document.getElementsByTagName('nobr');
console.log(nobrs);
function isCompletedListener(element) {
    var completed = element.getElementsByClassName('completed');
    return !!(completed && completed.length)
}
function executeReadClass(nobr, order) {
    nobr.getElementsByTagName('a')[0].click();
    var count = 0;
    var interval = null;
    return new Promise((resolve, reject) => {
        interval = setInterval(() => {
            count++;
            if (isCompletedListener(nobr)) {
                clearInterval(interval);
                return resolve("执行成功：" + order);
            } else if (count === 24) {
                clearInterval(interval);
                return resolve("执行失败" + order);
            }
            (function () { console.log("==执行阅读任务== 当前任务No:" + order); })()
        }, 5000);
    });
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
}
if (nobrs.length) {
    excuteRead();
}



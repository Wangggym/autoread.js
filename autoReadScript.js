var nobrs = document.getElementsByTagName('nobr');
console.log(nobrs);
function isCompleted(element) {
    var completed = element.getElementsByClassName('completed');
    return !!(completed && completed.length)
}
function executeReadClass(nobr, order, maxExcuteTime) {
    nobr.getElementsByTagName('a')[0].click();
    let count = 0;
    var interval = null;
    return new Promise((resolve, reject) => {
        interval = setInterval(() => {
            count++;
            if (isCompleted(nobr)) {
                clearInterval(interval);
                return resolve("执行成功：" + order);
            } else if (count === maxExcuteTime / 2) {
                clearInterval(interval);
                return resolve("执行失败" + order);
            }
            (function () { console.log("==执行阅读任务== 当前任务No:" + order); })()
        }, 2000);
    });
}
async function excuteRead() {
    for (var i = 0; i < nobrs.length; i++) {
        var nobr = nobrs[i];
        var notattempts = nobr.getElementsByClassName('notattempt');
        var incompletes = nobr.getElementsByClassName('incomplete');
        if ((notattempts && notattempts.length) || (incompletes && incompletes.length)) {
            var result = await executeReadClass(nobr, i, 120)
            console.log(result)
        }
    }
    for (var i = 0; i < nobrs.length; i++) {
        var nobr = nobrs[i];
        var notattempts = nobr.getElementsByClassName('notattempt');
        var incompletes = nobr.getElementsByClassName('incomplete');
        if ((notattempts && notattempts.length) || (incompletes && incompletes.length)) {
            var result = await executeReadClass(nobr, i, 180)
            console.log(result)
        }
    }
    alert("~.~ complated! ~.~")
}
if (nobrs.length) {
    excuteRead();
}



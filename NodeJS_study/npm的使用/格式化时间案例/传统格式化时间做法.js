//定义格式化时间的函数
function formatDate(dateStr) {
    const d = new Date(dateStr);
    const yy = d.getFullYear();
    const mm = padZero(d.getMonth() + 1);
    const dd = padZero(d.getDate());

    const h = padZero(d.getHours());
    const m = padZero(d.getMinutes());
    const s = padZero(d.getSeconds());

    return `${yy}-${mm}-${dd} ${h}:${m}:${s}`
}

function padZero(val) {
    return val > 9 ? val : '0' + val
}
module.exports = {
    formatDate
}
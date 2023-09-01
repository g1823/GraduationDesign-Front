export function formatTime(oldTime) {
    const date = new Date(oldTime);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    // 格式化时间字符串
    const formattedTime = `${year}-${month
        .toString()
        .padStart(2, "0")}-${day.toString().padStart(2, "0")} ${hour
            .toString()
            .padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second
                .toString()
                .padStart(2, "0")}`;
    return formattedTime;
}
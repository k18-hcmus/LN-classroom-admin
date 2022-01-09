export const getLocation = function (url: string) {
    const tag = document.createElement("a");
    tag.href = url;
    return tag;
};

export const copyToClipboard = async (text: string) => {
    if (!navigator.clipboard) {
        const elem = document.createElement('textarea');
        elem.value = text;
        document.body.appendChild(elem);
        elem.select();
        document.execCommand('copy');
        document.body.removeChild(elem);
    } else {
        await navigator.clipboard.writeText(text)
    }

}
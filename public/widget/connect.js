(() => {
    const script = document.currentScript,
        URL = script.src.match(/https?:\/\/.+?\//)[0] + "widget?" + script.src.replace(/^.+\?/, "");

    const div = document.createElement('div');
    div.innerHTML = `<iframe src="${URL}" style="border: 0; position: absolute; z-index: 9999;"></iframe><div style="display: block; width: 100%;"></div>`;
    script.parentNode.insertBefore(div, script.nextSibling);

    setTimeout(() => {
        const widget = div.getElementsByTagName('iframe')[0],
            container = div.getElementsByTagName('div')[0];

        const width = widget.parentElement.clientWidth,
            isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        widget.style.width = width + 'px';
        if (width > 771) {
            widget.style.height = (isMobile ? 200 : 340) + 'px';
            container.style.height = 200 + 'px';
        }
        else {
            widget.style.height = (isMobile ? 270 : 410) + 'px';
            container.style.height = 270 + 'px';
        }
    }, 1);
})();
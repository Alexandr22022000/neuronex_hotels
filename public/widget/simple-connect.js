(() => {
    const script = document.currentScript,
        URL = script.src.match(/https?:\/\/.+?\//)[0] + "widget?" + script.src.replace(/^.+\?/, "");

    const div = document.createElement('div');
    div.innerHTML = `<iframe src="${URL}" style="border: 0; width: 100%;"></iframe>`;
    script.parentNode.insertBefore(div, script.nextSibling);

    setTimeout(() => {
        const widget = div.getElementsByTagName('iframe')[0];
        const width = widget.offsetWidth,
            isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (width > 771)
            widget.style.height = (isMobile ? 200 : 340) + 'px';
        else
            widget.style.height = (isMobile ? 270 : 410) + 'px';
    }, 1);
})();
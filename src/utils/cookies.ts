export function getCookie(name: string) {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name: string, value: string, props: { expires: number | Date }) {
    const d = new Date();
    if (typeof props.expires == 'number') {
        d.setTime(d.getTime() + props.expires * 60000);
    }
    const ds = d.toUTCString();

    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value + '; expires=' + ds;
    document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
    setCookie(name, '', { expires: -1 });
}

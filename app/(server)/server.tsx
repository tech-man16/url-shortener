
export const getUrl = async (pathname: string, orig_url: string) => {
    if (!orig_url.startsWith("http"))
        orig_url = "https://" + orig_url

    const req = await fetch(pathname, {
        method: "POST",
        body: JSON.stringify({ url: orig_url })
    })

    const res = await req.json();
    return res;
}
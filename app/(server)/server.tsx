
export const getUrl = async (pathname: string, orig_url: string) => {
    const req = await fetch(pathname, {
        method: "POST",
        body: JSON.stringify({ url: orig_url })
    })

    const res = await req.json();
    return res;
}
"use strict";

/*
This is the page for which we want to rewrite the User-Agent header.
*/


/*
Initialize the UA;
*/
var ua = "Mozilla/5.0 (Linux; Android 6.0.1; SM-G928F Build/MMB29K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Mobile Safari/537.36";
/*
Rewrite the User-Agent header to "ua".
*/
/*function rewriteUserAgentHeaderBlocking(e) {
    console.log("something");
    for (var header of e.requestHeaders) {
        if (header.name.toLowerCase() === "user-agent") {
            header.value = ua;
        }
    }
    return { requestHeaders: e.requestHeaders };
}*/

function rewriteUserAgentHeaderAsync(e) {
    var asyncRewrite = new Promise((resolve, reject) => {
        window.setTimeout(() => {
            for (var header of e.requestHeaders) {
                if (header.name.toLowerCase() === "user-agent") {
                    header.value = ua;
                }
            }
            resolve({ requestHeaders: e.requestHeaders });
        }, 2000);
    });

    return asyncRewrite;
}

/*
Add rewriteUserAgentHeader as a listener to onBeforeSendHeaders,
only for the target page.

Make it "blocking" so we can modify the headers.
*/
browser.webRequest.onBeforeSendHeaders.addListener(rewriteUserAgentHeaderAsync, { urls: targetPage }, ["blocking", "requestHeaders"]);
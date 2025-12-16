const DEFAULT_PATTERNS = `*://*.google.com/search*
*://*.duckduckgo.com/*
*://*.startpage.com/*
*://*.bing.com/*
*://*.ecosia.org/*
*://search.yahoo.com/*`;

chrome.storage.sync.get(['patterns'], (result) => {
    document.getElementById("sites").value = result.patterns || DEFAULT_PATTERNS;
});

document.getElementById("reset").addEventListener("click", () => {
    document.getElementById("sites").value = DEFAULT_PATTERNS;
    chrome.storage.sync.set({ patterns: DEFAULT_PATTERNS }); 
});


document.getElementById("button").addEventListener("click", () => {
    console.log("Button clicked!");
    const text = document.getElementById("sites").value;
    chrome.storage.sync.set({ patterns: text }); // save the pattern for next time
    console.log("text =",text)
    const patterns = text.split("\n").map(s => s.trim());
    patterns.forEach((p, i) => console.log(`patterns[${i}]: |${p}|`));
    chrome.tabs.query({ url: patterns }, (tabs) => {
        tabs.forEach((t, i) => console.log(`matching tabs[${i}]: `,t.url));
        const tabIDs = tabs.map(t => t.id);
        console.log("Removing these tabIDs: ",tabIDs)
        chrome.tabs.remove(tabIDs)
        document.getElementById("status").textContent = `Destroyed ${tabs.length} tabs`;
    });

});

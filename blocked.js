const params = new URLSearchParams(window.location.search);
// storing the query string in params
const blockedUrl = params.get("url");
// extracting the value of url pair and storing it in blockedUrl
const urlElement = document.getElementById("blocked-url");
// get element of id
urlElement.textContent = blockedUrl;
// passing the blockedurl to it

document.getElementById("btn-back").addEventListener("click", function() {
    history.back();
});

document.getElementById("btn-proceed").addEventListener("click", function() {
    window.location.href = blockedUrl;
// take user to the blocked url
});

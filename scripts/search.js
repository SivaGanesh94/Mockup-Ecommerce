const search$ = document.getElementById("search");
search$.addEventListener("keyup", function(event) {
    const term = search$.value
    const termLowercase = term.toLowerCase();
    const productFiltered = productsModified.filter(function(product) {
        const titleLowerCased = product.title.toLowerCase();
        return titleLowerCased.indexOf(termLowercase)  != -1;
    });
    renderProductCards(productFiltered)
})
document.addEventListener("DOMContentLoaded", function () {
    var table = document.querySelector(".table1");
    var tbody = table.querySelector("tbody");
    var rows = Array.from(tbody.querySelectorAll("tr"));
    var headers = table.querySelectorAll("th.sortable-header");
    var sortOrders = Array.from(headers).map(function () {
        return -1;
    });

    // Ajoutez un gestionnaire de clic aux en-têtes de colonnes
    headers.forEach(function (header, index) {
        header.addEventListener("click", function () {
            // Inversez l'ordre de tri pour cette colonne
            sortOrders[index] *= -1;

            // Inversez l'icône de tri pour cette colonne
            var icon = header.querySelector("i");
            if (sortOrders[index] === 1) {
                icon.classList.remove("fa-arrow-up-z-a");
                icon.classList.add("fa-arrow-down-z-a");
            } else {
                icon.classList.remove("fa-arrow-down-z-a");
                icon.classList.add("fa-arrow-up-z-a");
            }

            // Triez les lignes en fonction de la colonne et de l'ordre de tri
            rows.sort(function (a, b) {
                var cellA = a.querySelectorAll("td")[index].textContent.trim();
                var cellB = b.querySelectorAll("td")[index].textContent.trim();
                return sortOrders[index] * cellA.localeCompare(cellB);
            });

            // Supprimez toutes les lignes du tbody
            rows.forEach(function (row) {
                tbody.removeChild(row);
            });

            // Ajoutez les lignes triées au tbody
            rows.forEach(function (row) {
                tbody.appendChild(row);
            });
        });
    });

    // inputrech
    var searchInput = document.getElementById("search");

    searchInput.addEventListener("input", function () {
        var searchText = searchInput.value.toLowerCase().trim();

        // Filtrez les lignes en fonction du texte de recherche
        rows.forEach(function (row) {
            var cells = row.querySelectorAll("td");
            var found = false;
            for (var i = 0; i < cells.length; i++) {
                var cellText = cells[i].textContent.toLowerCase().trim();
                if (cellText.includes(searchText)) {
                    found = true;
                    break;
                }
            }
            row.style.display = found ? "table-row" : "none";
        });
    });
});


var ptitprofImg = document.getElementById('ptitprof');
// Récupérez l'URL de l'image depuis le localStorage
var savedAvatarURL = localStorage.getItem('avatarURL');
// Vérifiez si une image est déjà stockée
if (!savedAvatarURL) {
    // Si l'URL n'existe pas dans le localStorage, utilisez l'URL par défaut
    savedAvatarURL = '/images/prof.jpeg';
}
ptitprofImg.src = savedAvatarURL;
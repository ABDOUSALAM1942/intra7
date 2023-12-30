// Attendez que le document HTML soit entièrement chargé avant d'exécuter le script
document.addEventListener("DOMContentLoaded", function () {
    var table = document.querySelector(".table1");
    var tbody = table.querySelector("tbody");

    // Créez un tableau à partir des lignes de tbody
    // Array.from(...): convertit la NodeList en un tableau réel
    var rows = Array.from(tbody.querySelectorAll("tr"));
    var headers = table.querySelectorAll("th.sortable-header");
    // Initialisez un tableau d'ordres de tri pour chaque colonne
    var sortOrders = Array.from(headers).map(function () {
        return -1;
    });
    // la variable sortOrders est un tableau.
    // chaque élément de ce tableau est initialisé à -1.

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
                // Sélectionnez le contenu textuel des cellules de la colonne spécifiée
                var cellA = a.querySelectorAll("td")[index].textContent.trim();
                var cellB = b.querySelectorAll("td")[index].textContent.trim();
                // Utilisez localeCompare pour comparer les chaînes de caractères de manière alphabétique
                // et multipliez par sortOrders[index] pour prendre en compte l'ordre de tri (ascendant ou descendant)
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

    // Gestionnaire d'événement pour la recherche
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
            // Affichez ou masquez la ligne en fonction du résultat de la recherche
            row.style.display = found ? "table-row" : "none";
        });
    });
    const factures = [
        { Facture: 10, Laboratoire: 'Enval', Date: '29/12/2023' },
        { Facture: 10, Laboratoire: 'Enval', Date: '29/12/2023' },
        // Ajoutez d'autres factures au besoin
    ];

    // Ajoutez les lignes depuis le tableau JSON
    ajouterLignesDepuisJSON(factures);
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

function ajouterLigneAuTableau(facture) {
    var table = document.querySelector(".table1");
    var tbody = table.querySelector("tbody");

    // Créez une nouvelle ligne
    var newRow = document.createElement('tr');

    // Ajoutez les cellules avec les données de la facture
    Object.values(facture).forEach(function (valeur) {
        var cellule = document.createElement('td');
        cellule.textContent = valeur;
        newRow.appendChild(cellule);
    });

    // Ajoutez un bouton "Voir"
    var celluleVoir = document.createElement('td');
    var voirButton = document.createElement('button');
    voirButton.innerHTML = '<b>Voir</b>';
    voirButton.addEventListener('click', function() {
        // Ajoutez ici le code à exécuter lorsqu'on clique sur le bouton "Voir"
        // Vous pouvez ouvrir une modal, afficher plus d'informations, etc.
        alert('Voir la facture : ' + facture.Facture);
    });
    celluleVoir.appendChild(voirButton);
    newRow.appendChild(celluleVoir);

    // Ajoutez la nouvelle ligne au tableau
    tbody.appendChild(newRow);
}

function ajouterLignesDepuisJSON(facturesJSON) {
    facturesJSON.forEach(function (facture) {
        ajouterLigneAuTableau(facture);
    });
}

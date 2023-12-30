document.addEventListener("DOMContentLoaded", function () {
    var table = document.querySelector(".table2");
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
                // if (index === 2 || index === 3) { // Colonne "Date" ou "Statut"
                //     cellA = new Date(cellA);
                //     cellB = new Date(cellB);
                // }
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
    const commandes = [
        { Commande: '0010', Laboratoire: 'Enval', Date: '10/03/2023', Statut: 'En cours' },
        // Ajoutez d'autres commandes au besoin
    ];
    ajouterLignesCommandeDepuisJSON(commandes);
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

function ajouterLigneCommandeAuTableau(commande) {
    var table = document.querySelector(".table2");
    var tbody = table.querySelector("tbody");

    // Créez une nouvelle ligne
    var newRow = document.createElement('tr');

    // Ajoutez les cellules avec les données de la commande
    Object.values(commande).forEach(function (valeur) {
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
        alert('Voir la commande : ' + commande.Commande);
    });
    celluleVoir.appendChild(voirButton);
    newRow.appendChild(celluleVoir);

    // Ajoutez la nouvelle ligne au tableau
    tbody.appendChild(newRow);
}

function ajouterLignesCommandeDepuisJSON(commandesJSON) {
    commandesJSON.forEach(function (commande) {
        ajouterLigneCommandeAuTableau(commande);
    });
}

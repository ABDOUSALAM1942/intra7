document.addEventListener("DOMContentLoaded", function () {
    // Fonction de tri
    function sortTable(index) {
        // Inversez l'ordre de tri pour cette colonne
        sortOrders[index] *= -1;

        // Inversez l'icône de tri pour cette colonne
        var icon = headers[index].querySelector("i");
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
    }

    // Fonction de recherche
    function searchTable() {
        var searchText = searchInput.value.toLowerCase().trim();

        // Filtrez les lignes en fonction du texte de recherche
        rows.forEach(function (row) {
            var cells = Array.from(row.querySelectorAll("td"));
            var rowContainsText = cells.some(function (cell) {
                return cell.textContent.toLowerCase().includes(searchText);
            });
            row.style.display = rowContainsText ? "" : "none";
        });
    }

    // Récupérez la table par sa classe
    var table = document.querySelector(".table3");

    // Récupérez les en-têtes de colonnes avec la classe "sortable-header"
    var headers = table.querySelectorAll("thead th.sortable-header");
    var tbody = table.querySelector("tbody");

    // Convertissez les lignes de tbody en un tableau
    // Array.from(...): Cela convertit la NodeList en un tableau réel
    var rows = Array.from(tbody.querySelectorAll("tr"));

    // Initialisez un tableau pour suivre l'ordre de tri de chaque colonne
    var sortOrders = Array.from(headers).map(function () {
        return 1; // 1 pour trier en ordre croissant par défaut
    });

    // Récupérez l'élément input de recherche
    var searchInput = document.getElementById("search");

    // Ajoutez un gestionnaire d'événement input pour la recherche
    searchInput.addEventListener("input", searchTable);

    // Ajoutez un gestionnaire de clic aux en-têtes de colonnes (pour le tri)
    headers.forEach(function (header, index) {
        header.addEventListener("click", function () {
            sortTable(index);
        });
    });

    const suivis = [
        { Lot: 'TE2023030', État: 'Réçu', 'Date prévue': '12/03/2023', Rapport: 'Disponible' },
        // Ajoutez d'autres suivis au besoin
    ];

    // Ajoutez les lignes depuis le tableau JSON
    ajouterLignesSuiviDepuisJSON(suivis);
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



function ajouterLigneSuiviAuTableau(suivi) {
    var table = document.querySelector(".table3");
    var tbody = table.querySelector("tbody");

    // Créez une nouvelle ligne
    var newRow = document.createElement('tr');

    // Ajoutez les cellules avec les données du suivi
    Object.values(suivi).forEach(function (valeur) {
        var cellule = document.createElement('td');
        cellule.textContent = valeur;
        newRow.appendChild(cellule);
    });

    // Ajoutez un bouton "Voir"
    var celluleVoir = document.createElement('td');
    var voirButton = document.createElement('button');
    voirButton.innerHTML = '<b>Voir</b>';
    voirButton.addEventListener('click', function() {
        window.location.href = "suividetaille.html";        // Vous pouvez ouvrir une modal, afficher plus d'informations, etc.
    });
    celluleVoir.appendChild(voirButton);
    newRow.appendChild(celluleVoir);

    // Ajoutez la nouvelle ligne au tableau
    tbody.appendChild(newRow);
}
function ajouterLignesSuiviDepuisJSON(suivisJSON) {
    suivisJSON.forEach(function (suivi) {
        ajouterLigneSuiviAuTableau(suivi);
    });
}

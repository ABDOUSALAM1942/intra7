// Tableau de faux utilisateurs avec des informations simulées
const users = [
    { email: "yatagan1942@gmail.com", password: "aaaa" },
    { email: "yatagan2523@yahoo.com", password: "bbbb" },
    { email: "yatagan1234@dotnet.com", password: "cccc" },
];
// Compteur d'échecs de connexion
let loginAttempts = 0;

function login(event) {
    event.preventDefault();
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("pass");
    const errorMessage = document.getElementById("erreur");

    const enteredEmail = emailInput.value;
    const enteredPassword = passwordInput.value;

    const user = users.find((u) => u.email === enteredEmail && u.password === enteredPassword);

    if (user) {
        // Réinitialiser le compteur d'échecs de connexion en cas de succès
        loginAttempts = 0;
        localStorage.removeItem('loginAttempts');

        // Connexion réussie, stocker les informations de l'utilisateur dans le localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = "Dashboard.html"; // Redirection vers le tableau de bord
    } else {
        loginAttempts++;

        if (loginAttempts >= 3) {
            // Si l'utilisateur a échoué 3 fois, afficher la fenêtre modale
            afficherModal();
        }

        errorMessage.textContent = "E-mail ou mot de passe incorrect. Veuillez réessayer.";

        // Stocker le nombre d'échecs de connexion dans le localStorage
        localStorage.setItem('loginAttempts', loginAttempts);
    }
}

// Écouteur d'événements pour le bouton de connexion
const loginButton = document.querySelector(".btnL");
loginButton.addEventListener("click", login);

// Charger les utilisateurs depuis le localStorage lors du chargement de la page
document.addEventListener("DOMContentLoaded", () => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
        const user = JSON.parse(storedUser);
        // Vous pouvez utiliser les informations de l'utilisateur ici
    }
});

// Fonction pour afficher la fenêtre modale
function afficherModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';

    // Compteur de temps (3 minutes)
    const dureeBlocageMinutes = 0.1;
    let tempsRestant = dureeBlocageMinutes * 60; // Convertir en secondes

    const countdown = document.getElementById('countdown');

    function miseAjourCompteur() {
        const minutes = Math.floor(tempsRestant / 60);
        const secondes = tempsRestant % 60;

        countdown.innerHTML = minutes + 'm ' + secondes + 's';

        if (tempsRestant <= 0) {
            modal.style.display = 'none'; // Fermer la fenêtre modale une fois le délai écoulé
        } else {
            tempsRestant--;
            localStorage.setItem('tempsRestant', tempsRestant); // Enregistrer le temps restant dans le localStorage
            setTimeout(miseAjourCompteur, 1000); // Mettre à jour le compteur chaque seconde
        }
    }

    miseAjourCompteur();
}

document.addEventListener("DOMContentLoaded", function() {
    // Récupérer le temps restant depuis le localStorage
    const tempsRestant = parseInt(localStorage.getItem('tempsRestant'));

    if (tempsRestant && tempsRestant > 0) {
        // Si le temps restant est stocké et est supérieur à zéro, afficher la fenêtre modale
        afficherModal();
    }
});
// // Fonction pour afficher la fenêtre modale
// function afficherModal() {
//     var modal = document.getElementById('myModal');
//     modal.style.display = 'block';

//     // Compteur de temps (3 minutes)
//     var dureeBlocageMinutes = 3;
//     var tempsRestant = dureeBlocageMinutes * 60; // Convertir en secondes

//     var countdown = document.getElementById('countdown');

//     function miseAjourCompteur() {
//         var minutes = Math.floor(tempsRestant / 60);
//         var secondes = tempsRestant % 60;

//         countdown.innerHTML = minutes + 'm ' + secondes + 's';

//         if (tempsRestant <= 0) {
//             modal.style.display = 'none'; // Fermer la fenêtre modale une fois le délai écoulé
//         } else {
//             tempsRestant--;
//             localStorage.setItem('tempsRestant', tempsRestant); // Enregistrer le temps restant dans le localStorage
//             setTimeout(miseAjourCompteur, 1000); // Mettre à jour le compteur chaque seconde
//         }
//     }

//     miseAjourCompteur();
// }

// document.addEventListener("DOMContentLoaded", function() {
//     // Récupérer le temps restant depuis le localStorage
//     var tempsRestant = parseInt(localStorage.getItem('tempsRestant'));

//     if (tempsRestant && tempsRestant > 0) {
//         // Si le temps restant est stocké et est supérieur à zéro, afficher la fenêtre modale
//         afficherModal();
//     }
// });

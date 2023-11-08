// Récupérer les éléments HTML dont vous voulez stocker les données
var nomInput = document.getElementById('nomprof');
var emailInput = document.getElementById('email');
var bioTextarea = document.getElementById('bio');

// Écouter un événement, par exemple, un clic sur un bouton pour sauvegarder les données
var boutonEnregistrer = document.getElementById('enregistrer');
boutonEnregistrer.addEventListener('click', function() {
    // Récupérer les valeurs des inputs
    var nom = nomInput.value;
    var email = emailInput.value;
    var bio = bioTextarea.value;

    // Stocker les données dans le local storage
    localStorage.setItem('nom', nom);
    localStorage.setItem('email', email);
    localStorage.setItem('bio', bio);
});

// Charger les données depuis le local storage lorsque la page se charge
window.addEventListener('load', function() {
    var nom = localStorage.getItem('nom');
    var email = localStorage.getItem('email');
    var bio = localStorage.getItem('bio');

    // Remplir les champs avec les données du local storage
    nomInput.value = nom;
    emailInput.value = email;
    bioTextarea.value = bio;
});

// modifier

// Récupérez l'élément du champ d'entrée de fichier
var photoInput = document.getElementById('photoInput');

// Récupérez le bouton "Modifier la photo"
var modifierPhotoButton = document.querySelector('.mph');

// Récupérez l'élément img d'ID "imgavat" et l'élément img d'ID "ptitprof"
var imgAvatar = document.querySelector('.imgavat');
var ptitprofImg = document.getElementById('ptitprof');

// Récupérez l'URL de l'image depuis le localStorage
var savedAvatarURL = localStorage.getItem('avatarURL');

// Vérifiez si une image est déjà stockée
if (!savedAvatarURL) {
    // Si l'URL n'existe pas dans le localStorage, utilisez l'URL par défaut
    savedAvatarURL = '/images/prof.jpeg';
}
// Affichez l'image dans les éléments "ptitprof" et "imgavat"
ptitprofImg.src = savedAvatarURL;
imgAvatar.src = savedAvatarURL;

// Ajoutez un gestionnaire d'événement pour le clic sur le bouton "Modifier la photo"
modifierPhotoButton.addEventListener('click', function(e) {
    // Empêchez le comportement par défaut du lien
    e.preventDefault();

    // Simulez un clic sur le champ d'entrée de fichier lorsque le bouton est cliqué
    photoInput.click();
});
// Ajoutez un gestionnaire d'événement pour le changement de fichier
photoInput.addEventListener('change', function() {
    var selectedFile = photoInput.files[0];

    // Vérifiez si un fichier a été sélectionné
    if (selectedFile) {
        // Créez un objet URL pour afficher l'image sélectionnée
        var objectURL = URL.createObjectURL(selectedFile);

        // Affichez l'image dans les éléments "ptitprof" et "imgavat"
        ptitprofImg.src = objectURL;
        imgAvatar.src = objectURL;

        // Enregistrez l'URL de la nouvelle image dans le localStorage
        localStorage.setItem('avatarURL', objectURL);
    }
});

const suppBtn = document.querySelector('.supph');
suppBtn.addEventListener('click', () => {
    // Supprimer l'URL de l'avatar du localStorage
    localStorage.removeItem('avatarURL');
    ptitprofImg.src = ''; // 
    imgAvatar.src = ''; //
});

var modifierMotDePasseButton = document.querySelector('.mmdp');
var modalMotDePasse = document.getElementById('modal');
var closeMotDePasseButton = document.getElementById('close-modal');

// Ajoutez un gestionnaire d'événements pour ouvrir la fenêtre modale
modifierMotDePasseButton.addEventListener('click', function() {
    modalMotDePasse.style.display = 'block';
});

// Ajoutez un gestionnaire d'événements pour fermer la fenêtre modale
closeMotDePasseButton.addEventListener('click', function() {
    modalMotDePasse.style.display = 'none';
});

// Récupérez les éléments HTML pour la modification du mot de passe
var ancienMotDePasseInput = document.getElementById('ancienMotDePasse');
var nouveauMotDePasseInput = document.getElementById('nouveauMotDePasse');
var modifierMotDePasseButton = document.getElementById('modifierMotDePasse');

// Ajoutez un gestionnaire d'événements pour le bouton de modification du mot de passe
modifierMotDePasseButton.addEventListener('click', function() {
    // Récupérez les valeurs des champs de saisie
    var ancienMotDePasse = ancienMotDePasseInput.value;
    var nouveauMotDePasse = nouveauMotDePasseInput.value;

    // Récupérez l'utilisateur actuellement connecté
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        var storedPassword = localStorage.getItem('currentUserPassword'); // Récupérez le nouveau mot de passe du localStorage

        // Vérifiez si le nouveau mot de passe est stocké dans le localStorage
        var passwordToCheck = storedPassword ? storedPassword : currentUser.password;

        if (ancienMotDePasse === passwordToCheck) {
            // Mettez à jour le mot de passe de l'utilisateur
            currentUser.password = nouveauMotDePasse;

            // Stockez les modifications dans le localStorage
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            localStorage.setItem('currentUserPassword', nouveauMotDePasse);

            // Affichez un message de succès
            alert("Le mot de passe a été modifié avec succès.");

            // Réinitialisez les champs de saisie
            ancienMotDePasseInput.value = "";
            nouveauMotDePasseInput.value = "";

            // Fermez la fenêtre modale
            modalMotDePasse.style.display = 'none';
        } else {
            alert("L'ancien mot de passe est incorrect. Veuillez réessayer.");
        }
    } else {
        alert("Aucun utilisateur n'est actuellement connecté.");
    }
});

// Fonction pour déconnecter l'utilisateur
function deconnecterUtilisateur() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserPassword'); // Supprimer les données de l'utilisateur
    window.location.href = 'index.html';
}

// Ajoutez un gestionnaire d'événements pour le bouton de déconnexion
var deconnexionButton = document.getElementById('deconnexionButton');
deconnexionButton.addEventListener('click', function() {
    deconnecterUtilisateur();
});



// // Sélectionnez le bouton "Modifier le mot de passe" à l'intérieur de la section "Modifier le profil"
// var boutonModifierMotDePasse = document.querySelector('.mmdp');
// var modal = document.getElementById('modal');
// var closeModalButton = document.getElementById('close-modal');
// var ancienMotDePasseInput = document.getElementById('ancienMotDePasse');
// var nouveauMotDePasseInput = document.getElementById('nouveauMotDePasse');
// var boutonModifierMotDePasseModal = document.getElementById('modifierMotDePasse');

// // Ajoutez un gestionnaire d'événements au bouton "Modifier le mot de passe"
// boutonModifierMotDePasse.addEventListener('click', function() {
//     // Affichez la fenêtre modale
//     modal.style.display = 'block';
// });

// // Ajoutez un gestionnaire d'événements au bouton de fermeture de la fenêtre modale
// closeModalButton.addEventListener('click', function() {
//     // Fermez la fenêtre modale
//     modal.style.display = 'none';
// });


// boutonModifierMotDePasseModal.addEventListener('click', function(event) {
//     // Récupérez le mot de passe stocké dans le localStorage
// var motDePasseStocke = localStorage.getItem('motDePasseParDefaut');
//   event.preventDefault(); // Empêche la soumission du formulaire par défaut
//   // Récupérez l'ancien mot de passe saisi par l'utilisateur
//   var ancienMotDePasse = ancienMotDePasseInput.value;
//   // Vérifiez si l'ancien mot de passe saisi correspond au mot de passe stocké
//   if (ancienMotDePasse === motDePasseStocke) {
//       // Le mot de passe est correct, vous pouvez maintenant procéder à la modification
//       // Récupérez le nouveau mot de passe saisi par l'utilisateur
//       var nouveauMotDePasse = nouveauMotDePasseInput.value;
//       // Vérifiez si le nouveau mot de passe est valide
//       if (nouveauMotDePasse !== null && nouveauMotDePasse !== "") {
//           // Stockez le nouveau mot de passe dans le localStorage
//           localStorage.setItem('motDePasseParDefaut', nouveauMotDePasse);
//           alert("Le mot de passe a été modifié avec succès !");
//           // Fermez la fenêtre modale
//           modal.style.display = 'none';
//       }
//   } else {
//       alert("L'ancien mot de passe est incorrect. Veuillez réessayer.");
//   }
// });




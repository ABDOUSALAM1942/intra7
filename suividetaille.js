var ptitprofImg = document.getElementById('ptitprof');
// Récupérez l'URL de l'image depuis le localStorage
var savedAvatarURL = localStorage.getItem('avatarURL');
// Vérifiez si une image est déjà stockée
if (!savedAvatarURL) {
    // Si l'URL n'existe pas dans le localStorage, utilisez l'URL par défaut
    savedAvatarURL = '/images/prof.jpeg';
}
ptitprofImg.src = savedAvatarURL;


// Récupérez le paramètre "titre" de l'URL
var urlParams = new URLSearchParams(window.location.search);
var titre = urlParams.get('titre');

// Utilisez le titre dans votre page "suividetaille.html"
var titreElement = document.querySelector('.psuivdet');
if (titreElement) {
    titreElement.innerText = "Rapport : " + titre;
}


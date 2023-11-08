var ptitprofImg = document.getElementById('ptitprof');
// Récupérez l'URL de l'image depuis le localStorage
var savedAvatarURL = localStorage.getItem('avatarURL');
// Vérifiez si une image est déjà stockée
if (!savedAvatarURL) {
    // Si l'URL n'existe pas dans le localStorage, utilisez l'URL par défaut
    savedAvatarURL = '/images/prof.jpeg';
}
ptitprofImg.src = savedAvatarURL;
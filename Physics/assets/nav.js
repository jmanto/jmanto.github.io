// Ce fichier doit être chargé par toutes les pages du site.
// Il fait deux choses :
//   1. Il charge le fragment header.html et l'insère dans <div id="site-header">
//   2. Il gère l'ouverture/fermeture des menus déroulants du bandeau

document.addEventListener('DOMContentLoaded', function(){

  var slot = document.getElementById('site-header');
  if(!slot){
    console.warn('Aucun élément #site-header trouvé sur cette page : le bandeau ne peut pas être inséré.');
    return;
  }

  fetch('assets/header.html')
    .then(function(response){
      if(!response.ok){
        throw new Error('Impossible de charger header.html (statut ' + response.status + ')');
      }
      return response.text();
    })
    .then(function(html){
      slot.outerHTML = html; // remplace <div id="site-header"> par le contenu du bandeau
    })
    .catch(function(err){
      console.error('Erreur lors du chargement du bandeau :', err);
    });

});

// Gestion des menus déroulants par délégation d'événements sur "document" :
// nécessaire car le bandeau est inséré après coup, donc les boutons
// .menu-toggle n'existent pas encore au moment où ce script s'exécute.

function closeAllMenus(){
  document.querySelectorAll('.nav-menus > li.open').forEach(function(item){
    item.classList.remove('open');
    item.querySelector('.menu-toggle').setAttribute('aria-expanded', 'false');
  });
}

document.addEventListener('click', function(e){
  var toggle = e.target.closest('.menu-toggle');

  if(toggle){
    e.stopPropagation();
    var li = toggle.closest('li');
    var isOpen = li.classList.contains('open');

    closeAllMenus();

    if(!isOpen){
      li.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
    }
  } else {
    closeAllMenus();
  }
});

document.addEventListener('keydown', function(e){
  if(e.key === 'Escape'){
    closeAllMenus();
  }
});

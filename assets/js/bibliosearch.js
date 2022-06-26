$(document).ready(function(){

    $('#txt-search').keyup(function(){
        var searchField = $(this).val();
        if(searchField === '')  {
          $('#filter-records').html('');
          return;
        }

        var regex = new RegExp(searchField, "i");
        var output = '';
        var count = 1;

        $.each(books, function(key, val){
          if ((val.Titre.search(regex) != -1) || (val.Auteurs.search(regex) != -1)) {

          if (val.Format == "Néant") {
            var format = " non disponible";
          } else if (val.Format == "Aucun") {
            var format = " non disponible";
          } else {
            var format = " format " + val.Format;
          }

          output += '<div class="col-lg-4 col-md-6 icon-box" data-aos="fade-up" data-aos-delay="100">';
          output += '<div class="icon"><i class="bx bx-book-reader"></i></div>';
          output += '<p class="description">' + val.Auteurs + '</p>';
          output += '<h4 class="title">' + val.Titre + '</h4>';

          output += '<p class="description">Publié en ' + val.Publication + ', ' + val.Pages + ' pages, ' + format + '</p>'
          output += '</div>';

          count++;
          }
        });
        
        if(count == 1){
          output += '<div class="col-lg-4 col-md-6 icon-box" data-aos="fade-up">';
          output += '<div class="icon"><i class="bi bi-exclamation-circle"></i></div>';
          output += '<h4 class="title">Aucun livre trouvé</h4>';
          output += '<p class="description">Essayer encore</p>'
          output += '</div>';
        }

        $('#filter-records').html(output);
    });
});
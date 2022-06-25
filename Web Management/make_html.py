def use_template(place, filter, titre, num):
    return f"""
        <div class="col-lg-4 col-md-6 portfolio-item filter-{filter}">
            <div class="portfolio-wrap">
              <img src="../assets/img/France2021/crop-{place}{num}.jpg" class="img-fluid" alt="">
              <div class="portfolio-info">
                <h4>{titre}</h4>
                <div class="portfolio-links">
                  <a href="../assets/img/France2021/{place}{num}.jpg" data-gallery="portfolioGallery" class="portfolio-lightbox" title="{titre}"><i class="bx bx-plus"></i></a>
                  <a href="portfolio-details.html" title="More Details"><i class="bx bx-link"></i></a>
                </div>
              </div>
            </div>
          </div>
          """

places = {"Arc": {"titre": "Arc de Triomphe", "filtre": "Paris", "nombre": 3},
          "Auray": {"titre": "Auray", "filtre": "Auray", "nombre": 3},
          "BelleIle": {"titre": "Belle-Île-en-Mer", "filtre": "BelleIle", "nombre": 22},
          "Carnac": {"titre": "Carnac, site de Menec", "filtre": "Carnac", "nombre": 15},
          "Chartres": {"titre": "Cathédrale de Chartres", "filtre": "Chartres", "nombre": 12},
          "Cite": {"titre": "Autour de l'Île de la Cité", "filtre": "Paris", "nombre": 6},
          "CoteSauvage": {"titre": "La Côte Sauvage", "filtre": "CoteSauvage", "nombre": 23},
          "Disneyland": {"titre": "Disneyland Paris", "filtre": "Paris", "nombre": 13},
          "LeMans": {"titre": "Le Mans", "filtre": "LeMans", "nombre": 2},
          "Louvres": {"titre": "Louvres", "filtre": "Paris", "nombre": 7},
          "Nantes": {"titre": "Nantes", "filtre": "Nantes", "nombre": 30},
          "PortLouis": {"titre": "Port-Louis", "filtre": "PortLouis", "nombre": 5},
          "Quiberon": {"titre": "Quibéron", "filtre": "Quiberon", "nombre": 31},
          "Rennes": {"titre": "Rennes", "filtre": "Rennes", "nombre": 3},
          "TourEiffel": {"titre": "Tour Eiffel", "filtre": "Paris", "nombre": 21},
          "Versailles": {"titre": "Château de Versailles", "filtre": "Versailles", "nombre": 20}}         

with open("drop.txt", mode="w", encoding='utf-8') as f:
    for place in places:
        info = places[place]
        titre = info["titre"]
        filtre = info["filtre"]
        nombre = info["nombre"]

        for j in range(nombre):
            i = j + 1
            if i<10:
                str_i = "00" + str(i)
            elif i<100:
                str_i = "0" + str(i)
            else:
                str_i = str(i)

            w_str = use_template(place, filtre, titre, str_i)

            f.write(w_str)
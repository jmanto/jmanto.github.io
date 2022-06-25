import pandas as pd

biblio = False
d3_map = True
sunburst = True

# Information générale, fichier dedonnée de la bibliothèque
in_file = "C:/Users/jeanm/Documents/Bibliothèque.xlsx"

biblio_file = "C:/Users/jeanm/PythonProjects/Personal-Page/assets/data/biblio/biblio.js"
sheetname_books = "Livres"

# Information pour la carte du monde "nombre d'auteurs par pays"
map_file_01 = "C:/Users/jeanm/PythonProjects/Personal-Page/assets/dataviz/chart_book_01.csv"
map_file_02 = "C:/Users/jeanm/PythonProjects/Personal-Page/assets/dataviz/chart_book_02.csv"
map_file_03 = "C:/Users/jeanm/PythonProjects/Personal-Page/assets/dataviz/chart_book_03.csv"
map_file_04 = "C:/Users/jeanm/PythonProjects/Personal-Page/d3/sunburst/bible_structure.json"

sheetname_author = "Auteurs"
sheetname_map = "Pays"

# Lecteur de le feuille contenant les informations sur les livres
df = pd.read_excel(in_file, sheet_name=sheetname_books)
df.fillna(0, inplace=True)

shape_before = df.shape
dg = df.dropna(axis=0, how="any")
shape_after = dg.shape

print(f"Taille de la base importée: {shape_before}")
print(f"Taille de la base nettoyée: {shape_after}\n")

print("Si les valeurs ne correspondent pas, vérifier si des cellules sont vides.\n")
print("Si la recherche ne fonctionne pas dans le site Web, vérifier si des valeurs du titre ou de l'auteur")
print("sont -null- ou interprétées comme des valeurs numériques.")
print("Dans ce cas, ajouter un caractère (p.ex. '1984' transformé en '1984-')")

dg = dg.astype({'Publication': 'int32', 'Pages': 'int32'})

# Utile pour tester par test de bisection où est le problème
# id = 2000
# dg = dg.iloc[:id]
# print(dg.iloc[id - 2:id + 3])

if biblio: # Ecriture du fichier des données de la bibliothèque
    output = "var books = " + dg.to_json(orient="records")

    with open(file=biblio_file, mode="w") as f:
        f.write(output)

if d3_map:
    df_map = pd.read_excel(in_file, sheet_name=sheetname_map)
    df_author = pd.read_excel(in_file, sheet_name=sheetname_author)

    # Ajout d'informations sur le pays de l'auteur (continent, version anglaise, code)
    df_author_all = df_author.merge(df_map, on="Pays")

    # Correspondance entre l'auteur (uniquement le premier mentionné) et le pays
    df["Auteur 1"]=df["Auteurs"].apply(lambda text: text.split(" & ")[0])

    df_all = df.merge(df_author_all, left_on="Auteur 1", right_on="Auteur")
    df_all.to_csv(path_or_buf=map_file_01, index=False)

    # Nombre de livres par pays
    df_summary1 = df_all.groupby(['Code']).count().reset_index()

    df_summary1a = pd.merge(df_map, df_summary1.loc[:, "Code":"Status"], on="Code")
    df_summary1a.to_csv(path_or_buf=map_file_02, index=False)

    # Nombre d'auteurs par pays
    df_summary2 = df_author_all.groupby(['Code']).count().reset_index()
    df_summary2a = pd.merge(df_map, df_summary2.loc[:, "Code":"Etat"], on="Code")
    df_summary2a.to_csv(path_or_buf=map_file_03, index=False)

if sunburst:
    world = [{"idx": "Monde",  "name": "Monde", "size": 0, "parent": ""},
             {"idx": "Europe",  "name": "Europe", "size": 0, "parent": "Monde"},
             {"idx": "Asie",  "name": "Asie", "size": 0, "parent": "Monde"},
             {"idx": "Afrique",  "name": "Afrique", "size": 0, "parent": "Monde"},
             {"idx": "Amérique",  "name": "Amérique", "size": 0, "parent": "Monde"}]

    for index, row in df_summary2a.iterrows():
        country = dict()
        country["idx"] = row["Pays"]
        country["name"] = row["Pays"]
        country["size"] = row["Etat"]
        country["parent"] = row["Continent"]

        world.append(country)

    print(world)

    df_country = pd.DataFrame(data={"idx": df_summary2a["Pays"], "name": df_summary2a["Pays"], "size": df_summary2a["Etat"], "parent": df_summary2a["Continent"]})

    continent = {"idx": ["Monde", "Europe", "Asie", "Afrique", "Amérique", "Océanie"],
                 "name": ["Monde", "Europe", "Asie", "Afrique", "Amérique", "Océanie"],
                 "size": [0, 0, 0, 0, 0, 0],
                 "parent": ["", "Monde", "Monde", "Monde", "Monde", "Monde"]}
    df_continent = pd.DataFrame(data=continent)

    df_continent = df_continent.append(df_country)
    df_continent.to_json(path_or_buf=map_file_04, orient="records")

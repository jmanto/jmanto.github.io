from ftplib import FTP

import sys

import pandas as pd

from PyQt5 import QtWidgets, uic

save_host = "e37us.ftp.infomaniak.com" # adresse du serveur FTP
save_user = "e37us_jmanto" # votre identifiant
save_password = "Jerminal4548@imftp" # votre mot de passe


class MainWindow(QtWidgets.QMainWindow):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        uic.loadUi("Books.ui", self)

        self.lineEdit.setText(save_host)
        self.lineEdit_2.setText(save_user)
        self.lineEdit_3.setText(save_password)

        self.pushButton.clicked.connect(self.convert_biblio)
        self.pushButton_2.clicked.connect(self.send_via_ftp)


    def convert_biblio(self):
        in_file = "C:/Users/jeanm/Documents/Bibliothèque.xlsx"
        #out_file = "C:/Users/jeanm/WebSiteProjects/Site Web/assets/data/biblio/biblio.js"
        out_file = "C:/Users/jeanm/PycharmProjects/Web Management/biblio.js"
        
        sheetname = "Livres"

        df = pd.read_excel(in_file, sheet_name=sheetname)
        df.fillna(0, inplace=True)

        shape_before = df.shape
        dg = df.dropna(axis=0, how="any")
        shape_after = dg.shape

        print(f"Taille de la base importée: {shape_before}")
        print(f"Taille de la base nettoyée: {shape_after}\n")

        print("Si les valeurs ne correspondent pas, vérifier si des cellules sont vides.\n")
        print("Si la recherche ne fonctionne pas dans le site Web, vérifier si des valeurs du titre ou de l'auteur")
        print("sont -null- ou interprétées comme des valeurs numériques.")

        output = "var books = " + dg.to_json(orient="records")

        with open(file=out_file, mode="w") as f:
            f.write(output)


    def send_via_ftp(self):
        host = self.lineEdit.text()
        user = self.lineEdit_2.text()
        password = self.lineEdit_3.text()

        with FTP(host=host, user=user, passwd=password) as ftp:
            ftp.cwd("web")
            ftp.dir()

            fichier = "crop_image.py"
            path_file = "C:/Users/jeanm/PycharmProjects/Web Management/"

            file  = open(path_file + fichier, 'rb') 
            ftp.storbinary('STOR '+ fichier, file)
            file.close()


if __name__ == '__main__':
    from PyQt5.QtWidgets import QApplication
    
    if not QApplication.instance():
        app = QApplication(sys.argv)
    else:
        app = QApplication.instance() 

    window = MainWindow()
    window.show()

    app.exec_()

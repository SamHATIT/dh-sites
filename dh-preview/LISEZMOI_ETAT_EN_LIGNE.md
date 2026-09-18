# État en ligne au 17/09/2026

`dh-preview/index.html` = le bundle servi par https://digital-humans.fr/ depuis la bascule du 17/09.
Sur le VPS, `/var/www/dh-preview/index.html` est un **lien symbolique** vers `apercu-recent/index.html`.
Bascule et retour arrière = une seule commande :

    ln -sfn apercu-recent/index.html /var/www/dh-preview/index.html   # site
    ln -sfn index.html.entracte-20260917 /var/www/dh-preview/index.html  # retour Entracte

Contenu de ce commit : mentions légales + CGV avec clauses IA (art. 50), SIRET, TVA « en cours
d'attribution », Free = Nemotron hébergé en Europe, six SDS liées dans « The Work », robots.txt.
`sh-conseil/` et `deos.cloud/` : accueil + pages /legal et /privacy créées le 15/09.

# Une expérimentation de sobritété numérique : Shrink my video

## 8K & 5G vs Facteur 4

Aujourd'hui on parle de devoir réduire notre impact d'un facteur 4 (monde) ou 6 (France) pour atteindre un développement durable.
Le numérique participe à cet impact à hauteur d'environ 4%, une part non négligeable et supérieure à l'aviation.
On prédit que l'impact du numérique va augmenter à l'avenir avec l'augmentation des débit, résolutions, capacités de stockage, des puissances de calcul, etc. qui semble inarrêtable.

## Une approche plus sobre

Dans les recommendations du rapport "iNUM : impacts environnementaux du numérique en France" publié par le collectif GreenIT.fr en 2020 (https://www.greenit.fr/impacts-environnementaux-du-numerique-en-france/), on peut y trouver la recommandation suivante :

> ECOCONCEVOIR LES SERVICES NUMÉRIQUES pour réduire leurs besoins en
> ressources numériques et ainsi favoriser l’allongement de la durée de vie des
> appareils ainsi que leur réemploi.

Le point important ici est de favoriser l’allongement de la durée de vie des appareils.

Car comme le rappelle le collectif dans son rapport, la fabrication et l'utilisation des terminaux utilisateurs (PC, smartphones, etc.) jouent un rôle prépondérant dans la consommation d'énergie primaire, l'émission de GES, la consommation d'eau et la consommation de ressources abiotiques.

TODO Schema p10 du rapport (3.1)

On voit sur ce schéma que c'est la fabrication des terminaux qui représente la majorité des impacts, comparée à l'utilisation de ces terminaux.

Dit autrement, lorsque vous recevez un nouveau smartphone, la majorité des impacts ont déjà été faits avant même que vous ne l'allumiez.

## La vidéo en ligne

D'après TODO XXX, la vidéo en ligne représente TODO XX% du traffic mondial sur Internet.

The Shift Project en a fait le sujet d'un de ses rapports et a mis à disposition un guide pour diminuer la taille des vidéos afin de limiter leur impact.

Le guide, écrit par Gauthier Roussilhe, est lisible ici (TODO XXX).

Là encore, l'objectif n'est pas tant de limiter la consommation electrique des équipements servant à stocker, acheminer et lire cette vidéo, mais d'avantage de prolonger la durée de vie des équipements en limitant les ressources nécessaires pour récupérer la vidéo et la lire.

## Faciliter (encore plus) le changement

Le guide mentionné plus haut explique comment télécharger l'outil Handbrake et comment le configurer afin de diminuer la taille de nos vidéos tout en préservant une bonne qualité.

Les étapes sont claires et il ne faut pas plus de 5 minutes pour aller au bout de la procédure (comme l'indique le titre).

On peut cependant imaginer que l'idée de télécharger un logiciel et d'aller jouer avec des paramètres dont on ne comprend pas la signification ("constant framerate", "h264", "bitrate", etc.) en rebutera plus d'un.

C'est en découvrant le projet FFMPEG.WASM (https://ffmpegwasm.github.io/) que m'est venu l'idée de créer un convertisseur qui appliquerait les reglages préconisés dans le guide, et ce directement dans le navigateur.

FFMPEG.WASM est une version de l'outil multifonction FFMPEG (https://ffmpeg.org/) compilé en Web Assembly pour s'executer dans le navigateur.

Cet outil, baptisé "Shrink my video" est disponible à l'adresse suivante si vous désirez le tester : https://acailly.github.io/shrink-my-video/

Bonus : c'est une Progressive Web App (PWA), vous pourrez donc l'installer sur votre smartphone ou votre ordinateur (presque) comme si c'était une application native.

## Réduire encore

Il y a quelque années j'ai découvert la technique du dithering appliquée aux images, vous pouvez voir des exemples ici : https://ditherit.com/.

La technique consiste à réduire la palette de couleurs utilisées afin de réduire drastiquement la taille de l'image tout en préservant la lisibilité de son message.

Cette technique est utilisé sur plusieurs site "Low Tech" :

- le site du Low Tech Magazine (TODO XXX)
- le site de Gauthier Rousshile où l'on peut trouver son "Guide de conversion numérique au low tech" (TODO XXX)
- le site du Low Tech Lab (TODO XXX)
- TODO en trouver d'autres

Cette approche radicale m'a donné envie de chercher des approches similaires pour la vidéo.

Les plus évidentes consistent à diminuer un peu plus la qualité vidéo* (480p) et audio* (56 kbits/s)

En regardant le replay d'une conférence, l'idée m'est venu de réduire le nombre de frame par secondes (FPS) à une image toutes les 5 secondes\* !
Après tout, il est rare que les slides d'une conférence défilent plus vite.

Vous pouvez comparer le résultat entre une de mes conférences en format original (TODO ici) et après avoir appliqué la réduction de la qualité vidéo, de la qualité audio et du FPS (TODO ici)

Le résultat est sans équivoque, on passe d'une vidéo d'environ 70mo avec les reglages conseillé par The Shift Project, à une vidéo de 15mo !
Soit un facteur 4 ;-)

TODO Tester Black and white
TODO Préciser que les problèmes de lisibilité rencontrés après cette conversion sont probablement du au manque d'accessibilité des slides et sont donc des problèmes que rencontrent probablement déjà les personnes souffrant de daltonie (TODO XX% de la population)

## Conclusion

L'outil Shrink my video vise avant tout à faciliter l'application des recommandations de The Shift Project pour les personnes qui ne seraient pas à l'aise avec des outils comme Handbrake, même avec un guide.

C'est aussi un terrain d'expérimentation pour une approche plus radicale, plus Low-Tech ?, permettant d'aller beaucoup plus loin dans la réduction tout en préservant l'essentiel.

Les enjeux du numériques ne se limitent pas à réduire la taille de nos vidéos et je ne pouvais pas terminer cet article sans élargir le sujet et vous renvoyer vers le hors série Kaizen-Zenika sur le numérique responsable auquel j'ai participé.
Vous pouvez le trouvez ici : TODO XXX



# FFMPEG Lowtech

## Idée générale

Est ce qu'il serait envisageable de faire baisser le poids de certaines vidéos de manière plus ou moins automatique en dégradant certain facteurs qui ne sont pas essentiels à la compréhension ?

## Expérimentation 1 : diminuer les FPS

Test de reduction à 1 FPS : `ffmpeg -i Schneider.mp4 -filter:v fps=fps=1 Schneider-1fps.mp4`
(https://trac.ffmpeg.org/wiki/ChangingFrameRate)

Bilan : 
- reduction de taille de 95.7mo à 67.6mo
- ca reste largement compréhensible

Test de réduction à 1/5 FPS (1 image toutes les 5 secondes) : `ffmpeg -i Schneider.mp4 -filter:v fps=fps=1/5 Schneider-5seconds.mp4`
(https://erdeepakphp.wordpress.com/ffmpeg-examples/)

Bilan :
- réduction de taille de 95.7mo à 45.1mo
- c'est plutôt pas mal, ca reste encore compréhensible mais il y a des risques de louper des infos si quelque chose apparait et disparait en moins de 5 secondes

Test de réduction à 1/10 FPS (1 image toutes les 10 secondes) : `ffmpeg -i Schneider.mp4 -filter:v fps=fps=1/10 Schneider-10seconds.mp4`

Bilan :
- réduction de taille de 95.7mo à 40.8mo
- là ca devient compliqué parce que sur l'exemple il y a beaucoup de choses qui apparaissent et disparaissent en moins de 10 secondes

Test d'extraction d'audio (en gardant le codec original) : `ffmpeg -i Schneider.mp4 -vn -acodec copy Schneider-audio-original.aac`
(https://stackoverflow.com/a/27413824)

Bilan : 
- le fichier fait 35.5mo
- ca représente une grande part des 45.1mo pour 1 image par seconde



## Expérimentation 2 : diminuer la qualité audio

Test d'extraction audio avec réencodage haute qualité : `ffmpeg -i Schneider.mp4 -q:a 0 -map a Schneider-audio-highquality.mp3`
(https://stackoverflow.com/a/36324719)

Bilan : 
- le fichier fait 39.2mo
- on est plus lourd que l'original, peu d'intérêt

Test d'extraction audio avec réencodage qualité basse (56k) : `ffmpeg -i Schneider.mp4 -vn -c:a aac -b:a 56k Schneider-audio-lowquality.m4a`
(https://stackoverflow.com/a/35667963)

Bilan : 
- le fichier fait 15.7mo, on a divisé la taille par 2
- a l'écoute dans un casque ca passe

Test d'extraction audio avec réencodage qualité encore plus basse (24k) : `ffmpeg -i Schneider.mp4 -vn -c:a aac -b:a 24k Schneider-audio-lowestquality.m4a`
(https://stackoverflow.com/a/35667963)

Bilan : 
- le fichier fait 7mo
- même dans un casque c'est difficilement compréhensible


Test avec 1 image toutes les 5 secondes et audio qualité basse : `ffmpeg -i Schneider.mp4 -filter:v fps=fps=1/5 -c:a aac -b:a 56k Schneider-5seconds-audiolow.mp4`


Bilan : 
- le fichier fait 25.5mo, on est pas loin du divisé par 4
- et ben je trouve que c'est pas trop mal :-)

Même test sur une autre vidéo avec 1 image toutes les 5 secondes et audio qualité basse : `ffmpeg -i developper-avec-utilisateur-inria.mp4 -filter:v fps=fps=1/5 -c:a aac -b:a 56k developper-avec-utilisateur-inria-5seconds-audiolow.mp4`


Bilan : 

- le fichier fait 18.8mo au lieu de 86.1mo, un facteur 4.5 !
- et ben je trouve que c'est pas mal non plus :-)



## Expérimentation 3 : appliquer du dithering

Voir https://ditherit.com/ pour un exemple appliqué à des images



J'ai cherché un peu mais je n'ai pas trouvé de technique qui sorte une vidéo, tout ce que j'ai trouvé concernait la conversion d'une vidéo en GIF.

Il y a éventuellement ce snippet à tester, mais j'ai la flemme : [1-bit dithering a video](https://gist.github.com/lordastley/5127027)



## Expérimentation 4 : Réduire à 480p



Test avec 480p : `ffmpeg -i Schneider.mp4 -s hd480 Schneider-480p.mp4`

Bilan : 

- le fichier fait 63.3mo au lieu de 95.7mo, un tiers en moins
- la qualité est pas folle mais on va dire que ca passe (mais c'est limite)



Test avec 480p, 1 image toutes les 5 secondes et audio qualité basse : `ffmpeg -i Schneider.mp4 -s hd480 -filter:v fps=fps=1/5 -c:a aac -b:a 56k Schneider-480p-5seconds-audiolow.mp4`

Bilan : 

- le fichier fait 20.3mo au lieu de 95.7mo, on a pas fait mieux
- je pense qu'on atteint la limite de l'acceptable



Même test sur une autre vidéo avec 480p, 1 image toutes les 5 secondes et audio qualité basse : `ffmpeg -i developper-avec-utilisateur-inria.mp4 -s hd480 -filter:v fps=fps=1/5 -c:a aac -b:a 56k developper-avec-utilisateur-inria-480p-5seconds-audiolow.mp4`

Bilan : 

- le fichier fait 20.3mo au lieu de 86.1mo, on a pas fait mieux
- je pense qu'on atteint la limite de l'acceptable
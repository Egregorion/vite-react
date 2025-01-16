# Le fichier Dockerfile vient décrire l'image dont aura besoin de conteneur pour faire tourner l'application 

# l'image source sur laquelle se baser 
FROM node:18-alpine AS build

# optionnel, on créer un répertoire app pour contenir les fichiers
WORKDIR /app

# on commence par copier le package.json et package-lock.json à la racine du workdir
COPY package*.json ./ 

# on install les dépendances (ça va créer un dossier node_modules)
RUN npm install

# il reste à copier tous les autres fichiers de l'appli
COPY . .

# on définie les commandes pour build l'application 
CMD [ "npm", "run", "build" ] 

# pour la prod, on a besoin d'un serveur. 
# On va donc aller chercher une image de Nginx, un petit serveur web léger et rapide
FROM nginx:stable-alpine AS production 

# le build de l'app se trouve dans le dossier dist du WORKDIR, on copie donc son contenu dans le dossier html de Nginx
COPY ./dist usr/share/nginx/html

# on expose le port 80 du conteneur (qui va rendre le dossier html)
EXPOSE 80

# on lance le processus d' Nginx 
CMD ["nginx", "-g", "daemon off;" ]

rm -f *.png
rm -f *.js
rm -f *.html
rm -f *.jpg

cp ~/work/huipin/tvirus/site/dist/* .

git add .
git commit -m 'new'
git push

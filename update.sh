rm -f *.png
rm -f *.js
rm -f *.html
rm -f *.jpg
echo '删除成功'
cp ~/work/huipin/tvirus/site/dist/* .
echo '复制成功'
git add .
git commit -m 'new'
git push

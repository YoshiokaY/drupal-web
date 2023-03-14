dir_shima="./htdocs/shima/*"
files=`find $dir_shima -name *.html`
for file in $files;
do
  sed -i '' -e 's/a href="\//a href="\/shima\//g' $file
done

dir_nikko="./htdocs/nikko/*"
files2=`find $dir_nikko -name *.html`
for file2 in $files2;
do
  sed -i '' -e 's/a href="\//a href="\/nikko\//g' $file2
done

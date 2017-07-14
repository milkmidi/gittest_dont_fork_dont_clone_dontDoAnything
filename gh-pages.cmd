cd build
git rm -rf .git
git init
git add .
git commit -a -m "deploy to Github pages"
git push --force git@github.com:milkmidi/gittest_dont_fork_dont_clone_dontDoAnything.git master:gh-pages
pause
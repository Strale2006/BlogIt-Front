# Balkanflix


### NIKAKO NE SPAJATI KOD NA GITHUB AKO POSTOJI GRESKA U NJEMU

# Programer 1 kreira novi branch funkcije za svoj rad.
git checkout -b nova-funkcija

# Programer 1 pravi svoje izmene koda na branch-u funkcije.
# ...

# Programer 1 redovno commit-uje svoje izmene na branch-u funkcije.
git add <file-name>
git commit -m "Poruka o potvrdi"

# Programer 1 push-uje branch funkcije na remote skladište.
git push origin nova-funkcija

# Programer 2 prelazi na main branch i pull-uje najnovije izmene sa remote skladišta.
git checkout main
git pull origin main

# Programer 2 pregleda izmene na branch-u nove funkcije.
git checkout nova-funkcija
git diff

# Programer 2 merge-uje branch nove funkcije u main branch.
git checkout main
git merge nova-funkcija

# Programer 2 rešava sve sukobe.

# Programer 2 push-uje izmene na remote skladište.
git push origin main

# Izmene programera 1 su sada dostupne svim korisnicima.

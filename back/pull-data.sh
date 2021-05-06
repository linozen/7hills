#!/usr/bin/env bash
set -euo pipefail

rsync -avhP containers:/home/deployr/7hills/data/ /home/lino/Projects/7hills/back/data/ --delete
rsync -avhP containers:/home/deployr/7hills/uploads/ /home/lino/Projects/7hills/back/app/public/uploads/ --delete

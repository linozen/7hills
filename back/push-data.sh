#!/usr/bin/env bash
set -euo pipefail

rsync -avhP /home/lino/Projects/7hills/back/data/ containers:/home/deployr/7hills/data/ --delete
rsync -avhP /home/lino/Projects/7hills/back/app/public/uploads/ containers:/home/deployr/7hills/uploads --delete

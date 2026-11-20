# Публикация fvva.ru на VPS

Сайт обслуживает Nginx из `/var/www/fvva/releases/<коммит>`. Исходники на VPS лежат в `/var/www/fvva/source`. Для выпуска нужен чистый коммит и его сборка на машине с Node и pnpm. Переменная `FVVA_HOST` ниже — SSH-адрес VPS или его псевдоним из SSH-конфигурации.

1. Выполните `pnpm install --frozen-lockfile`, `pnpm check`, `pnpm test` и `pnpm test:browser`. Для проверки в установленном Chrome можно задать `PLAYWRIGHT_CHANNEL=chrome`.
2. Соберите статику в новую временную папку и создайте манифест.

   ```sh
   release_id=$(git rev-parse --short=12 HEAD)
   staging=$(mktemp -d)
   pnpm exec vite build --outDir "$staging/public"
   (cd "$staging/public" && find . -type f ! -name '.gitkeep' -exec shasum -a 256 {} +) > "$staging/assets.sha256"
   ```

3. Отправьте коммит в репозиторий. На VPS обновите `/var/www/fvva/source` до этого же коммита через `git pull --ff-only`. Загрузите файлы в отдельную папку выпуска. При медленной связи можно добавить в rsync `--link-dest=/var/www/fvva/releases/<предыдущий-коммит>` для повторного использования совпадающих файлов.

   ```sh
   ssh "$FVVA_HOST" "mkdir -p /var/www/fvva/releases/$release_id"
   rsync -rcz --exclude=.gitkeep "$staging/public/" "$FVVA_HOST:/var/www/fvva/releases/$release_id/"
   ssh "$FVVA_HOST" "cd /var/www/fvva/releases/$release_id && sha256sum --quiet -c -" < "$staging/assets.sha256"
   ```

4. Чтобы старые вкладки могли дозагрузить ресурсы после переключения, добавьте отсутствующие хешированные файлы из `assets/` предыдущего выпуска командой `cp -al --no-clobber <предыдущий>/assets/. <новый>/assets/` на VPS. Запустите переключение.

   ```sh
   ssh "$FVVA_HOST" "sh /var/www/fvva/source/deploy/activate.sh $release_id"
   ```

   Скрипт сохраняет конфигурацию предыдущего выпуска, проверяет Nginx и сравнивает фактические ответы HTTPS с файлами контактов и страницы 404. При ошибке он возвращает предыдущую конфигурацию. После публикации откройте контакты, статью и любой несуществующий URL с внешнего подключения.

## Ручной откат

Путь к `previous.conf` выводит скрипт переключения. На VPS скопируйте этот файл в `/etc/nginx/sites-available/fvva`, затем выполните `nginx -t && systemctl reload nginx`. Убедитесь, что `https://fvva.ru/contact` отдаёт предыдущую версию. Директории выпусков и конфигурации отката хранятся вне публичного сайта.

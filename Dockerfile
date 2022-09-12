FROM drupal:9.3.14-php8.1-apache-bullseye

# Drushインストール
RUN composer require drush/drush \
  && ln -s /opt/drupal/vendor/bin/drush /usr/local/bin/drush \
  && drush --version

# 初回起動時にDrupalをインストールする用のshellを配置


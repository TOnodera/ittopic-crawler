FROM apify/actor-node-playwright-chrome:18

USER root
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
  curl \
  wget \
  gnupg \
  ca-certificates \
  locales \
  gcc \
  build-essential \
  git \
  vim \
  openssh-client \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# ロケール設定
RUN sed -i -e 's/# \(ja_JP.UTF-8\)/\1/' /etc/locale.gen \
    && locale-gen \
    && update-locale LANG=ja_JP.UTF-8
    
# node, npm, npxを使えるようにする
# RUN wget https://nodejs.org/dist/v20.11.0/node-v20.11.0-linux-x64.tar.xz \
#     && tar xfv node-v20.11.0-linux-x64.tar.xz \
#     && mv node-v20.11.0-linux-x64/bin/node /usr/local/bin/node \
#     && ln -s /node-v20.11.0-linux-x64/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm \
#     && ln -s /node-v20.11.0-linux-x64/lib/node_modules/npm/bin/npx-cli.js /usr/local/bin/npx

# 開発時に利用するユーザー
ARG userid=1000
RUN usermod -s /bin/bash -u ${userid} node
WORKDIR /home/node/app
RUN chown -R ${userid}:${userid} /home/node/app

USER node

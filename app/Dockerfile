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

ENV LANG ja_JP.UTF-8 
ENV TZ 'Asia/Tokyo'
# ロケール設定
RUN sed -i -e 's/# \(ja_JP.UTF-8\)/\1/' /etc/locale.gen \
    && locale-gen \
    && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone


RUN npm i -g dotenv-cli tsc-alias
ARG userid=1000
RUN usermod -s /bin/bash -u ${userid} node
WORKDIR /home/node/crawler/app
COPY . /home/node/crawler/app 
RUN chown -R ${userid}:${userid} /home/node/

USER node
RUN pwd > /dev/stderr
RUN npm ci && npm run build 

CMD ["npm", "run" ,"start:prod"]



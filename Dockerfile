FROM ubuntu:14.04
MAINTAINER Kelly Aanderson <kelly.j.anderson@gmail.com>
# This docker file is based on the work of Phillip Baily <phillip@bailey.st>
# from the docker-flask https://hub.docker.com/r/p0bailey/docker-flask/

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && apt-get install -y \
    python-pip python-dev uwsgi-plugin-python \
    nginx supervisor curl git \
&& curl -sL https://deb.nodesource.com/setup_6.x | bash - && apt-get update \ 
&& apt-get install -y nodejs && npm install npm -g
    
COPY flask_nginx.conf /etc/nginx/sites-available/
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY app /var/www/app
RUN mkdir -p /var/log/nginx/app /var/log/uwsgi/app /var/log/supervisor \
&& rm /etc/nginx/sites-enabled/default \
&& ln -s /etc/nginx/sites-available/flask_nginx.conf /etc/nginx/sites-enabled/flask_nginx.conf \
&& echo "daemon off;" >> /etc/nginx/nginx.conf \
&& chown -R www-data:www-data /var/www/app \
&& chown -R www-data:www-data /var/log

RUN mkdir -p build/
COPY app/ build/app/
RUN mkdir -p build/app/static/build/
COPY .babelrc build/
COPY package.json build/
COPY webpack* build/
COPY requirements.txt build/
WORKDIR build/

RUN pip install -r requirements.txt
RUN npm install
RUN npm run build

RUN cp -r /build/app/static/build /var/www/app/static/build

EXPOSE 80

CMD ["/usr/bin/supervisord"]

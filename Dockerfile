FROM ubuntu:14.04
MAINTAINER Kelly Aanderson <kelly.j.anderson@gmail.com>
# This docker file is based on the work of Phillip Baily <phillip@bailey.st>
# from the docker-flask https://hub.docker.com/r/p0bailey/docker-flask/

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && apt-get install -y \
    python-pip python-dev uwsgi-plugin-python \
    nginx supervisor curl git
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash - && apt-get update 
RUN apt-get install -y nodejs && npm install npm -g
    
COPY flask_nginx.conf /etc/nginx/sites-available/
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY app /var/www/app
RUN mkdir -p /var/log/nginx/app /var/log/uwsgi/app /var/log/supervisor
RUN rm /etc/nginx/sites-enabled/default
RUN ln -s /etc/nginx/sites-available/flask_nginx.conf /etc/nginx/sites-enabled/flask_nginx.conf
RUN echo "daemon off;" >> /etc/nginx/nginx.conf
RUN pip install -r /var/www/app/requirements.txt
RUN chown -R www-data:www-data /var/www/app
RUN chown -R www-data:www-data /var/log

WORKDIR /build
COPY .babelrc /build/
COPY package.json /build/
COPY webpack* /build/
COPY app /build/
RUN npm install
RUN npm run build
COPY ./app/static/build /var/www/app/static/build

EXPOSE 80

CMD ["/usr/bin/supervisord"]

FROM ubuntu:14.04
MAINTAINER Kelly Aanderson <kelly.j.anderson@gmail.com>
# This docker file is primarily the work of Phillip Baily <phillip@bailey.st>
# from the docker-flask https://hub.docker.com/r/p0bailey/docker-flask/

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && apt-get install -y \
    python-pip python-dev uwsgi-plugin-python \
    nginx supervisor
COPY flask_nginx.conf /etc/nginx/sites-available/
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY app /var/www/app

RUN mkdir -p /var/log/nginx/app /var/log/uwsgi/app /var/log/supervisor \
RUN rm /etc/nginx/sites-enabled/default \
RUN ln -s /etc/nginx/sites-available/flask_nginx.conf /etc/nginx/sites-enabled/flask_nginx.conf \
RUN echo "daemon off;" >> /etc/nginx/nginx.conf \
RUN pip install -r /var/www/app/requirements.txt \
RUN chown -R www-data:www-data /var/www/app \
RUN chown -R www-data:www-data /var/log

WORKDIR /var/www/app
RUN npm install
RUN npm run build

CMD ["/usr/bin/supervisord"]
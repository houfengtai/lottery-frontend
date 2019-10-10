#it-content-frontend:base
FROM docker.oa.isuwang.com:5000/system/nginx:1.10.1
MAINTAINER Hou

RUN rm /etc/nginx/conf.d/*.conf

ADD app.conf /etc/nginx/conf.d/

COPY dist/  /usr/share/nginx/html/

CMD ["nginx", "-g", "daemon off;"]
#/bin/bash

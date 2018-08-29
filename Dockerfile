FROM andreportela/bollinha:v1.0.4 as build-stage
COPY . /app/
RUN npm run build --prod

FROM nginx:1.15.2-alpine
COPY ./proxy/*.crt /etc/ssl/certs/
COPY ./proxy/*.key /etc/ssl/private/
COPY ./proxy/nginx.tmpl /app/

COPY --from=build-stage /app/dist /usr/share/nginx/html

CMD ["/bin/sh", "-c", "/usr/local/bin/envsubst < /app/nginx.tmpl > /etc/nginx/nginx.conf && nginx -g 'daemon off;'"]

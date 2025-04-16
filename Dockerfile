FROM nginx:alpine

COPY . /usr/share/nginx/html

# Optional: custom nginx config for SPA/history fallback, etc.
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

FROM registry.access.redhat.com/ubi8/nodejs-14 as base

# Install yarn
RUN npm install -g yarn

# Copy project files into the docker image
COPY . .
RUN mkdir -p yarncache

# Chown to correct user
USER 0
RUN chown -R 1001:0 ${APP_ROOT} && chmod -R ug+rwx ${APP_ROOT} && \
    rpm-file-permissions
USER 1001

RUN yarn
YARN_CACHE_FOLDER=/opt/app-root/src/yarncache yarn --production
EXPOSE 6006
CMD yarn storybook



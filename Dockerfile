FROM node:22-slim

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"

RUN npm install --global pnpm

# Install necessary packages
RUN apt update -y && apt install -y --no-install-recommends \
    ca-certificates \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY . /app

WORKDIR /app

RUN pnpm install

RUN pnpm --filter @readest/readest-app setup-pdfjs

WORKDIR /app/apps/readest-app

RUN pnpm build-web

ENTRYPOINT ["pnpm", "start-web"]

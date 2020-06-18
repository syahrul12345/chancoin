FROM golang:alpine as stage1

WORKDIR /app
COPY go.mod .
RUN go mod download

# Build go binary
COPY main.go .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

FROM node:alpine as stage2
WORKDIR /app
COPY staking/package.json .
# Get arguments
ARG REACT_APP_ETHERSCAN_TOKEN
ARG REACT_APP_TOKEN_ADDRESS
ARG REACT_APP_UNISWAP_ADDRESS

ENV REACT_APP_ETHERSCAN_TOKEN ${REACT_APP_ETHERSCAN_TOKEN}
ENV REACT_APP_TOKEN_ADDRESS ${REACT_APP_TOKEN_ADDRESS}
ENV REACT_APP_UNISWAP_ADDRESS ${REACT_APP_UNISWAP_ADDRESS}

RUN yarn
COPY staking/ .
RUN yarn build


FROM alpine as stage3
WORKDIR /app
COPY --from=stage1 /app/main .
COPY --from=stage2 /app/build/  .build/
COPY ./website/ ./website/
CMD ["./main"]



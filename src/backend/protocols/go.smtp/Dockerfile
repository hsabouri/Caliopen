FROM golang
 
ADD . /go/src/github.com/Caliopen/Caliopen/src/backend/protocols/go.smtp
WORKDIR /go/src/github.com/Caliopen/Caliopen/src/backend/protocols/go.smtp
RUN go get ./...

RUN go install github.com/Caliopen/Caliopen/src/backend/protocols/go.smtp/cmd/caliopen_lmtpd
ENTRYPOINT /go/bin/caliopen_lmtpd
 
EXPOSE 2525

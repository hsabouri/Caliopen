FROM golang
 

RUN go get -u github.com/kardianos/govendor
RUN go install github.com/kardianos/govendor

ADD . /go/src/github.com/Caliopen/Caliopen/src/backend/protocols/go.smtp
WORKDIR /go/src/github.com/Caliopen/Caliopen/src/backend/protocols/go.smtp/
RUN make

ENTRYPOINT /go/bin/caliopen_lmtpd
 
EXPOSE 2525

FROM golang
 

RUN go get -u github.com/kardianos/govendor
RUN go install github.com/kardianos/govendor

ADD . /go/src/github.com/Caliopen/Caliopen/src/backend/protocols/go.smtp
WORKDIR /go/src/github.com/Caliopen/Caliopen/src/backend/protocols/go.smtp/
RUN make

# For the moment we must put configuration in the same directory as binary
COPY ./caliopen_lmtpd.conf /go/bin

ENTRYPOINT /go/bin/caliopen_lmtpd serve
 
EXPOSE 2525

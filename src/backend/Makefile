all: deps build

deps:
    cd \$GOPATH/src/github.com/CaliOpen/CaliOpen/src/backend/protocols/go.smtp
    govendor sync

build:
	go install github.com/CaliOpen/CaliOpen/src/backend/protocols/go.smtp/cmd/caliopen_lmtpd

run:
	$GOPATH/bin/caliopen_lmtpd
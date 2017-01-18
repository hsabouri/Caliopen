all: deps build

deps:
	govendor sync

build:
	go install github.com/Caliopen/Caliopen/src/backend/protocols/go.smtp/cmd/caliopen_lmtpd

run:
	$GOPATH/bin/caliopen_lmtpd
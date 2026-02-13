build:
	clear
	npm run compile

release:
	clear
	npm run compile
	./node_modules/.bin/vsce package

.PHONY: build, release
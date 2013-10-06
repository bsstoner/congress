build:
	npm install .
	node_modules/stylus/bin/stylus public/css/app.styl

build-css:
	node_modules/stylus/bin/stylus public/css/app.styl

.PHONY: build build-css

NAME='url2qr'

all: prefix clean minify pack suffix

prefix:
	@echo ''
	@echo '>>> $(NAME) build started'
	@echo ''

clean:
	@echo ''
	@echo '>>> Clean'
	@echo ''
	if [ -e package.zip ]; then rm package.zip;fi
	if [ -e dist ]; then rm -r dist;fi
	if [ -e tmp ]; then rm -r tmp;fi
	mkdir -p dist/html
	mkdir -p dist/css
	mkdir -p dist/js
	mkdir tmp

dist/html/popup.html: src/html/popup.html
	node_modules/.bin/html-minifier --collapse-whitespace \
	                                --conservative-collapse \
	                                --use-short-doctype \
	                                --remove-optional-tags \
	                                src/html/popup.html > dist/html/popup.html

dist/html/background.html: src/html/background.html
	node_modules/.bin/html-minifier --collapse-whitespace \
	                                --conservative-collapse \
	                                --use-short-doctype \
	                                --remove-optional-tags \
	                                src/html/background.html > dist/html/background.html

dist/js/background.js: src/js/background.js
	node_modules/.bin/uglifyjs src/js/background.js > dist/js/background.js

dist/js/popup.js: src/js/popup.js
	node_modules/.bin/uglifyjs src/js/popup.js > dist/js/popup.js

dist/css/popup.css: src/css/popup.css
	node_modules/.bin/csso src/css/popup.css > dist/css/popup.css

minify: dist/html/background.html dist/html/popup.html dist/js/background.js dist/js/popup.js dist/css/popup.css
	@echo ''
	@echo '>>> Minify'
	@echo ''

pack:
	@echo ''
	@echo '>>> Pack'
	@echo ''
	cp -r dist/html tmp
	cp -r dist/css tmp
	cp -r dist/js tmp
	cp -r src/icons tmp
	cp src/manifest.json tmp
	zip package.zip -r ./tmp

suffix:
	@echo ''
	@echo '>>> $(NAME) build has finished'
	@echo ''
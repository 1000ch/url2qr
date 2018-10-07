NAME='url2qr'

all: prefix clean pack suffix

prefix:
	@echo ''
	@echo '>>> $(NAME) build started'
	@echo ''

clean:
	@echo ''
	@echo '>>> Clean'
	@echo ''
	if [ -e package.zip ]; then rm package.zip;fi

pack:
	@echo ''
	@echo '>>> Pack'
	@echo ''
	zip package.zip -r ./src

suffix:
	@echo ''
	@echo '>>> $(NAME) build has finished'
	@echo ''

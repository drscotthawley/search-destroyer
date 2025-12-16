store:
	@mkdir -p /tmp/search-destroyer-build
	@cp manifest.json popup.html popup.js icon.png icon_128.png /tmp/search-destroyer-build/
	@cd /tmp/search-destroyer-build && zip -r ~/Downloads/search-destroyer.zip .
	@rm -rf /tmp/search-destroyer-build
	@echo "Created ~/Downloads/search-destroyer.zip"

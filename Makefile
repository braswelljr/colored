# check for eslint
HASESLINT := $(shell which eslint 2> /dev/null)
# check for prettier
HASPRETTIER := $(shell which prettier 2> /dev/null)
# check for stylelint
HASSTYLELINT := $(shell which stylelint 2> /dev/null)

# check for eslint
ifdef HASESLINT
	ESLINT := eslint
else
	ESLINT := npx eslint
endif

# check for prettier
ifdef HASPRETTIER
	PRETTIER := prettier
else
	PRETTIER := npx prettier
endif

# check for stylelint
ifdef HASSTYLELINT
	STYLELINT := stylelint
else
	STYLELINT := npx stylelint
endif


# List of files and directories to be removed
TEMP_FILES = .next/ out/ .turbo/ dist/ public/sw.js public/sw.js.map \
              public/workbox-*.js public/workbox-*.js.map yarn-error.log \
              .swc/ .eslintcache .prettiercache .contentlayercache \
              .stylelintignorecache .stylelintignorecache.lock .stylelintcache \

.PHONY: clean
clean: # Clean web workspaces
	@rm -rf $(TEMP_FILES)

.PHONY: cleanup
cleanup: # Clean web workspaces
	@rm -rf $(TEMP_FILES) node_modules

.PHONY: dev
dev:
	@make clean
	pnpm run dev

.PHONY: build
build:
	@make clean
	pnpm run build
	@make clean

.PHONY: format
format:
	pnpm run format

.PHONY: colors
colors:
	pnpm run gen:colors

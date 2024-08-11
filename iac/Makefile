install-app:
	yarn set version berry
	yarn config set nodeLinker node-modules
	yarn workspaces focus @sarj/app

build-app:
	yarn workspaces foreach -Atvp --include @sarj/app --include @sarj/precedent-iso  --include @sarj/precedent-node run build

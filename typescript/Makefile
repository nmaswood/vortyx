YARN_SET_VERSION := yarn set version berry
YARN_CONFIG_LINKER := yarn config set nodeLinker node-modules
WORKSPACE_PRECEDENTS := @vortyx/precedent-iso @vortyx/precedent-node @vortyx/precedent-web
WORKSPACE_PRECEDENTS_EIGHT := @vortyx/precedent-iso @vortyx/precedent-node @vortyx/precedent-web @vortyx/eight-node

define YARN_INSTALL
	echo "Starting install for $(1)"
	$(YARN_SET_VERSION)
	$(YARN_CONFIG_LINKER)
	yarn workspaces focus $(1)
endef

define YARN_BUILD
	echo "Starting build for $(1)"
	yarn workspaces foreach -Atvp --include $(1) $(foreach ws,$(WORKSPACE_PRECEDENTS),--include $(ws)) run build
endef

define YARN_INSTALL_EIGHT
	echo "Starting install for $(1)"
	$(YARN_SET_VERSION)
	$(YARN_CONFIG_LINKER)
	yarn workspaces focus $(1)
endef

define YARN_BUILD_EIGHT
	echo "Starting build for $(1)"
	yarn workspaces foreach -Atvp --include $(1) $(foreach ws,$(WORKSPACE_PRECEDENTS_EIGHT),--include $(ws)) run build
endef

.PHONY: install-% build-% install-eight build-eight

install-%:
	$(call YARN_INSTALL,@vortyx/$*)

build-%:
	$(call YARN_BUILD,@vortyx/$*)

install-eight:
	$(call YARN_INSTALL_EIGHT,@vortyx/eight)

build-eight:
	$(call YARN_BUILD_EIGHT,@vortyx/eight)


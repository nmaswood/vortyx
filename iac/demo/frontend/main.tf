terraform {
  required_providers {

    vercel = {
      source = "vercel/vercel"
    }
  }
}

locals {
  app_name = "demo"
}

resource "vercel_project" "fe" {
  name = "vortyx-demo"
  git_repository = {
    type              = "github"
    repo              = "${var.repo_owner}/${var.github_repo}"
    production_branch = "main"
  }
  prioritise_production_builds = true

  vercel_authentication = {
    protect_production = false
    deployment_type    = "none"

  }
  framework = "nextjs"

  install_command  = "make install-${local.app_name}"
  build_command    = "make build-${local.app_name}"
  root_directory   = "typescript"
  output_directory = "packages/${local.app_name}/.next"
  team_id          = var.vercel_team_id


  environment = []
}

resource "vercel_deployment" "git" {
  team_id    = var.vercel_team_id
  project_id = vercel_project.fe.id
  ref        = "main"
  production = true
}



resource "vercel_project_domain" "domain" {
  team_id    = var.vercel_team_id
  project_id = vercel_project.fe.id
  domain     = "www.broker-demo.vortyx.ai"
}

resource "vercel_project_domain" "bare_domain" {
  team_id    = var.vercel_team_id
  project_id = vercel_project.fe.id

  domain = "broker-demo.vortyx.ai"

  redirect             = vercel_project_domain.domain.domain
  redirect_status_code = 308
}


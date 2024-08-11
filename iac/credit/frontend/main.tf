terraform {
  required_providers {

    vercel = {
      source = "vercel/vercel"
    }
  }
}

locals {
  app_name = "credit"
}

resource "vercel_project" "fe" {
  name = "${var.stack}-${var.project_slug}"
  git_repository = {
    type              = "github"
    repo              = "${var.repo_owner}/${var.github_repo}"
    production_branch = "main"
  }
  prioritise_production_builds = true

  ignore_command = "[ \"$VERCEL_ENV\" != \"production\" ] && exit 0 || (git diff HEAD^ HEAD --quiet -- ./packages/precedent-iso/ ./packages/precedent-node/ ./packages/precedent-web/ ./packages/credit/ ./yarn.lock || exit 1)"


  serverless_function_region = var.vercel_region

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


  environment = [
    {
      key    = "BUCKET"
      target = ["production", "preview"]
      value  = var.bucket
    },
    {
      key    = "NEXT_PUBLIC_BACKEND_URL"
      target = ["production", "preview"]
      value  = var.backend_url
    },
    {
      key    = "BASE64_ENCODED_URL_SIGNING_SERVICE_ACCOUNT"
      target = ["production", "preview"]
      value  = var.base64_encoded
    }

  ]
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
  domain     = "www.${var.vercel_domain}"
}

resource "vercel_project_domain" "bare_domain" {
  team_id    = var.vercel_team_id
  project_id = vercel_project.fe.id
  domain     = var.vercel_domain

  redirect             = vercel_project_domain.domain.domain
  redirect_status_code = 308
}

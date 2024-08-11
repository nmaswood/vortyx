terraform {
  required_providers {

    google = {
      source = "hashicorp/google"
    }

    vercel = {
      source = "vercel/vercel"
    }
  }

}

provider "vercel" {
  api_token = var.vercel_api_key
}

locals {
  service_name = "credit-${var.stack}"
}

module "blob" {
  source      = "./blob"
  region      = var.region
  project     = var.project
  bucket_name = "sarj-summer-credit-wtf"
}

module "ci" {
  source      = "./blob"
  region      = var.region
  project     = var.project
  bucket_name = var.project_slug
}

module "services" {
  source       = "./services"
  region       = var.region
  project      = var.project
  project_slug = var.project_slug

  cloud_run_service_account_email = var.cloud_run_service_account_email
  allowed_origins                 = "[\"https://${var.vercel_domain}\", \"https://www.${var.vercel_domain}\"]"

  repository_address = var.repository_address
  branch_name        = var.branch_name
  stack              = var.stack
  service_name       = local.service_name
  bucket             = module.blob.bucket_name
  anthropic_api_key  = var.anthropic_api_key
}

module "frontend" {
  source       = "./frontend"
  project_slug = var.project_slug

  stack          = var.stack
  repo_owner     = var.repo_owner
  github_repo    = var.github_repo
  vercel_region  = var.vercel_region
  vercel_team_id = var.vercel_team_id
  vercel_domain  = var.vercel_domain
  bucket         = module.blob.bucket_name
  backend_url    = module.services.backend_url
  base64_encoded = var.base64_encoded
}

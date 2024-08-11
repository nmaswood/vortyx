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


module "frontend" {
  source         = "./frontend"
  repo_owner     = var.repo_owner
  github_repo    = var.github_repo
  vercel_team_id = var.vercel_team_id
}

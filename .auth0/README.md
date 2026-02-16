# Auth0 Deploy CLI Configuration

This directory contains Auth0 configuration files for automated deployment using `auth0-deploy-cli`.

## Setup

1. Install the Auth0 Deploy CLI:
```bash
npm install -g auth0-deploy-cli
```

2. Set environment variables:
```bash
export AUTH0_DOMAIN=your-domain.auth0.com
export AUTH0_CLIENT_ID=your_management_api_client_id
export AUTH0_CLIENT_SECRET=your_management_api_client_secret
```

3. Deploy configuration:
```bash
a0deploy import --config_file .auth0/config.json --input_file .auth0
```

## Configuration Files

- `config.json` - Main configuration with Auth0 credentials
- `api.json` - API resource configuration
- `client.json` - SPA application settings
- `database.json` - Database connection with signup disabled
- `tenant.json` - Tenant settings with MFA enabled

## What This Automates

1. **API Resource**: Creates "Weather Comfort API" with proper identifier and settings
2. **SPA Client**: Configures the Single Page Application with callbacks and CORS
3. **Database Connection**: Sets up authentication with public signups DISABLED
4. **MFA Configuration**: Enables email-based multi-factor authentication
5. **Security Policies**: Implements password policies and brute force protection

## Manual Steps Still Required

After deployment, you must manually:
1. Create test user `careers@fidenz.com` in Auth0 Dashboard
2. Set password to `Pass#fidenz`
3. Verify the email if MFA requires it

## Alternative: Terraform

For infrastructure-as-code approach with better version control:

```hcl
provider "auth0" {
  domain        = var.auth0_domain
  client_id     = var.auth0_client_id
  client_secret = var.auth0_client_secret
}

resource "auth0_resource_server" "weather_api" {
  name       = "Weather Comfort API"
  identifier = "https://weather-comfort-api"
}

resource "auth0_client" "spa" {
  name        = "Weather Comfort Dashboard"
  app_type    = "spa"
  callbacks   = ["http://localhost:5173"]
}
```

Save as `terraform/main.tf` and run `terraform apply`.

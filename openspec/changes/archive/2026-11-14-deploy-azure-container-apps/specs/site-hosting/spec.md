# Spec Delta

## Purpose

Defines how the public TonyAI marketing site is served to visitors and crawlers: where it runs, which hostnames answer, and how URLs, errors, caching and transport security behave.

## ADDED Requirements

### Requirement: Site is hosted in Sweden Central
Every Azure resource created for hosting the site SHALL be located in the `swedencentral` region and SHALL be separate from the QA application's compute resources.

#### Scenario: Resources are in the region
- **WHEN** the resources in the site's resource group are listed
- **THEN** every regional resource reports the location `swedencentral`

#### Scenario: QA is unaffected
- **WHEN** the site's resource group is deleted
- **THEN** `qa.tonyai.io` and `api.qa.tonyai.io` keep working

### Requirement: Canonical hostname over HTTPS
The site SHALL be served at `https://tonyai.io` with a valid, automatically renewed certificate. Plain HTTP requests SHALL be redirected to HTTPS.

#### Scenario: Apex over HTTPS
- **WHEN** a visitor requests `https://tonyai.io/`
- **THEN** the home page is returned with status 200 and a certificate valid for `tonyai.io`

#### Scenario: Plain HTTP
- **WHEN** a visitor requests `http://tonyai.io/sirket/`
- **THEN** the response is a redirect to `https://tonyai.io/sirket/`

### Requirement: www redirects to the apex
Requests to `www.tonyai.io` SHALL receive a permanent redirect to the same path and query on `https://tonyai.io`.

#### Scenario: www with a path
- **WHEN** a visitor requests `https://www.tonyai.io/demo/?utm_source=x`
- **THEN** the response is a 301 to `https://tonyai.io/demo/?utm_source=x`

### Requirement: Default platform hostname is not indexed
Responses served on the platform's default hostname SHALL carry `X-Robots-Tag: noindex`, and responses on `tonyai.io` SHALL NOT carry it.

#### Scenario: Default hostname
- **WHEN** a crawler requests the home page on the default `azurecontainerapps.io` hostname
- **THEN** the response includes `X-Robots-Tag: noindex`

#### Scenario: Canonical hostname
- **WHEN** a crawler requests `https://tonyai.io/`
- **THEN** the response has no `X-Robots-Tag` header

### Requirement: Trailing-slash URLs
Every exported page SHALL be served at its trailing-slash URL, and the same path without the trailing slash SHALL redirect to it without exposing the internal port or scheme.

#### Scenario: Page with trailing slash
- **WHEN** a visitor requests `/kaynaklar/`
- **THEN** the resources page is returned with status 200

#### Scenario: Page without trailing slash
- **WHEN** a visitor requests `https://tonyai.io/sirket`
- **THEN** the response redirects to `https://tonyai.io/sirket/`

### Requirement: Custom not-found page
A request for a path that does not exist SHALL return status 404 with the site's own not-found page.

#### Scenario: Unknown path
- **WHEN** a visitor requests `/boyle-bir-sayfa-yok/`
- **THEN** the status is 404 and the body is the site's not-found page

### Requirement: Cache policy
Content-hashed assets under `/_next/static/` SHALL be served with `Cache-Control: public, max-age=31536000, immutable`. HTML documents SHALL be served so that browsers revalidate them before reuse.

#### Scenario: Hashed asset
- **WHEN** a browser requests a file under `/_next/static/`
- **THEN** the response carries `Cache-Control: public, max-age=31536000, immutable`

#### Scenario: New deploy is visible
- **WHEN** a returning visitor loads a page after a new version was deployed
- **THEN** the browser revalidates the HTML and shows the new version

### Requirement: Security headers
Every response SHALL include `Strict-Transport-Security`, `X-Content-Type-Options: nosniff` and a `Referrer-Policy` header.

#### Scenario: Headers on a page
- **WHEN** a visitor requests `https://tonyai.io/`
- **THEN** the response includes all three headers

#### Scenario: Headers on an asset
- **WHEN** a browser requests a file under `/_next/static/`
- **THEN** the response includes all three headers

### Requirement: Text responses are compressed
HTML, CSS, JavaScript, JSON and SVG responses SHALL be compressed when the client accepts gzip.

#### Scenario: Compressed stylesheet
- **WHEN** a browser requests a CSS file with `Accept-Encoding: gzip`
- **THEN** the response has `Content-Encoding: gzip`

### Requirement: No cold start
At least one instance of the site SHALL be running at all times so the first visitor after an idle period is not delayed by a start-up.

#### Scenario: Request after idle
- **WHEN** the site has received no traffic for several hours and a visitor requests the home page
- **THEN** the page is served by an already running instance

### Requirement: Request logs are retained
Access and error logs of the site SHALL be queryable for at least 30 days.

#### Scenario: Investigating an error
- **WHEN** an operator looks for a failed request from the previous week
- **THEN** the request appears in the log store

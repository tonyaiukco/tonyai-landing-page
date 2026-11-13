# site-deployment Specification

## Purpose

Defines how a change to the TonyAI marketing site reaches the live site: the checks it passes, how a version is published and rolled out, which credentials are used, and how a version is rolled back.

## Requirements

### Requirement: Push to main deploys the site
Every push to `main` SHALL build the site, publish it as a container image tagged with the commit SHA, and roll the live site to that image without manual steps. The same deployment SHALL be startable by hand.

#### Scenario: Merge to main
- **WHEN** a commit is pushed to `main`
- **THEN** the live site serves that commit's content once the workflow finishes

#### Scenario: Manual run
- **WHEN** an operator starts the workflow by hand on `main`
- **THEN** the current `main` commit is built and deployed

### Requirement: Failed builds do not reach the live site
If lint, the site build or the image build fails, the deployment SHALL stop and the live site SHALL keep serving the previous version.

#### Scenario: Build error on main
- **WHEN** a commit that fails `npm run build` is pushed to `main`
- **THEN** the workflow fails and the live site is unchanged

### Requirement: Unhealthy versions take no traffic
A new version that does not start SHALL NOT receive traffic; the previous version SHALL keep serving until the new one is ready.

#### Scenario: Image fails to start
- **WHEN** a deployed image crashes on start
- **THEN** visitors are still served by the previous version and the workflow reports the failure

### Requirement: Pull requests are checked without Azure access
Pull requests SHALL run lint and the site build, and SHALL NOT sign in to Azure, push an image or change the live site.

#### Scenario: Pull request from a fork
- **WHEN** a pull request is opened from a fork
- **THEN** lint and build run and no Azure credential is requested

### Requirement: No stored deployment secrets
The deployment SHALL authenticate to Azure with GitHub OIDC limited to the `main` branch of `tonyaiukco/tonyai-landing-page`, and the running site SHALL pull its image with a managed identity. No password, key or token for Azure or the registry SHALL be stored in GitHub or in the repository.

#### Scenario: Repository secrets
- **WHEN** the repository's secrets and variables are listed
- **THEN** only non-secret identifiers (client, tenant and subscription IDs) are present

#### Scenario: Token from another branch
- **WHEN** a workflow on a branch other than `main` requests an Azure token for the deploy identity
- **THEN** the sign-in is rejected

### Requirement: Least-privilege identities
The deploy identity SHALL be limited to pushing images to the registry and managing the site's own resource group. The site's runtime identity SHALL be limited to pulling images.

#### Scenario: Deploy identity scope
- **WHEN** the deploy identity's role assignments are listed
- **THEN** they cover only the site's resource group and image push on the registry

#### Scenario: Runtime identity scope
- **WHEN** the runtime identity's role assignments are listed
- **THEN** the only assignment is image pull on the registry

### Requirement: Rollout is verified
After rolling out a version the deployment SHALL request the live site and SHALL fail if the home page, a nested page or the not-found page do not return their expected status.

#### Scenario: Healthy rollout
- **WHEN** a version is rolled out and the home page returns 200, a nested page returns 200 and an unknown path returns 404
- **THEN** the workflow succeeds

#### Scenario: Broken rollout
- **WHEN** the home page does not return 200 after rollout
- **THEN** the workflow fails

### Requirement: Rollback to a previous version
An operator SHALL be able to return the live site to any previously deployed commit with a single documented command, without rebuilding.

#### Scenario: Roll back one version
- **WHEN** an operator runs the documented rollback command with the previous commit's SHA
- **THEN** the live site serves that commit's content

### Requirement: Infrastructure is reproducible from the repository
The hosting resources SHALL be defined as code in the repository with state kept in remote storage, so they can be recreated or changed from any authorized machine.

#### Scenario: Plan on a clean checkout
- **WHEN** an authorized operator runs a plan from a fresh clone after the first apply
- **THEN** the plan reports no changes

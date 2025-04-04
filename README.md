# js-practice 🛠️

A simple CLI to quickly scaffold JavaScript practice projects.

## 📦 Install & Use

### Run with NPX

```bash
npx baum-cli@latest init my-app
```

### Global Install
```
npm install -g baum-cli
baum-cli init my-app
```

### Typescript Install
```bash
npx baum-cli@latest init my-ts-app --ts
```

### Typescript + Playwright Install
```bash
npx baum-cli@latest init my-playwright-app --ts --playwright

```

### Clone BaumAcedemy WebApp
```bash
npx baum-cli@latest init my-baum-academy-app --baum-academy

```

### Install All of Modules
```bash
npx baum-cli@latest init my-all-app --all

```

# Commit Tags for Automated Releases

This project uses commit tags to automatically determine version bumps via semantic-release.

## Key Tags and Their Effects

- **feat:**  
  Introduces a new feature.  
  *Triggers a minor version bump* (e.g., 1.0.0 → 1.1.0).

- **fix:**  
  Fixes a bug.  
  *Triggers a patch version bump* (e.g., 1.0.0 → 1.0.1).

- **perf:**  
  Improves performance.  
  *Triggers a patch version bump*.

- **BREAKING CHANGE:**  
  Include this in your commit message body or footer when making changes that break backward compatibility.  
  *Triggers a major version bump* (e.g., 1.0.0 → 2.0.0).

## Other Commit Types

Commit types like `docs:`, `style:`, `chore:`, `refactor:`, and `test:` are used for non-functional changes and do not trigger a release.

Follow these guidelines to ensure a smooth and automated release process!

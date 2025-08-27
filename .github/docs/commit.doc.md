# Git Branching & Commit Guidelines

## 1. Branch Structure

- **`main`**
  - Contains production-ready (stable) code.
  - Always **stable**, no direct commits.
  - Tags are created for each release (`v0.1`, `v0.2`, `v1.0`, etc.).

- **`develop`**
  - Integration branch for features.
  - Used for testing and review before release.

- **`feature/*`**
  - Dedicated branch for each new feature.
  - Example: `feature/init-project`, `feature/login`.
  - Once complete → merge into `develop`.

- **`release/*`**
  - Branches for preparing a release.
  - Example: `release/1.0.0`.
  - Minor bug fixes here → merged into both `main` and `develop`.

- **`hotfix/*`**
  - Used to quickly fix critical bugs in production.
  - Example: `hotfix/1.0.1`.
  - After fixing → merge into both `main` and `develop`.

---

## 2. Version Tags

- Tags are used to mark release versions.
- Examples:
  - `v0.1`: first stable version
  - `v0.2`: after hotfix + develop update
  - `v1.0`: official release

Create a tag:

```bash
git tag -a v1.0 -m "Release v1.0"
git push origin --tags
```

---

## 3. Commit Message Guidelines

- **Standard format:**

  ```
  <type>(scope): <message>
  ```

- **Common types:**
  - `feat`: new feature
  - `fix`: bug fix
  - `chore`: maintenance tasks (config, build, dependencies, etc.)
  - `docs`: documentation changes
  - `refactor`: code improvements without changing functionality
  - `test`: add or update tests

- **Examples:**

  ```
  feat(auth): add login API
  fix(ui): fix unclickable button on mobile
  docs: update commit guide
  chore: update dependencies
  ```

---

## 4. Release Workflow

1. Complete features → merge into `develop`.
2. Create `release/x.x.x` from `develop` for release preparation.
3. Apply minor bug fixes in `release` → merge into both `main` and `develop`.
4. Tag version on `main` (`v1.0`, `v1.1`, etc.).
5. For urgent issues → create `hotfix/x.x.x` from `main`, fix, then merge back into both `main` and `develop`.

![Banner](/imgs/gitFlow.png)

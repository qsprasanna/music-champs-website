## 🛠 Development Workflow

This project uses **Husky**, **lint-staged**, and **commitlint** to ensure high code quality and a clean git history.

### 🛡️ Git Hooks

- **Pre-commit**: Automatically runs `ESLint` and `Prettier` on staged files. It will attempt to fix style issues automatically.
- **Commit-msg**: Validates your commit message against the **Conventional Commits** standard.

### 📝 Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. Your commit messages should look like this:

`type(optional-scope): description`

**Common Types:**

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries

### 🚀 Getting Started with the Hooks

1. **Install dependencies:** `npm install`
2. **Setup Husky:** `npm run prepare` (runs `husky init` automatically)
3. **Set Commit Template:** Run the following command to see the guide in your editor:
   ```bash
   git config commit.template .gitmessage
   ```

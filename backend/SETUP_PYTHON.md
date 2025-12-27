# Setting Up Python 3.11 for AWS SAM

## Option 1: Install Python 3.11 using pyenv (Recommended)

### Step 1: Install pyenv (if not already installed)

```bash
# macOS
brew install pyenv

# Add to your shell profile (~/.zshrc or ~/.bash_profile)
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zshrc
echo 'command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.zshrc
echo 'eval "$(pyenv init -)"' >> ~/.zshrc

# Reload shell
source ~/.zshrc
```

### Step 2: Install Python 3.11

```bash
pyenv install 3.11.9
pyenv local 3.11.9  # Sets Python 3.11 for this directory
```

### Step 3: Verify

```bash
python --version  # Should show Python 3.11.9
which python      # Should point to pyenv version
```

### Step 4: Rebuild your virtual environment (optional but recommended)

```bash
cd backend
rm -rf venv
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Step 5: Try SAM build again

```bash
sam build
```

---

## Option 2: Use Docker for SAM Build (No Python Installation Needed)

If you have Docker installed, SAM can use Docker to build with the correct Python version:

```bash
# Build using Docker
sam build --use-container

# Or set it as default
export SAM_CLI_TELEMETRY=0
sam build --use-container
```

This uses Docker containers with the correct Python runtime, so you don't need to install Python 3.11 locally.

---

## Option 3: Install Python 3.11 via Homebrew

```bash
# Install Python 3.11
brew install python@3.11

# Create a symlink (if needed)
ln -s /opt/homebrew/opt/python@3.11/bin/python3.11 /usr/local/bin/python3.11

# Verify
python3.11 --version
```

Then update your PATH or use the full path in SAM.

---

## Quick Fix: Update template.yaml to use Python 3.12 (if supported)

If AWS Lambda supports Python 3.12 (check AWS docs), you can keep Python 3.12 and update the template. However, as of 2024, Lambda supports up to Python 3.11, so Option 1 or 2 is recommended.


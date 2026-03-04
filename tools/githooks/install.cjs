const fs = require('fs');
const path = require('path');

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
}

function copyFile(src, dest) {
  fs.copyFileSync(src, dest);
}

function makeExecutable(filePath) {
  try {
    fs.chmodSync(filePath, 0o755);
  } catch {
  }
}

function main() {
  const gitDir = path.join(process.cwd(), '.git');
  if (!fs.existsSync(gitDir)) {
    console.log('ℹ️  .git not found, skipping hooks install');
    return;
  }

  const srcDir = path.join(process.cwd(), 'tools', 'githooks');
  const hooksDir = path.join(gitDir, 'hooks');

  ensureDir(hooksDir);

  const hookName = 'pre-commit';
  const srcHook = path.join(srcDir, hookName);
  const destHook = path.join(hooksDir, hookName);

  if (!fs.existsSync(srcHook)) {
    console.log(`ℹ️  Hook file not found: ${srcHook}`);
    return;
  }

  copyFile(srcHook, destHook);
  makeExecutable(destHook);

  console.log('✅ Git pre-commit hook installed');
}

main();

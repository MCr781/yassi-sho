// tree-size.js
const fs = require('fs');
const path = require('path');

// Added 'venv' and '.venv' to the ignore list
const ignore = new Set(['node_modules', '.git', 'venv', '.venv']);

function getSize(p) {
    try { return fs.statSync(p).size; } catch { return 0; }
}

function tree(dir, prefix = '', depth = 3) {
    if (depth <= 0) return;

    let items;
    try {
        items = fs.readdirSync(dir).filter(n => !ignore.has(n));
    } catch {
        return; // Skip if directory cannot be read
    }

    items.forEach((name, i) => {
        let full = path.join(dir, name);
        let stat;

        try {
            stat = fs.statSync(full);
        } catch {
            return; // Skip if file/dir cannot be accessed
        }

        let isDir = stat.isDirectory();
        let isLast = i === items.length - 1;
        let line = prefix + (isLast ? '└── ' : '├── ') + name;

        if (isDir) {
            let size = 0;
            try {
                fs.readdirSync(full).forEach(f => {
                    size += getSize(path.join(full, f));
                });
            } catch { }
            line += ` [${(size / 1024).toFixed(1)} KB]`;
            console.log('\x1b[36m%s\x1b[0m', line);
            tree(full, prefix + (isLast ? '    ' : '│   '), depth - 1);
        } else {
            line += ` [${(stat.size / 1024).toFixed(1)} KB]`;
            console.log('\x1b[90m%s\x1b[0m', line);
        }
    });
}

console.log(process.cwd().split(path.sep).pop());
tree('.', '', 10);

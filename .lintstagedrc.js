export default {
    '*.{ts,tsx}': [
        () => 'npm run typecheck',
        'npm run lint',
    ],
    '*.{js,jsx}': ['npm run lint'],
    '*': ['npm run format'],
};

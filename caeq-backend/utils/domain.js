const development_Origin = [
    'http://localhost:3000',
    'http://localhost:5000',
];
const production_Origin = [
    'https://caeq-system.web.app',
    'https://caeq-system.firebaseapp.com',
    'https://portalcaeq.org',

];
const testing_Origin = [
    'https://test-caeq-system.web.app',
    'https://test-caeq-system.firebaseapp.com',
];

const origin = process.env.NODE_ENV === 'development' ? development_Origin : process.env.NODE_ENV === 'production' ? production_Origin : testing_Origin;

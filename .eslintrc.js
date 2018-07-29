module.exports = {
    'extends': 'airbnb-base',
    'rules': {
        'max-len': ['error', {'code': 100}],
        'indent': [
            'error',
            4,
            {
                'SwitchCase': 1
            }
        ],
        'comma-dangle': [
            'error',
            {
                'arrays': 'never',
                'objects': 'never',
                'imports': 'never',
                'exports': 'never',
                'functions': 'ignore'
            }
        ]
    }
};
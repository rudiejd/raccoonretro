const initialData = {
    notes: [{user: 'j.rudie', text: 'sprints suck', key:'69'}],
    cards: {
        'test': {
            id: 'test',
            content: 'test'
        },
        'ocho': {
            id: 'ocho',
            content: 'chad ochocinco'
        }
    },
    columns: {
        'continue': {
            id: 'continue',
            title: 'Continue',
            cardIds: ['test', 'ocho']
        },
        'stop': {
            id: 'stop',
            title: 'Stop',
            cardIds: []
        },
        'start': {
            id: 'start',
            title: 'Start',
            cardIds: []
        },
    },
    columnOrder: ['continue', 'stop', 'start'],
}

export default initialData;

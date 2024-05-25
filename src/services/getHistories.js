const { Firestore } = require('@google-cloud/firestore');

async function getHistories() {
    const db = new Firestore({
        projectId: 'submission-mlgc-khadafi-ahmad',
        databaseId: 'cancer-test-db'
    });
    const snapshot = await db.collection('predictions').get();
    const histories = [];
    snapshot.forEach(doc => {
        histories.push({ id: doc.id, history: doc.data() });
    });
    return histories;
}

module.exports = getHistories;
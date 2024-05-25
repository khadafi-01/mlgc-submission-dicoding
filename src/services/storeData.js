const { Firestore } = require('@google-cloud/firestore');

async function storeData(id, data) {
    const db = new Firestore({
        projectId: 'submissionmlgc-khadafi-ahmad',
        databaseId: 'cancer-test-db'
    });

    const predictCollection = db.collection('predictions');
    return predictCollection.doc(id).set(data);
}

module.exports = storeData;
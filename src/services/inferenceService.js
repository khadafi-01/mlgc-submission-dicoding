const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

// Import custom errors to handle input errors
async function predictClassification(model, image) {
    try {
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat()

        const prediction = model.predict(tensor);
        const score = (await prediction.data()); // This gets the raw output scores from the model
        const label = score > 0.5 ? 'Cancer' : 'Non-cancer'; // Threshold at 0.5


        let suggestion = label === 'Cancer' ? 'Segera periksa ke dokter!' : 'Tidak ada tanda-tanda kanker. Terus jaga pola hidup sehat!'; //Providing advice based on the label
        return { label, suggestion };

    } catch (error) {
        throw new InputError(`Terjadi kesalahan input: ${error.message}`);
    }
}


module.exports = predictClassification;
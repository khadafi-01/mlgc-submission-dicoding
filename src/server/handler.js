const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const getHistories = require('../services/getHistories');
const { InputError } = require('../exceptions/InputError');
const storeData = require('../services/storeData');

async function postPredictHandler(req, res, next) {
    try {
        const image = req.file;
        if (!image) {
            throw new InputError('Image is required');
        }

        const { model } = req.app.locals;
        const { confidenceScore, label, suggestion } = await predictClassification(model, image.buffer);

        const id = crypto.randomUUID();
        const createdAt = new Date().toISOString();

        const data = {
            "id": id,
            "result": label,
            "suggestion": suggestion,
            "createdAt": createdAt
        };

        await storeData(id, data);

        res.status(201).json({
            status: 'success',
            message: 'Model is predicted successfully',
            data
        });
    } catch (error) {
        next(error);
    }
}

async function getHistoriesHandler(req, res, next) {
    try {
        const histories = await getHistories();
        res.status(200).json({
            status: 'success',
            data: histories
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { postPredictHandler, getHistoriesHandler };
const { SystemVars } = require('../models');
const errorHandler = require('../../utils/errorHandler');

const createOne = async (key, value) => {
    try {
        const systemVars = await SystemVars.findOne({});
        if (systemVars[key].includes(value)) throw errorHandler.badRequest();
        systemVars[key].push(value);
        await systemVars.save();
        return value;
    } catch (err) {
        throw err;
    }
};

const getMany = async key => {
    try {
        const systemVars = await SystemVars.findOne({});
        return systemVars[key];
    } catch (err) {
        throw err;
    }
};

const updateOne = async (key, curValue, newValue) => {
    try {
        const systemVars = await SystemVars.findOne({});
        const index = systemVars[key].indexOf(curValue);
        if (index !== -1 && curValue !== newValue) {
            const result = (systemVars[key][index] = newValue);
            systemVars.markModified(key);
            await systemVars.save();
            return result;
        } else {
            throw errorHandler.badRequest();
        }
    } catch (err) {
        throw err;
    }
};

const deleteOne = async (key, value) => {
    try {
        const systemVars = await SystemVars.findOne({});
        const index = systemVars[key].indexOf(value);
        if (index !== -1) {
            const deletedElem = systemVars[key].splice(index, 1);
            await systemVars.save();
            return deletedElem;
        } else {
            throw errorHandler.badRequest();
        }
    } catch (err) {
        throw err;
    }
};

module.exports = { createOne, getMany, updateOne, deleteOne };

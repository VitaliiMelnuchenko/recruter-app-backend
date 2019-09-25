const systemVarsSeervice = require('../services/system_vars.service');
const validateSystemVar = require('../validators/system_vars.validator');
const validateSystemVarUpdate = require('../validators/update_system_var.validator');

const getVarNameFormUrl = url => {
    return url.substr(1);
};

const createVar = async (req, res, next) => {
    try {
        validateSystemVar(req.body);
        const systenVarName = getVarNameFormUrl(req.url);
        const data = req.body.name.toLowerCase();
        const systemVar = await systemVarsSeervice.createOne(
            systenVarName,
            data
        );
        res.status(201).json({ name: systemVar });
    } catch (err) {
        next(err);
    }
};

const getVars = async (req, res, next) => {
    try {
        const systenVarName = getVarNameFormUrl(req.url);
        const systemVars = await systemVarsSeervice.getMany(systenVarName);
        res.status(201).json({ vars: systemVars });
    } catch (err) {
        next(err);
    }
};

const updateVar = async (req, res, next) => {
    try {
        validateSystemVarUpdate(req.body);
        const systenVarName = getVarNameFormUrl(req.url);
        const curVal = req.body.currentValue.toLowerCase();
        const newVal = req.body.newValue.toLowerCase();
        const updatedVar = await systemVarsSeervice.updateOne(
            systenVarName,
            curVal,
            newVal
        );
        res.status(200).json({ name: updatedVar });
    } catch (err) {
        next(err);
    }
};

const deleteVar = async (req, res, next) => {
    try {
        validateSystemVar(req.body);
        const systenVarName = getVarNameFormUrl(req.url);
        const systemVar = req.body.name.toLowerCase();
        await systemVarsSeervice.deleteOne(systenVarName, systemVar);
        res.status(204).json({});
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createVar,
    getVars,
    updateVar,
    deleteVar
};

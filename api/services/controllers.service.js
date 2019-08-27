const createOne = model => async (req, res, next) => {
    try {
        const newDoc = await model.create(req.body);
        res.status(201).json(newDoc);
    } catch(err) {
        next(err);
    }
}

const getMany = model => async (req, res, next) => {
    try {
        const documents = await model.find({}).select('-__v').exec();
        if (documents.length) {
            res.status(200).json(documents);
        } else {
            res.status(200).json({ message: 'there are no documents in database' });
        }
    } catch(err) {
        next(err);
    }
}

const getOne = model => async (req, res, next) => {
    try {
        const document = await model.findById(req.params.id).select('-__v').exec();
        if (document) {
            res.status(200).json(document);
        } else {
            res.status(400).json({ message: 'there is no document with given ID' });
        }
    } catch(err) {
        next(err);
    }
}

const updateOne = model => async (req, res, next) => {
    try {
        const updatedDoc = await model.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .select('-__v').exec();
        if (updatedDoc) {
            res.status(200).json(updatedDoc);
        } else {
            res.status(400).json({ message: 'there is no document with given ID' });
        }
    } catch(err) {
        next(err);
    }
}

const removeOne = model => async (req, res, next) => {
    try {
        const foundDoc = await model.findById(req.params.id).exec();
        const deletedDoc = await foundDoc.remove();
        //const deletedDoc = await model.findByIdAndDelete(req.params.id).exec();
        if (deletedDoc) {
            res.status(200).json({
                message: 'document deleted'
            });
        } else {
            res.status(400).json({ message: 'there is no document with given ID' })
        }
    } catch(err) {
        next(err);
    }
}

module.exports = model => ({
    removeOne: removeOne(model),
    updateOne: updateOne(model),
    getMany: getMany(model),
    getOne: getOne(model),
    createOne: createOne(model)
});
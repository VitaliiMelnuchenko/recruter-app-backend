const { Vacancy } = require('../models');

module.exports = async (doc) => {
	const vacancy = {};
	vacancy._id = (populatedDoc._id) ? populatedDoc._id : null;
	vacancy.title = (populatedDoc.title) ? populatedDoc.title : null;
	vacancy.description = (populatedDoc.description) ? populatedDoc.description : null;
	vacancy.status = (populatedDoc.status) ? populatedDoc.status : null;
	vacancy.questions = (populatedDoc.questions) ? populatedDoc.questions : null;
	vacancy.type = (populatedDoc.type) ? populatedDoc.type : null;
	return vacancy;
}
const questionDT = require('./question.dto');

module.exports = (doc) => {
	try {
		const vacancy = {};
		vacancy._id = (doc._id) ? doc._id : null;
		vacancy.title = (doc.title) ? doc.title : null;
		vacancy.description = (doc.description) ? doc.description : null;
		vacancy.status = (doc.status) ? doc.status : null;
		vacancy.questions = (doc.questions) ? doc.questions.map(question => questionDT(question)) : null;
		vacancy.type = (doc.type) ? doc.type : null;
		if (doc.type === 'web') vacancy.link = (doc.link) ? doc.link : null;
		return vacancy;
	} catch(err) {
		throw err;
	}
};
module.exports = (doc) => {
	try {
		const question = {};
		question._id = (doc._id) ? doc._id : null;
		question.author = (doc.author) ? doc.author : null,
		question.title = (doc.title) ? doc.title : null;
		question.description = (doc.description) ? doc.description : null;
		question.type = (doc.type) ? doc.type : null;
		if (doc.type === 'video') question.link = (doc.link) ? doc.link : null;
		question.maxLength = (doc.maxLength) ? doc.maxLength : null;
		question.topics = (doc.topics) ? doc.topics : null;
		question.level = (doc.level) ? doc.level : null;
		return question;
	} catch(err) {
		throw err;
	}
};
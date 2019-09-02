module.exports = (doc) => {
	const question = {};
	question._id = (doc._id) ? doc._id : null;
	question.title = (doc.title) ? doc.title : null;
	question.description = (doc.description) ? doc.description : null;
	question.type = (doc.type) ? doc.type : null;
	question.maxLength = (doc.maxLength) ? doc.maxLength : null;
	question.level = (doc.level) ? doc.level : null;
	return question;
}
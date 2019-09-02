module.exports = (doc) => {
	const vacancy = {};
	vacancy._id = (doc._id) ? doc._id : null;
	vacancy.title = (doc.title) ? doc.title : null;
	vacancy.description = (doc.description) ? doc.description : null;
	vacancy.status = (doc.status) ? doc.status : null;
	vacancy.questions = (doc.questions) ? doc.questions : null;
	vacancy.type = (doc.type) ? doc.type : null;
	return vacancy;
}
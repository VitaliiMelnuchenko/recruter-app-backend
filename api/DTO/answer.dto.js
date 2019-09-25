module.exports = data => {
    try {
        const testItem = {};
        testItem.mark = data.mark ? data.mark : null;
        testItem.answer = data.answer ? data.answer : null;
        testItem.videoKey = data.videoKey ? data.videoKey : null;
        testItem.type = data.type ? data.type : null;
        testItem.question = data ? data : null;
        testItem.startedAt = data.startedAt ? data.startedAt : null;
        testItem.finishedAt = data.finishedAt ? data.finishedAt : null;
        testItem.status = data.status ? data.status : null;
        return testItem;
    } catch (err) {
        throw err;
    }
};

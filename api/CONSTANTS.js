module.exports = {
    MIN_LENGTH: 3,
    MIN_ANSWER_TIME: 1,
    MAX_TITLE_LENGTH: 100,
    MAX_DESC_LENGTH: 500,
    MAX_SYSTEM_VAR_LENGTH: 20,
    MAX_COMMENT_LENGTH: 500,
    MONGOOSE_ID_LENGTH: 24,
    MAX_NUM_OF_TOPICS: 5,
    ADMIN: 'admin',
    RECRUITER: 'recruiter',
    REVIEWER: 'reviewer',
    CANDIDATE: 'candidate',
    MAX_FIRSTNAME_LENGTH: 30,
    MAX_LASTNAME_LENGTH: 40,
    invitationMail: (email, code) => {
        return {
            from: 'TechMagic',
            to: email,
            subject: 'Invitation to screening tool app',
            html: `
                <h1>Hello!</h1>
                <h2 style="color: dodgerblue">Follow the link bellow to activate your account:</h2>
                <a href="http://recruiter-dev.surge.sh/${code}">http://recruiter-dev.surge.sh/${code}</a>
                <br>
                <h2>
                    The screaming tool team
                </h2>
                <h3>Thanks!</h3>
            `
        };
    },
    invitationCandidateMail: (email, code, vacancy) => {
        return {
            from: 'TechMagic',
            to: email,
            subject: `You are invited on position ${vacancy}`,
            html: `
                <h1>Hello!</h1>
                <h2 style="color: dodgerblue">Follow the link bellow to begin test:</h2>
                <a href="http://recruiter-dev.surge.sh/#/login/confirm/${code}">http://recruiter-dev.surge.sh/#/login/confirm/${code}</a>
                <br>
                <h2>
                    The screaming tool team
                </h2>
                <h3>Thanks!</h3>
            `
        };
    }
};

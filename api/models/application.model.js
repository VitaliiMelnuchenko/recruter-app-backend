const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicationSchema = new Schema(
    {
        candidate: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        vacancy: {
            type: Schema.Types.ObjectId,
            ref: 'Vacancy',
            required: true
        },
        reviewer: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            default: null
        },
        questions: [
            {
                mark: { type: Number, default: null },
                answer: { type: String, default: null },
                videoKey: { type: String, default: null },
                type: { type: String, default: null },
                question: {
                    type: Schema.Types.ObjectId,
                    ref: 'Question'
                },
                startedAt: { type: Date, default: null },
                finishedAt: { type: Date, default: null },
                status: {
                    type: String,
                    enum: ['not answered', 'ansvered', 'evaluated'],
                    default: 'not answered'
                }
            }
        ],
        invitedAt: { type: Date, default: Date.now },
        startedAt: { type: Date, default: null },
        completedAt: { type: Date, default: null },
        evaluetedAt: { type: Date, default: null },
        status: {
            type: String,
            enum: ['invited', 'in progress', 'completed', 'evaluated'],
            default: 'invited'
        },
        score: { type: Number, default: null },
        comments: [
            {
                author: {
                    type: Schema.Types.ObjectId,
                    ref: 'User'
                },
                text: { type: String },
                createdAt: { type: Date, default: Date.now }
            }
        ]
    },
    { versionKey: false }
);

module.exports = mongoose.model('Application', applicationSchema);

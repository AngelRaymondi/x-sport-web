"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../config/router");
const x_sport_1 = __importDefault(require("./../x-sport"));
const engine = new x_sport_1.default();
const validate_match = (m) => m.length === 'https://www.flashscore.com/match/xxxxxxxx/'.length && m.startsWith('https://www.flashscore.com/match/') && m.endsWith('/');
exports.default = new router_1.Route({
    method: 'POST',
    async handler(req, res) {
        if (!req.body)
            return res.sendStatus(422);
        const { match } = req.body;
        if (!match)
            return res.sendStatus(422);
        if (!validate_match(match))
            return res.sendStatus(400);
        const result = await engine.analize(match);
        return res.send({
            points: {
                normal: result.prognostic.calculate('high'),
                low: result.prognostic.calculate('low')
            }
        });
    },
});

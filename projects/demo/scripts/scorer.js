////
//
// Score calculator class
//
////

class ScoreCalculator {

    static byXYTag(x, y, tag) {
        return data.slots[x.id][tag.id] * data.slots[y.id][tag.id];
    }

    static byMakerTaker(maker, taker) {
        var score = 0;
        data.makersTags.forEach(tag => {
            score += ScoreCalculator.byXYTag(maker, taker, tag);
        });
        return score;
    }

    static byMakerTakerWithVeto(maker, taker) {
        let BreakException = {};
        var score = 0;
        try {
            data.makersTags.forEach(tag => {
                let x = ScoreCalculator.byXYTag(maker, taker, tag);
                if (x < 0) {
                    score = Number.NEGATIVE_INFINITY;
                    throw BreakException;
                }
                score += x;
            });
        } catch (e) {
            if (e != BreakException) throw e;
        }
        return score;
    }

    static byMakerTakers(maker, takers) {
        var score = 0;
        takers.forEach(taker => {
            score += ScoreCalculator.byMakerTaker(maker, taker)
        });
        return score;
    }

    static byMakerTakersWithVeto(maker, takers) {
        let BreakException = {};
        var score = 0;
        try {
            takers.forEach(taker => {
                let x = ScoreCalculator.byMakerTakerWithVeto(maker, taker);
                if (x < 0) {
                    score = Number.NEGATIVE_INFINITY;
                    throw BreakException;
                }
                score += x;
            });
        } catch (e) {
            if (e != BreakException) throw e;
        }
        return score;
    }

    static byTakerTaker(a, b) {
        var score = 0;
        data.makersTags.concat(data.takersTags).forEach(tag => {
            score += ScoreCalculator.byXYTag(a, b, tag);
        });
        return score;
    }

    static byTakerTakerWithVeto(a, b) {
        let BreakException = {};
        var score = 0;
        try {
            data.makersTags.concat(data.takersTags).forEach(tag => {
                let x = ScoreCalculator.byXYTag(a, b, tag);
                if (x < 0) {
                    score = Number.NEGATIVE_INFINITY;
                    throw BreakException;
                }
                score += x;
            });
        } catch (e) {
            if (e != BreakException) throw e;
        }
        return score;
    }

    static byTakers(takers) {
        if (takers.length < 2) return 0;
        var score = 0;
        pairs(takers).forEach(pair => {
            score += ScoreCalculator.byTakerTaker(pair[0], pair[1])
        });
        return score;
    }

    static byTakersWithVeto(takers) {
        if (takers.length < 2) return 0;
        let BreakException = {};
        var score = 0;
        try {
            pairs(takers).forEach(pair => {
                let x = ScoreCalculator.byTakerTakerWithVeto(pair[0], pair[1]);
                if (x < 0) {
                    score = Number.NEGATIVE_INFINITY;
                    throw BreakException;
                }
                score += x;
            });
        } catch (e) {
            if (e != BreakException) throw e;
        }
        return score;
    }

}

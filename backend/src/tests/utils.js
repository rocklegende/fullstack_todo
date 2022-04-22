
/*
Replaces the auth checking middleware with a jest mock middleware that does nothing.
 */
const disableAuthCheck = (jestRef) => {
    jestRef.mock("../middleware/authMiddleware", () => ({
        checkAuth: jestRef.fn((req,res, next) => {next()})
    }));
}

module.exports = {
    disableAuthCheck
}
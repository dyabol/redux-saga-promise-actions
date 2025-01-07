"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.takeLatestPromiseAction = exports.takeLeadingPromiseAction = exports.takeEveryPromiseAction = void 0;
const effects_1 = require("redux-saga/effects");
const _1 = require("./");
function* promiseActionWrapper(promiseAction, action, worker) {
    try {
        const payload = yield effects_1.call(worker, action);
        _1.resolvePromiseAction(action, payload);
        yield effects_1.put(promiseAction.success(payload));
    }
    catch (err) {
        yield _1.rejectPromiseAction(action, err);
        yield effects_1.put(promiseAction.failure(err));
    }
}
function effectCreatorFactory(effectCreator, promiseAction, worker) {
    return effectCreator(promiseAction.request, (action) => promiseActionWrapper(promiseAction, action, worker));
}
/**
 * Spawns a saga on each particular promise action dispatched to the store. If saga succeeds action is resolved with return value as payload. Otherwise it gets rejected.
 * @param {PromiseActionSet<RequestType, SuccessType, FailureType, X, Y, Z>} action Promise action to watch
 * @param worker A generator function
 */
function takeEveryPromiseAction(action, worker) {
    return effectCreatorFactory(effects_1.takeEvery, action, worker);
}
exports.takeEveryPromiseAction = takeEveryPromiseAction;
/**
 * Spawns a saga on each particular promise action dispatched to the store. Automatically cancels any previous sagas started previously if it's still running. If saga succeeds action is resolved with return value as payload. Otherwise it gets rejected.
 * @param {PromiseActionSet<RequestType, SuccessType, FailureType, X, Y, Z>} action Promise action to watch
 * @param worker A generator function
 */
function takeLeadingPromiseAction(action, worker) {
    return effectCreatorFactory(effects_1.takeLeading, action, worker);
}
exports.takeLeadingPromiseAction = takeLeadingPromiseAction;
/**
 * Spawns a saga on each particular promise action dispatched to the store. After spawning a task once, it blocks until spawned saga completes and then starts to listen for an action again. If saga succeeds action is resolved with return value as payload. Otherwise it gets rejected.
 * @param {PromiseActionSet<RequestType, SuccessType, FailureType, X, Y, Z>} action Promise action to watch
 * @param worker A generator function
 */
function takeLatestPromiseAction(action, worker) {
    return effectCreatorFactory(effects_1.takeLatest, action, worker);
}
exports.takeLatestPromiseAction = takeLatestPromiseAction;
//# sourceMappingURL=effects.js.map
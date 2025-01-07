"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dispatch = exports.rejectPromiseAction = exports.resolvePromiseAction = exports.promiseMiddleware = exports.createPromiseAction = void 0;
//Redux saga effects
const effects_1 = require("redux-saga/effects");
//Utils
const merge_1 = __importDefault(require("lodash/merge"));
const typesafe_actions_1 = require("typesafe-actions");
function createPromiseAction(requestType, successType, failureType) {
    return function () {
        const request = typesafe_actions_1.createCustomAction(successType && failureType ? requestType : `${requestType}_REQUEST`, (...payload) => ({
            payload: payload[0],
            meta: {
                promiseAction: true,
                promise: {}
            }
        }));
        const success = typesafe_actions_1.createAction(successType !== null && successType !== void 0 ? successType : `${requestType}_SUCCESS`)();
        const failure = typesafe_actions_1.createAction(failureType !== null && failureType !== void 0 ? failureType : `${requestType}_FAILURE`)();
        return {
            request,
            success,
            failure
        };
    };
}
exports.createPromiseAction = createPromiseAction;
const promiseMiddleware = () => next => action => {
    var _a;
    if (!((_a = action.meta) === null || _a === void 0 ? void 0 : _a.promiseAction)) {
        next(action);
        return;
    }
    return new Promise((resolve, reject) => {
        next(merge_1.default(action, {
            meta: {
                promise: {
                    resolve,
                    reject
                }
            }
        }));
    });
};
exports.promiseMiddleware = promiseMiddleware;
function resolvePromiseAction(action, payload) {
    action.meta.promise.resolve(payload);
}
exports.resolvePromiseAction = resolvePromiseAction;
function rejectPromiseAction(action, payload) {
    action.meta.promise.reject(payload);
}
exports.rejectPromiseAction = rejectPromiseAction;
/**
 * Dispatch action to redux store. If the action is promise action wait until it is resolved.
 * @param {A} action Action to dispatch
 */
function dispatch(action) {
    var _a;
    return ((_a = action.meta) === null || _a === void 0 ? void 0 : _a.promiseAction) ? effects_1.putResolve(action)
        : effects_1.put(action);
}
exports.dispatch = dispatch;
//# sourceMappingURL=index.js.map
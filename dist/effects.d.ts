import { TypeConstant } from 'typesafe-actions';
import { PromiseActionSet, PromiseAction } from './';
declare type Worker<RequestType extends TypeConstant, X, Y> = (action: PromiseAction<RequestType, X, Y>) => Generator<any, Y extends undefined ? void : Y, unknown>;
/**
 * Spawns a saga on each particular promise action dispatched to the store. If saga succeeds action is resolved with return value as payload. Otherwise it gets rejected.
 * @param {PromiseActionSet<RequestType, SuccessType, FailureType, X, Y, Z>} action Promise action to watch
 * @param worker A generator function
 */
export declare function takeEveryPromiseAction<RequestType extends TypeConstant, SuccessType extends TypeConstant, FailureType extends TypeConstant, X, Y, Z>(action: PromiseActionSet<RequestType, SuccessType, FailureType, X, Y, Z>, worker: Worker<RequestType, X, Y>): import("redux-saga/effects").ForkEffect<never>;
/**
 * Spawns a saga on each particular promise action dispatched to the store. Automatically cancels any previous sagas started previously if it's still running. If saga succeeds action is resolved with return value as payload. Otherwise it gets rejected.
 * @param {PromiseActionSet<RequestType, SuccessType, FailureType, X, Y, Z>} action Promise action to watch
 * @param worker A generator function
 */
export declare function takeLeadingPromiseAction<RequestType extends TypeConstant, SuccessType extends TypeConstant, FailureType extends TypeConstant, X, Y, Z>(action: PromiseActionSet<RequestType, SuccessType, FailureType, X, Y, Z>, worker: Worker<RequestType, X, Y>): import("redux-saga/effects").ForkEffect<never>;
/**
 * Spawns a saga on each particular promise action dispatched to the store. After spawning a task once, it blocks until spawned saga completes and then starts to listen for an action again. If saga succeeds action is resolved with return value as payload. Otherwise it gets rejected.
 * @param {PromiseActionSet<RequestType, SuccessType, FailureType, X, Y, Z>} action Promise action to watch
 * @param worker A generator function
 */
export declare function takeLatestPromiseAction<RequestType extends TypeConstant, SuccessType extends TypeConstant, FailureType extends TypeConstant, X, Y, Z>(action: PromiseActionSet<RequestType, SuccessType, FailureType, X, Y, Z>, worker: Worker<RequestType, X, Y>): import("redux-saga/effects").ForkEffect<never>;
export {};

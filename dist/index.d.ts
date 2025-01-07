import { Middleware } from 'redux';
import { Action, AnyAction } from 'redux';
import { TypeConstant, ActionCreatorBuilder } from 'typesafe-actions';
export declare type PromiseActionSet<RequestType extends TypeConstant, SuccessType extends TypeConstant, FailureType extends TypeConstant, X, Y, Z> = {
    request: PromiseActionCreatorBuilder<RequestType, X, Y>;
    success: ActionCreatorBuilder<SuccessType, Y>;
    failure: ActionCreatorBuilder<FailureType, Z>;
};
declare type PromiseActionCreatorBuilder<RequestType extends TypeConstant, X, Y> = (...payload: X extends undefined ? [] : [X]) => PromiseAction<RequestType, X, Y>;
export interface PromiseAction<RequestType extends TypeConstant, TPayload, TResolveType> extends Action<RequestType> {
    payload: TPayload;
    meta: {
        promiseAction: boolean;
        promise: {
            resolve?: (payload: TResolveType) => void;
            reject?: (payload: any) => void;
        };
    };
}
/**
 * Create an object containging three action-creators.
 * @param {string} type Base action type
 * @param {X} X Request action payload
 * @param {Y} Y Success action payload
 * @param {Z} Z Failure action payload
 */
export declare function createPromiseAction<Type extends TypeConstant, X, Y, Z>(type: Type): <X, Y, Z>() => PromiseActionSet<`${Type}_REQUEST`, `${Type}_SUCCESS`, `${Type}_FAILURE`, X, Y, Z>;
/**
 * Create an object containing three action-creators.
 * @param {string} requestType Request action type
 * @param {string} successType Success action type
 * @param {string} failureType Failure action type
 * @param {X} X Request action payload
 * @param {Y} Y Success action payload
 * @param {Z} Z Failure action payload
 */
export declare function createPromiseAction<RequestType extends TypeConstant, SuccessType extends TypeConstant, FailureType extends TypeConstant, X, Y, Z>(requestType: RequestType, successType: SuccessType, failureType: FailureType): <X, Y, Z>() => PromiseActionSet<RequestType, SuccessType, FailureType, X, Y, Z>;
interface PromiseDispatch<TBasicAction extends Action> {
    <RequestType extends TypeConstant, TPromise, TReturnType>(promiseAction: PromiseAction<RequestType, TPromise, TReturnType>): Promise<TReturnType>;
    <A extends TBasicAction>(action: A): A;
    <RequestType extends TypeConstant, TPromise, TResolveType, TAction extends TBasicAction>(action: TAction | PromiseAction<RequestType, TPromise, TResolveType>): TAction | Promise<TResolveType>;
}
export declare type PromiseMiddleware<TState = unknown, TBasicAction extends Action = AnyAction> = Middleware<PromiseDispatch<TBasicAction>, TState, PromiseDispatch<TBasicAction>>;
export declare const promiseMiddleware: PromiseMiddleware;
/**
 * Resolve promise action.
 * @param {PromiseAction<RequestType, X, Y>} action Action to resolve
 */
export declare function resolvePromiseAction<RequestType extends TypeConstant, X, undefined>(action: PromiseAction<RequestType, X, undefined>): void;
/**
 * Resolve promise action.
 * @param {PromiseAction<RequestType, X, Y>} action Action to resolve
 * @param {Y} payload Payload to resolve action with
 */
export declare function resolvePromiseAction<RequestType extends TypeConstant, X, Y>(action: PromiseAction<RequestType, X, Y>, payload: Y): void;
/**
 * Reject promise action.
 * @param {A} action Action to reject
 */
export declare function rejectPromiseAction<RequestType extends TypeConstant, X, Y, undefined>(action: PromiseAction<RequestType, X, Y>): void;
/**
 * Reject promise action.
 * @param {A} action Action to reject
 * @param {TResolvePayload} payload Payload to reject action with
 */
export declare function rejectPromiseAction<RequestType extends TypeConstant, X, Y, Z>(action: PromiseAction<RequestType, X, Y>, payload: Z): void;
/**
 * Dispatch action to redux store. If the action is promise action wait until it is resolved.
 * @param {A} action Action to dispatch
 */
export declare function dispatch<A extends Action<any> | PromiseAction<TypeConstant, any, any>>(action: A): import("redux-saga/effects").PutEffect<A>;
declare module 'redux' {
    interface Dispatch<A extends Action = AnyAction> {
        <RequestType extends TypeConstant, TPayloadType = any, TReturnType = any>(promiseAction: PromiseAction<RequestType, TPayloadType, TReturnType>): Promise<TReturnType>;
    }
}
export {};

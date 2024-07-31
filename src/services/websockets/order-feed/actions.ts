import { createAction } from '@reduxjs/toolkit';

export const wsConnect = createAction<string, 'ORDERS_FEED_CONNECT'>('ORDERS_FEED_CONNECT');

export const wsDisconnect = createAction('ORDERS_FEED_DISCONNECT');

export type TWsExternalActions = ReturnType<typeof wsConnect> | ReturnType<typeof wsDisconnect>;

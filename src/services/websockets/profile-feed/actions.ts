import { createAction } from '@reduxjs/toolkit';

export const profileWsConnect = createAction<string, 'PROFILE_FEED_CONNECT'>(
	'PROFILE_FEED_CONNECT',
);

export const profileWsDisconnect = createAction('PROFILE_FEED_DISCONNECT');

export type TWsExternalActions =
	| ReturnType<typeof profileWsConnect>
	| ReturnType<typeof profileWsDisconnect>;

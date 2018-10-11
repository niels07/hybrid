import { EventHandler, EventArgs } from 'core/event';

export interface LoadViewArgs {
    onLoad?: EventHandler;
    args?: EventArgs;
    handleEvents?: boolean;
}


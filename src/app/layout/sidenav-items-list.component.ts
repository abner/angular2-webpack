import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AppMenuItem } from '../models';

@Component({
    selector: 'mts-sidenav-items-list',
    template: require('./sidenav-items-list.html'),
    styles: [require('./sidenav-items-list.scss')]
})
export class SidenavItemsListComponent {
    @Input('items') items: AppMenuItem[];
    @Output('onNavigate') onNavigate: EventEmitter<void> = new EventEmitter<void>();
    constructor(
        private router: Router
    ) {

    }

    navigate(item: AppMenuItem) {
        this.router.navigate([item.url]);
        this.onNavigate.next(null);
    }
}


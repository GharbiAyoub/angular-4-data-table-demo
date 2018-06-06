import { Component } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';
import persons from './data-table-demo1-data';


@Component({
    selector: 'data-table-demo-1',
    providers: [],
    templateUrl: './data-table-demo1.html',
    styleUrls: ['./data-table-demo1.css']
})
export class DataTableDemo1 {

    itemResource = new DataTableResource(persons);
    items = [];
    itemCount = 0;

    str = 'Description';
    namefiltre = 'Search by Name';
    currentRow;

    presence = [];

    constructor() {
        this.itemResource.count().then(count => this.itemCount = count);
        this.presence = persons;
        this.rowColors = this.rowColors.bind(this);
    }

    reloadItems(params) {
        //alert('Reload')
        this.itemResource.query(params).then(items => this.items = items);
    }

    // special properties:

    rowClick(rowEvent) {
        //console.log(rowEvent.row.index);
        this.currentRow = rowEvent.row.index;
    }

    rowDoubleClick(rowEvent) {
        //alert('Double clicked: ' + rowEvent.row.item.name);
    }

    rowTooltip(item) { return item.jobTitle; }

    FieldsChange(values: any) {
        //console.log(this.currentRow + ' ' + values.currentTarget.checked);
        this.presence[this.currentRow]['Present'] = values.currentTarget.checked
        //console.log(this.presence[this.currentRow]);
    }

    test(value) {
        //console.log(this.currentRow + ' ' +value);
        this.presence[this.currentRow]['Description'] = value;
    }

    save() {
        var x=0;
        this.presence.forEach(element => {
            console.log('Etudiant N'+x+'   Present: ' + element.Present + '   Description ' + element.Description);
            //========> Call create Service Presence
            x++;
        });
    }


    rowColors(Etudiant) {
        if ((Etudiant.name.indexOf(this.namefiltre) != -1) || (Etudiant.phoneNumber.indexOf(this.namefiltre) != -1 )) {return 'rgb(255, 255, 197)'; };
    }
}

import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackService } from '../../servicios/snack.service';
import { DeleteService } from '../../servicios/delete.service';

@Component({
  selector: 'app-dialog-elements',
  templateUrl: './dialog-elements.component.html',
  styleUrls: ['./dialog-elements.component.scss']
})
export class DialogElementsComponent implements OnInit {

  public title : string = '';

  constructor(
    public dialog : MatDialogRef<DialogElementsComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _ds: DeleteService,
    private _sns:SnackService,
  ) { }

  ngOnInit(): void {
    this.title = this.data.titulo;
  }

  eliminar(){
    if (this.data.id && this.data.einpoint ) {
      let json = this.returnObj(this.data.id);
      this.deleteService(json,this.data.einpoint);
    }
  }

  deleteService(data: any, einpoint: string){
    this._ds.delete(data, einpoint).subscribe(res => {
      if(res.status){
        this._sns.open(res.mensaje);
        this.cerrar();
      }else{
        this._sns.open(res.mensaje, 'text-danger');
      }
    });
  }

  returnObj(id:number): any{
    let json = { data: {id : id } } 
    return json;
  }

  cerrar(){
    this.dialog.close();
  }

}

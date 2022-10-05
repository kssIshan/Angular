import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef } from '@angular/material/dialog';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

export interface Device {
  name: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {


  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  device: Device[] = [{name: 'Laptop'}, {name: 'Mobile'}, {name: 'Tablet'}];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.device.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(device: Device): void {
    const index = this.device.indexOf(device);

    if (index >= 0) {
      this.device.splice(index, 1);
    }
  }


  

  selectedCategory  : any;
  itemsForm !: FormGroup;

  kitchen : any=
  [{
		"id": 1,
		"value": "Food"
	},
	{
		"id": 2,
		"value": "Beverages"
	}
];

itemSize: any =[{
  "id": 1,
  "value": "Small"
},
{
  "id": 2,
  "value": "Regular"
},
{
  "id": 3,
  "value": "Large"
}
];


categories : any=
	 [{
			"id": 1,
			"value": "Chinese"
		},
		{
			"id": 2,
			"value": "Indian"
		},
		{
			"id": 3,
			"value": "Sri Lankan"
		}
	]
	subCategories: any= [{
			"cat_id": 1,
			"value": [{
					"id": 1,
					"value": "Fried Rice"
				},
				{
					"id": 2,
					"value": "Fried Noodles"
				}
			]
		},
		{
			"cat_id": 2,
			"value": [{
					"id": 1,
					"value": "Naan Rotti"
				},
				{
					"id": 2,
					"value": "Masala Dosai"
				}
			]
		},
		{
			"cat_id": 3,
			"value": [{
					"id": 1,
					"value": "Rice & Curry"
				},
				{
					"id": 2,
					"value": "Kottu"
				}
			]
		}
	]
  

   subCat: string[]=[];
kitchenItem : any;

  constructor(private formBuilder : FormBuilder, private api : ApiService, private dialogRef : MatDialogRef<DialogComponent>) { }



  ngOnInit(): void {
    this.itemsForm = this.formBuilder.group({
      itemCode : ['',Validators.required],
      kitchen  : ['',Validators.required],
      // kitchenItem: ['',Validators.required],
      itemName : ['',Validators.required],
      category : ['',Validators.required],
      subCategory : ['',Validators.required],
      itemSize  : ['',Validators.required],
      costPrice : ['',Validators.required],
      takeAwayPrice : ['',Validators.required],
      dineInPrice : ['',Validators.required],
      webPrice : ['',Validators.required],
      serviceCharge : ['', Validators.required],
      devices : [this.device, Validators.required]
      

      
    })
  }


  changeCountry(country: any) {
    this.subCat=[];
    console.log(country);
    this.subCategories.forEach((Item:any)=>{ 
      console.log(Item);
      if(Item.cat_id===country.id){
        Item.value.forEach((SubCategory: any)=>{
        this.subCat.push(SubCategory.value);
        

        })

      }
      
    });
    
  }
  
  addItems(){
    if(this.itemsForm.valid){
      this.api.postItems(this.itemsForm.value)
      .subscribe({
        next:(res)=>{
          alert("Item added successfully")
          this.itemsForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert("Error while adding the Item")

        }
      })
    }
  }

  
  // changeState(state: any) {
  //   this.cities = state.cities;
  // }

  

}

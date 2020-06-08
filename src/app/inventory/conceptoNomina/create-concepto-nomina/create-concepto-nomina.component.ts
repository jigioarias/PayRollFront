import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClaseNomina, ConceptoNomina, Concepto } from '../../shared/master';
import { Router } from '@angular/router';
import { ClaseNominaService } from 'src/app/general/shared/clase-nomina.service';
import { MessagesService } from 'src/app/general/shared/messages.service';
import { ConceptoService } from 'src/app/general/shared/concepto.service';
import { ConceptoNominaService } from 'src/app/general/shared/concepto-nomina.service';
import { Messages } from 'src/app/general/shared/messages';
import { LABEL } from 'src/app/general/shared/label';
import { State, STATES } from 'src/app/general/shared/state';


@Component({
  selector: 'app-create-concepto-nomina',
  templateUrl: './create-concepto-nomina.component.html',
  styleUrls: ['./create-concepto-nomina.component.scss']
})
export class CreateConceptoNominaComponent implements OnInit {

 
  conceptoForm: FormGroup;
  estados: State[];
  clases : ClaseNomina[];
  concepts : Concepto[];
  conceptoNomina :ConceptoNomina;
    
   constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private claseNominaService : ClaseNominaService,
      private conceptoService :ConceptoService,
      private conceptoNominaService: ConceptoNominaService,
      private messagesService:MessagesService
    ) { }
    
    ngOnInit(): void {
    
  
      this.estados = STATES;

      this.conceptoForm = this.formBuilder.group({
        clase: [null, Validators.required],
        concept: [null, Validators.required],
        active: [true]
      });
      //TODO: cambiar por enmpresa
      this.conceptoService.list(1).subscribe(
        (data)=>{

          this.concepts = data;
        },(error)=>{

          console.log('error',error);
        }

      );
    

      
      this.claseNominaService.list().subscribe(
        (data)=>{

          this.clases = data;
        },(error)=>{

          console.log('error',error);
        }

      );
    
    
    }
  
  
  
    loadConceptoNomina(){
      
          
  
  
      let conceptoNominac :ConceptoNomina={
      id:0,
      enterprise:1,
      clase: this.conceptoForm.get('clase').value,
      concept:this.conceptoForm.get('concept').value, 
      active:this.conceptoForm.get('active').value,
      user:'usuario'
      };
    
      this.conceptoNomina =conceptoNominac
     }
    
  
    add() {
      
  
  
     /* if (this.claseForm.invalid ){
        
        this.messagesService.showErrorMessage(Messages.get('insert_error', LABEL.classPayRoll));
        return;     
      }
  */
    
  
  this.loadConceptoNomina();
  
      console.log('clae Nomina',this.conceptoNomina);
      this.conceptoNominaService.save(this.conceptoNomina).subscribe(
        (data)=> {
          console.log(data);
          if(data!=null){
          this.messagesService.showSuccessMessage(Messages.get('insert_success', LABEL.classPayRoll,this.conceptoForm.get('concept').value));
          }else{
            
            this.messagesService.showErrorMessage(Messages.get('insert_error', LABEL.classPayRoll,this.conceptoForm.get('concept').value));
  
          }
        },
        (error)=>{
          console.log(error);
        }
  
      );   
      
      
    }
  



}

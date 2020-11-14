import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClaseNomina, ConceptoNomina, Concepto } from '../../shared/master';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaseNominaService } from 'src/app/general/shared/clase-nomina.service';
import { MessagesService } from 'src/app/general/shared/messages.service';
import { ConceptoService } from 'src/app/general/shared/concepto.service';
import { ConceptoNominaService } from 'src/app/general/shared/concepto-nomina.service';
import { messages, Messages } from 'src/app/general/shared/messages';
import { LABEL } from 'src/app/general/shared/label';
import { State, STATES } from 'src/app/general/shared/state';

@Component({
  selector: 'app-edit-concepto-nomina',
  templateUrl: './edit-concepto-nomina.component.html',
  styleUrls: ['./edit-concepto-nomina.component.scss']
})
export class EditConceptoNominaComponent implements OnInit {

  conceptoForm: FormGroup;
  estados: State[];
  clases : ClaseNomina[];
  concepts : Concepto[];
  conceptoNomina :ConceptoNomina;
  idConcepto :number;
    
   constructor(
    private route: ActivatedRoute,
      private router: Router,
      private formBuilder: FormBuilder,
      private claseNominaService : ClaseNominaService,
      private conceptoService :ConceptoService,
      private conceptoNominaService: ConceptoNominaService,
      private messagesService:MessagesService
    ) { }
    
    ngOnInit(): void {
    
  
      this.route.params.subscribe((params) => {
        this.idConcepto = params['id'];
        console.log(this.idConcepto);
      });
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
    

      
      this.claseNominaService.list(null).subscribe(
        (data)=>{

          this.clases = data;
        },(error)=>{

          console.log('error',error);
        }

      );
    
      this.conceptoNominaService.get(this.idConcepto).subscribe(
        (data)=>{
          console.log(data);
          this.conceptoForm.get('clase').setValue(data.clase);
          this.conceptoForm.get('concept').setValue(data.concept);
          this.conceptoForm.get('active').setValue(data.active);
     
        },
        (error)=>{
          console.log(error);
        }
      );
    
    }
  
  
  
    loadConceptoNomina(){
      
       
      let conceptoNominac :ConceptoNomina={
      id:this.idConcepto,
      enterprise: parseInt(localStorage.getItem(messages.variableUserEmpresa)),
      clase: this.conceptoForm.get('clase').value,
      concept:this.conceptoForm.get('concept').value, 
      active:this.conceptoForm.get('active').value,
      user:localStorage.getItem(messages.variableUserSession)
      };
    
      this.conceptoNomina =conceptoNominac
     }
    
  
    edit() {
      
  
  
     /* if (this.claseForm.invalid ){
        
        this.messagesService.showErrorMessage(Messages.get('insert_error', LABEL.classPayRoll));
        return;     
      }
  */
    
  
  this.loadConceptoNomina();
  
      console.log('clae Nomina',this.conceptoNomina);
      this.conceptoNominaService.update(this.conceptoNomina).subscribe(
        (data)=> {
          console.log(data);
          if(data.error==null){
          this.messagesService.showSuccessMessage(Messages.get('edit_success', LABEL.classPayRoll,this.conceptoForm.get('concept').value));
          }else{
            
            this.messagesService.showErrorMessage(Messages.get('edit_error', LABEL.classPayRoll,data.error));
  
          }
        },
        (error)=>{
          console.log(error);
        }
  
      );   
      
      
    }
  

}
